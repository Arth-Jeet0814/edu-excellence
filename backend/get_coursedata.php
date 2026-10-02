<?php
/**
 * GET Course Data Search & Pagination API
 * Fully synced with eduexcellence.sql MySQL database
 */

require_once(__DIR__ . "/config/db.php");
$conn = $GLOBALS['conn'] ?? $conn;

if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

if (!$conn) {
    if (!headers_sent()) {
        http_response_code(500);
    }
    echo json_encode([
        "status"  => "error",
        "message" => "Database connection failed. Please ensure MySQL is running in XAMPP."
    ]);
    exit;
}

// Read parameters
$country     = $_GET['country'] ?? '';
$streamname  = $_GET['streamname'] ?? $_GET['stream'] ?? '';
$coursemid   = $_GET['coursemid'] ?? '';
$collegemid  = $_GET['collegemid'] ?? '';
$scholarship = $_GET['scholarship'] ?? '';
$eligibility = $_GET['eligibility'] ?? '';
$level       = $_GET['level'] ?? '';
$search      = $_GET['search'] ?? $_GET['q'] ?? '';
$sortBy      = $_GET['sort'] ?? 'name';
$perPage     = isset($_GET['perPage']) ? max(1, min(100, (int)$_GET['perPage'])) : 9;
$page        = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;

// Escape values
$country_safe     = mysqli_real_escape_string($conn, trim($country));
$streamname_safe  = mysqli_real_escape_string($conn, trim($streamname));
$coursemid_safe   = mysqli_real_escape_string($conn, trim($coursemid));
$collegemid_safe  = mysqli_real_escape_string($conn, trim($collegemid));
$scholarship_safe = mysqli_real_escape_string($conn, trim($scholarship));
$eligibility_safe = mysqli_real_escape_string($conn, trim($eligibility));
$level_safe       = mysqli_real_escape_string($conn, trim($level));
$search_safe      = mysqli_real_escape_string($conn, trim($search));

// Build WHERE conditions
$whereConditions = ["1=1"];

if ($country_safe !== '') {
    if (is_numeric($country_safe)) {
        $whereConditions[] = "c.countrymid = '$country_safe'";
    } else {
        $whereConditions[] = "(cnt.countryname LIKE '%$country_safe%' OR cnt.countrysortname LIKE '%$country_safe%')";
    }
}

if ($streamname_safe !== '') {
    if (is_numeric($streamname_safe)) {
        $whereConditions[] = "c.streamname = '$streamname_safe'";
    } else {
        $whereConditions[] = "(st.streamname LIKE '%$streamname_safe%')";
    }
}

if ($coursemid_safe !== '') {
    $whereConditions[] = "c.cnmid = '$coursemid_safe'";
}

if ($collegemid_safe !== '') {
    $whereConditions[] = "c.collegemid = '$collegemid_safe'";
}

if ($scholarship_safe !== '') {
    if (in_array(strtolower($scholarship_safe), ['yes', 'available', '1'])) {
        $whereConditions[] = "(c.scholarshipavailble IS NOT NULL AND c.scholarshipavailble != '' AND LOWER(c.scholarshipavailble) != 'no')";
    } elseif (in_array(strtolower($scholarship_safe), ['no', 'none', '0'])) {
        $whereConditions[] = "(c.scholarshipavailble IS NULL OR c.scholarshipavailble = '' OR LOWER(c.scholarshipavailble) = 'no')";
    } else {
        $whereConditions[] = "c.scholarshipavailble LIKE '%$scholarship_safe%'";
    }
}

if ($level_safe !== '') {
    $whereConditions[] = "(c.levelofstudy LIKE '%$level_safe%' OR cn.coursename LIKE '%$level_safe%')";
}

if ($eligibility_safe !== '') {
    $whereConditions[] = "(c.cmeligibility LIKE '%$eligibility_safe%' OR c.entryrequirements LIKE '%$eligibility_safe%')";
}

if ($search_safe !== '') {
    $whereConditions[] = "(
        cn.coursename LIKE '%$search_safe%' OR 
        col.cmname LIKE '%$search_safe%' OR 
        cnt.countryname LIKE '%$search_safe%' OR
        st.streamname LIKE '%$search_safe%' OR
        c.cmdesc LIKE '%$search_safe%'
    )";
}

$whereClause = "WHERE " . implode(" AND ", $whereConditions);

// Order By Clause
$orderByClause = "ORDER BY cn.coursename ASC";
switch ($sortBy) {
    case 'name-desc':
        $orderByClause = "ORDER BY cn.coursename DESC";
        break;
    case 'university':
        $orderByClause = "ORDER BY col.cmname ASC";
        break;
    case 'university-desc':
        $orderByClause = "ORDER BY col.cmname DESC";
        break;
    case 'fees-low':
        $orderByClause = "ORDER BY CAST(NULLIF(REGEXP_REPLACE(c.cmfees, '[^0-9.]', ''), '') AS DECIMAL(10,2)) ASC";
        break;
    case 'fees-high':
        $orderByClause = "ORDER BY CAST(NULLIF(REGEXP_REPLACE(c.cmfees, '[^0-9.]', ''), '') AS DECIMAL(10,2)) DESC";
        break;
    case 'duration':
        $orderByClause = "ORDER BY CAST(NULLIF(REGEXP_REPLACE(c.cmduration, '[^0-9.]', ''), '') AS DECIMAL(10,2)) ASC";
        break;
    case 'duration-desc':
        $orderByClause = "ORDER BY CAST(NULLIF(REGEXP_REPLACE(c.cmduration, '[^0-9.]', ''), '') AS DECIMAL(10,2)) DESC";
        break;
    case 'country':
        $orderByClause = "ORDER BY cnt.countryname ASC";
        break;
    case 'country-desc':
        $orderByClause = "ORDER BY cnt.countryname DESC";
        break;
    default:
        $orderByClause = "ORDER BY cn.coursename ASC";
        break;
}

