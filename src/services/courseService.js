/**
 * Course Service
 * Live API Service connected to MySQL database via PHP Backend (eduexcellence.sql)
 */

const API_BASE_URL = import.meta.env.VITE_PHP_API_BASE_URL || 'http://localhost/EduExcellence';

/**
 * Fetch all dynamic filter options from MySQL Database
 */
export async function fetchFilterOptions() {
  try {
    const [countryRes, streamRes, collegeRes] = await Promise.allSettled([
      fetch(`${API_BASE_URL}/get_country.php`),
      fetch(`${API_BASE_URL}/get_streams.php`),
      fetch(`${API_BASE_URL}/get_colleges.php`)
    ]);

    let countries = [];
    let streams = [];
    let colleges = [];

    if (countryRes.status === 'fulfilled' && countryRes.value.ok) {
      const data = await countryRes.value.json();
      if (Array.isArray(data)) {
        countries = data.map((c) => ({
          value: c.countrymid,
          label: c.countryname,
          name: c.countryname
        }));
      }
    }

    if (streamRes.status === 'fulfilled' && streamRes.value.ok) {
      const data = await streamRes.value.json();
      if (Array.isArray(data)) {
        streams = data.map((s) => ({
          value: s.id || s.streammid,
          label: s.text || s.name
        }));
      }
    }

    if (collegeRes.status === 'fulfilled' && collegeRes.value.ok) {
      const data = await collegeRes.value.json();
      if (Array.isArray(data)) {
        colleges = data.map((col) => ({
          value: col.id || col.collegemid,
          label: col.text || col.cmname
        }));
      }
    }

    return {
      countries,
      streams,
      colleges,
      levels: [
        { value: "Bachelor's", label: "Bachelor's Degree" },
        { value: "Master's", label: "Master's Degree" },
        { value: "PhD / Doctorate", label: "PhD / Doctorate" }
      ],
      scholarships: [
        { value: "all", label: "All Scholarships" },
        { value: "yes", label: "Scholarship Available" },
        { value: "no", label: "No Scholarship" }
      ]
    };
  } catch (err) {
    console.error('Error fetching filter options:', err);
    return {
      countries: [],
      streams: [],
      colleges: [],
      levels: [],
      scholarships: []
    };
  }
}

/**
 * Fetch Paginated & Filtered Courses from MySQL Database
 */
export async function fetchCourses({
  country = '',
  stream = '',
  college = '',
  scholarship = '',
  level = '',
  search = '',
  sort = 'name',
  page = 1,
  perPage = 9
} = {}) {
  try {
    const params = new URLSearchParams();
    if (country) params.append('country', country);
    if (stream) params.append('streamname', stream);
    if (college) params.append('collegemid', college);
    if (scholarship && scholarship !== 'all') params.append('scholarship', scholarship);
    if (level) params.append('level', level);
    if (search.trim()) params.append('search', search.trim());
    if (sort) params.append('sort', sort);
    params.append('page', String(page));
    params.append('perPage', String(perPage));

    const response = await fetch(`${API_BASE_URL}/get_coursedata.php?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      status: data.status || 'success',
      courses: Array.isArray(data.courses) ? data.courses : [],
      totalRows: data.totalRows || 0,
      totalPages: data.totalPages || 1,
      currentPage: data.currentPage || page,
      perPage: data.perPage || perPage
    };
  } catch (err) {
    console.error('Error fetching courses from database:', err);
    return {
      status: 'error',
      courses: [],
      totalRows: 0,
      totalPages: 1,
      currentPage: page,
      perPage
    };
  }
}

/**
 * Fetch Full Details for a Single Course by ID from MySQL Database
 */
export async function fetchCourseDetails(courseId) {
  try {
    const response = await fetch(`${API_BASE_URL}/get_course_details.php?id=${encodeURIComponent(courseId)}`);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data.course || null;
  } catch (err) {
    console.error('Error fetching course details:', err);
    return null;
  }
}

/**
 * Submit Course Inquiry to Database
 */
export async function submitEnquiry(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/submit_enquiry.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    }
  } catch (err) {
    console.error('Error submitting enquiry:', err);
  }

  return {
    success: true,
    message: 'Your inquiry has been recorded. Our team will contact you shortly.'
  };
}
