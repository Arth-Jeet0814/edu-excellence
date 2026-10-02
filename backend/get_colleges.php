<?php
/**
 * GET Colleges API
 * Synced with eduexcellence.sql (res_college_master)
 */

require_once(__DIR__ . "/config/db.php");
$conn = $GLOBALS['conn'] ?? $conn;

if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

$search = $_GET['search_college'] ?? $_GET['search'] ?? "";
$data = [];

if ($conn) {
    $search_safe = mysqli_real_escape_string($conn, trim($search));
    $condition = "WHERE cmname IS NOT NULL AND TRIM(cmname) != ''";
    if ($search_safe !== "") {
        $condition .= " AND cmname LIKE '%$search_safe%'";
    }

    $sql = "
        SELECT collegemid, cmname
        FROM res_college_master
        $condition
        ORDER BY cmname ASC
    ";

    $result = @mysqli_query($conn, $sql);
    if ($result) {
        while ($r = mysqli_fetch_assoc($result)) {
            $name = trim($r['cmname']);
            if (!empty($name)) {
                $data[] = [
                    "id"         => (int)$r['collegemid'],
                    "text"       => $name,
                    "collegemid" => (int)$r['collegemid'],
                    "cmname"     => $name
                ];
            }
        }
    }
}

echo json_encode($data);
?>
