<?php
/**
 * GET Single Course Details API
 * Synced with eduexcellence.sql
 */

require_once(__DIR__ . "/config/db.php");

if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

$conn = $GLOBALS['conn'] ?? ($conn ?? null);

$courseId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($courseId <= 0 || !$conn) {
    if (!headers_sent()) http_response_code(400);
    echo json_encode([
        "status"  => "error",
        "message" => "Valid Course ID is required."
    ]);
    exit;
}

$sql = "
    SELECT 
        c.*,
        cn.coursename,
        col.cmname as college_name,
        cnt.countryname,
        st.streamname as stream_name,
        im.inmonthname
    FROM res_course_master c
    LEFT JOIN res_coursename_master cn ON cn.cnmid = c.cnmid
    LEFT JOIN res_college_master col ON col.collegemid = c.collegemid
    LEFT JOIN res_country_master cnt ON cnt.countrymid = c.countrymid
    LEFT JOIN res_stream_master st ON st.streammid = c.streamname
    LEFT JOIN res_intakemonth_master im ON im.inmonthmid = c.cmintake
    WHERE c.coursemid = ?
    LIMIT 1
";

$stmt = $conn->prepare($sql);
if ($stmt) {
    $stmt->bind_param("i", $courseId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();

        $cleanName = trim(preg_replace('/\s+/', ' ', $row['coursename'] ?? 'Degree Program'));
        $cleanUniversity = trim($row['college_name'] ?? 'Partner University');
        $cleanCountry = trim($row['countryname'] ?? 'International');
        $cleanStream = trim($row['stream_name'] ?? 'General Studies');

        $level = trim($row['levelofstudy'] ?? '');
        if (empty($level)) {
            if (stripos($cleanName, 'bachelor') !== false || stripos($cleanName, 'b.') !== false) {
                $level = "Bachelor's";
            } elseif (stripos($cleanName, 'phd') !== false) {
                $level = "PhD / Doctorate";
            } else {
                $level = "Master's";
            }
        }

        $rawFees = trim($row['cmfees'] ?? '');
        $numericFees = preg_replace('/[^0-9.]/', '', $rawFees);
        $fees = is_numeric($numericFees) ? (float)$numericFees : 0;

        $rawDuration = trim($row['cmduration'] ?? '');
        $numericDuration = preg_replace('/[^0-9.]/', '', $rawDuration);
        $duration = is_numeric($numericDuration) ? (float)$numericDuration : 2;

        $rawScholarship = trim($row['scholarshipavailble'] ?? '');
        $hasScholarship = !empty($rawScholarship) && strtolower($rawScholarship) !== 'no';

        $formatted = [
            'id'                  => (int)$row['coursemid'],
            'name'                => $cleanName,
            'university'          => $cleanUniversity,
            'country'             => $cleanCountry,
            'stream'              => $cleanStream ?: 'General Studies',
            'level'               => $level,
            'duration'            => $duration,
            'durationText'        => $rawDuration ?: ($duration . " Years"),
            'fees'                => $fees,
            'feesText'            => $rawFees ?: ($fees > 0 ? "$" . number_format($fees) : "Contact for tuition details"),
            'intake'              => trim($row['openintakes'] ?? '') ?: 'Fall / Spring',
            'scholarship'         => $hasScholarship ? 'yes' : 'no',
            'scholarshipText'     => $rawScholarship ?: 'Contact for scholarship opportunities',
            'eligibility'         => trim($row['cmeligibility'] ?? '') ?: 'Undergraduate / Graduate degree with strong academic record',
            'description'         => trim($row['cmdesc'] ?? '') ?: 'An internationally accredited degree offering rigorous academic study, modern laboratory/research facilities, and direct industry placement connections.',
            'facilities'          => trim($row['cmfacility'] ?? ''),
            'remarks'             => trim($row['cmremarks'] ?? ''),
            'programLink'         => trim($row['cprogramlink'] ?? ''),
            'ranking'             => trim($row['universityranking'] ?? '') ?: 'Top Ranked Global Institution',
            'documents'           => !empty($row['cmdocument']) ? array_map('trim', explode(",", $row['cmdocument'])) : ["Academic Transcripts", "Passport", "SOP", "Letters of Recommendation", "English Test Score"],
            'requirements'        => [
                trim($row['cmeligibility'] ?? '') ?: "Recognised previous academic qualification",
                trim($row['entryrequirements'] ?? '') ?: "English proficiency (IELTS / TOEFL / Duolingo / Medium of Instruction waiver)",
                "Statement of Purpose (SOP)",
                "2 Academic or Professional Letters of Recommendation",
                "Valid International Passport"
            ],
            'tests'               => [
                'ielts'    => trim($row['ielts'] ?? ''),
                'toefl'    => trim($row['toefl'] ?? ''),
                'pte'      => trim($row['pte'] ?? ''),
                'duolingo' => trim($row['duolingo'] ?? ''),
                'gre'      => trim($row['gre'] ?? ''),
                'gmat'     => trim($row['gmat'] ?? '')
            ]
        ];

        echo json_encode([
            "status" => "success",
            "course" => $formatted
        ]);
        exit;
    }
}

http_response_code(404);
echo json_encode([
    "status"  => "error",
    "message" => "Course not found."
]);
?>
