<?php
/**
 * POST Submit Course Enquiry API
 * Accepts enquiry payload from frontend and stores in database or logs inquiry.
 */

require_once(__DIR__ . "/config/db.php");

if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

$conn = $GLOBALS['conn'] ?? ($conn ?? null);

// Read JSON or Form POST payload
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$fullName    = trim($data['fullName'] ?? $data['name'] ?? '');
$email       = trim($data['email'] ?? '');
$phone       = trim($data['phone'] ?? $data['mobile'] ?? '');
$courseId    = (int)($data['courseId'] ?? 0);
$courseName  = trim($data['courseName'] ?? '');
$university  = trim($data['university'] ?? '');
$targetIntake= trim($data['targetIntake'] ?? 'Fall 2026');
$notes       = trim($data['notes'] ?? $data['message'] ?? '');

if (empty($fullName) || empty($email) || empty($phone)) {
    http_response_code(422);
    echo json_encode([
        "status"  => "error",
        "message" => "Please provide your full name, email, and phone number."
    ]);
    exit;
}

// Log inquiry to file as fallback backup
$logEntry = date('Y-m-d H:i:s') . " | Name: $fullName | Email: $email | Phone: $phone | Course: $courseName | University: $university | Intake: $targetIntake\n";
@file_put_contents(__DIR__ . "/inquiries.log", $logEntry, FILE_APPEND);

// If database connection is active, insert into enquiries table if exists
if ($conn && !$conn->connect_error) {
    // Create inquiries table if not exists
    $createTableSql = "
        CREATE TABLE IF NOT EXISTS res_enquiries (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            course_id INT NULL,
            course_name VARCHAR(255) NULL,
            university VARCHAR(255) NULL,
            target_intake VARCHAR(100) NULL,
            notes TEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ";
    @mysqli_query($conn, $createTableSql);

    $stmt = $conn->prepare("
        INSERT INTO res_enquiries (full_name, email, phone, course_id, course_name, university, target_intake, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    if ($stmt) {
        $stmt->bind_param("sssissss", $fullName, $email, $phone, $courseId, $courseName, $university, $targetIntake, $notes);
        $stmt->execute();
    }
}

echo json_encode([
    "status"  => "success",
    "message" => "Your course inquiry has been successfully received. Our educational advisor will reach out shortly."
]);
?>
