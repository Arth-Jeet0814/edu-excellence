<?php
/**
 * GET Countries API
 * Synced with eduexcellence.sql (res_country_master)
 */

require_once(__DIR__ . "/config/db.php");
$conn = $GLOBALS['conn'] ?? $conn;

if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

$data = [];

if ($conn) {
    $sql = "
        SELECT DISTINCT cnt.countrymid, cnt.countryname, cnt.countrysortname, cnt.countrycurrencyCode
        FROM res_country_master cnt
        WHERE (
            cnt.countrymid IN (SELECT DISTINCT countrymid FROM res_course_master WHERE countrymid > 0)
            OR cnt.cstatus = 'Active'
        )
        AND cnt.countryname IS NOT NULL 
        AND TRIM(cnt.countryname) != ''
        ORDER BY cnt.countryname ASC
    ";

    $result = @mysqli_query($conn, $sql);
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $name = trim($row['countryname']);
            if (!empty($name)) {
                $data[] = [
                    'countrymid'  => (int)$row['countrymid'],
                    'countryname' => $name,
                    'shortname'   => trim($row['countrysortname'] ?? ''),
                    'currency'    => trim($row['countrycurrencyCode'] ?? '')
                ];
            }
        }
    }
}

echo json_encode($data);
?>