// 1. Count Total Rows
$countSql = "
    SELECT COUNT(*) as total
    FROM res_course_master c
    LEFT JOIN res_coursename_master cn ON cn.cnmid = c.cnmid
    LEFT JOIN res_college_master col ON col.collegemid = c.collegemid
    LEFT JOIN res_country_master cnt ON cnt.countrymid = c.countrymid
    LEFT JOIN res_stream_master st ON st.streammid = c.streamname
    $whereClause
";

$countResult = @mysqli_query($conn, $countSql);
$totalRows = 0;
if ($countResult) {
    $countRow = mysqli_fetch_assoc($countResult);
    $totalRows = (int)$countRow['total'];
}

$totalPages = $totalRows > 0 ? (int)ceil($totalRows / $perPage) : 1;
if ($page > $totalPages && $totalPages > 0) {
    $page = $totalPages;
}
$offset = ($page - 1) * $perPage;

// 2. Select Paginated Records
$sql = "
    SELECT 
        c.coursemid,
        c.cnmid,
        cn.coursename,
        c.streamname as stream_id,
        st.streamname as stream_name,
        c.collegemid,
        col.cmname as college_name,
        c.countrymid,
        cnt.countryname,
        c.levelofstudy,
        c.cmduration,
        c.cmfees,
        c.cmdesc,
        c.cmeligibility,
        c.cmfacility,
        c.cmdocument,
        c.cmremarks,
        c.openintakes,
        c.intakeyear,
        c.scholarshipavailble,
        c.cprogramlink,
        c.universityranking,
        c.ielts,
        c.toefl,
        c.pte,
        c.duolingo,
        c.gre,
        c.gmat
    FROM res_course_master c
    LEFT JOIN res_coursename_master cn ON cn.cnmid = c.cnmid
    LEFT JOIN res_college_master col ON col.collegemid = c.collegemid
    LEFT JOIN res_country_master cnt ON cnt.countrymid = c.countrymid
    LEFT JOIN res_stream_master st ON st.streammid = c.streamname
    $whereClause
    $orderByClause
    LIMIT $perPage OFFSET $offset
";

$queryResult = @mysqli_query($conn, $sql);
$courses = [];

if ($queryResult) {
    while ($row = mysqli_fetch_assoc($queryResult)) {
        $cleanName = trim(preg_replace('/\s+/', ' ', $row['coursename'] ?? 'Degree Program'));
        $cleanUniversity = trim($row['college_name'] ?? 'Partner University');
        $cleanCountry = trim($row['countryname'] ?? 'International');
        $cleanStream = trim($row['stream_name'] ?? 'General Studies');

        $level = trim($row['levelofstudy'] ?? '');
        if (empty($level)) {
            if (stripos($cleanName, 'bachelor') !== false || stripos($cleanName, 'b.') !== false || stripos($cleanName, 'undergraduate') !== false) {
                $level = "Bachelor's";
            } elseif (stripos($cleanName, 'phd') !== false || stripos($cleanName, 'doctor') !== false) {
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
        $scholarshipText = $hasScholarship ? $rawScholarship : 'Not Specified';

        $courses[] = [
            'id'                  => (int)$row['coursemid'],
            'name'                => $cleanName,
            'university'          => $cleanUniversity,
            'country'             => $cleanCountry,
            'stream'              => $cleanStream ?: 'General Studies',
            'level'               => $level,
            'duration'            => $duration,
            'durationText'        => $rawDuration ?: ($duration . " Years"),
            'fees'                => $fees,
            'feesText'            => $rawFees ?: ($fees > 0 ? "$" . number_format($fees) : "Contact for fees"),
            'intake'              => trim($row['openintakes'] ?? '') ?: 'Fall / Spring',
            'scholarship'         => $hasScholarship ? 'yes' : 'no',
            'scholarshipText'     => $scholarshipText,
            'eligibility'         => trim($row['cmeligibility'] ?? '') ?: 'Standard academic admission criteria',
            'description'         => trim($row['cmdesc'] ?? '') ?: 'Comprehensive international university program offering modern curriculum, expert faculty, and global career pathways.',
            'facilities'          => trim($row['cmfacility'] ?? ''),
            'ranking'             => trim($row['universityranking'] ?? '') ?: 'Recognised Global Institution',
            'programLink'         => trim($row['cprogramlink'] ?? ''),
            'documents'           => !empty($row['cmdocument']) ? array_map('trim', explode(',', $row['cmdocument'])) : ['Transcripts', 'Passport', 'SOP', 'Letters of Recommendation'],
            'tests'               => [
                'ielts'    => trim($row['ielts'] ?? ''),
                'toefl'    => trim($row['toefl'] ?? ''),
                'pte'      => trim($row['pte'] ?? ''),
                'duolingo' => trim($row['duolingo'] ?? ''),
                'gre'      => trim($row['gre'] ?? ''),
                'gmat'     => trim($row['gmat'] ?? '')
            ]
        ];
    }
}

echo json_encode([
    'status'      => 'success',
    'currentPage' => (int)$page,
    'totalPages'  => (int)$totalPages,
    'totalRows'   => (int)$totalRows,
    'perPage'     => (int)$perPage,
    'courses'     => $courses
]);
?>
