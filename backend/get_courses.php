<?php
/**
 * GET Courses Name List API
 * Returns course titles for autocomplete/dropdown selection.
 */

require_once(__DIR__ . "/config/db.php");
check_db_connection($conn);

header('Content-Type: application/json; charset=utf-8');

$search = $_GET['search_course'] ?? $_GET['search'] ?? "";
$search_safe = mysqli_real_escape_string($conn, trim($search));

$condition = "";
if ($search_safe !== "") {
    $condition = "AND c.coursename LIKE '%$search_safe%'";
}

$sql = "
    SELECT DISTINCT c.cnmid, c.coursename
    FROM res_coursename_master c
    INNER JOIN res_course_master cm ON c.cnmid = cm.cnmid
    WHERE 1=1 $condition
    ORDER BY c.coursename ASC
    LIMIT 100
";

$result = @mysqli_query($conn, $sql);
$data = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = [
            'coursemid'  => (int)$row['cnmid'],
            'coursename' => $row['coursename'],
            'id'         => (int)$row['cnmid'],
            'text'       => $row['coursename']
        ];
    }
}

echo json_encode($data);
?>
