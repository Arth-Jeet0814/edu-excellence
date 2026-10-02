<?php
/**
 * GET Streams API
 * Synced with eduexcellence.sql (res_stream_master)
 */

require_once(__DIR__ . "/config/db.php");
$conn = $GLOBALS['conn'] ?? $conn;

if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

$search = $_GET['search_stream'] ?? $_GET['search'] ?? "";
$data = [];

if ($conn) {
    $search_safe = mysqli_real_escape_string($conn, trim($search));
    $filterCondition = "WHERE streamname IS NOT NULL AND TRIM(streamname) != ''";
    if ($search_safe !== "") {
        $filterCondition .= " AND streamname LIKE '%$search_safe%'";
    }

    $sql = "
        SELECT DISTINCT streammid, streamname 
        FROM res_stream_master 
        $filterCondition
        ORDER BY streamname ASC
    ";

    $result = @mysqli_query($conn, $sql);
    if ($result) {
        while ($r = mysqli_fetch_assoc($result)) {
            $name = trim($r['streamname']);
            if (!empty($name)) {
                $data[] = [
                    'id'        => (int)$r['streammid'],
                    'text'      => $name,
                    'streammid' => (int)$r['streammid'],
                    'name'      => $name
                ];
            }
        }
    }
}

echo json_encode($data);
?>
