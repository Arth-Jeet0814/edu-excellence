# Education eXcellence Services — PHP Backend API

This backend provides RESTful JSON endpoints for the **Course Finder** application, connecting to MySQL database in XAMPP or any Apache/PHP server environment.

---

## 🚀 Quick Setup with XAMPP

1. **Start Apache & MySQL** in XAMPP Control Panel.
2. **Import Database**:
   - Open [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
   - Create a new database named `eduexcellence` (or run `backend/database.sql` or your existing `rvqsakxwfu.sql`).
3. **Directory Location**:
   - Place this backend in `D:\xampp\htdocs\EduExcellence` (or your Apache document root).
4. **Database Config**:
   - The connection configuration is in `config/db.php`:
     - **Host**: `localhost`
     - **User**: `root`
     - **Password**: `""` (empty by default in XAMPP)
     - **Database**: `eduexcellence`

---

## 📡 Available API Endpoints

### 1. `GET /get_country.php`
Returns active countries that have available courses.
- **Sample URL**: `http://localhost/EduExcellence/get_country.php`
- **Response**:
```json
[
  { "countrymid": 1, "countryname": "United States", "shortname": "US" },
  { "countrymid": 2, "countryname": "United Kingdom", "shortname": "UK" }
]
```

---

### 2. `GET /get_streams.php`
Returns study streams with optional live search.
- **Parameters**: `search_stream` (optional query string)
- **Sample URL**: `http://localhost/EduExcellence/get_streams.php?search_stream=Computer`

---

### 3. `GET /get_courses.php`
Returns course titles list for autocomplete.
- **Parameters**: `search_course` (optional query string)
- **Sample URL**: `http://localhost/EduExcellence/get_courses.php?search_course=Master`

---

### 4. `GET /get_colleges.php`
Returns universities and colleges list.
- **Parameters**: `search_college` (optional query string)
- **Sample URL**: `http://localhost/EduExcellence/get_colleges.php?search_college=Oxford`

---

### 5. `GET /get_coursedata.php`
Core paginated search and filter endpoint for the Course Finder.
- **Parameters**:
  - `country`: Country ID or Name (e.g. `1` or `United States`)
  - `streamname`: Stream name (e.g. `Computer Science & IT`)
  - `coursemid`: Course Name ID
  - `collegemid`: College ID
  - `scholarship`: `yes`, `no`, `merit`, `need`, `fully`, `partial`
  - `search`: Keyword string (matches course, university, country, or stream)
  - `sort`: `name`, `name-desc`, `university`, `fees-low`, `fees-high`, `duration`, `country`
  - `page`: Page number (default: `1`)
  - `perPage`: Items per page (default: `10`)
- **Sample URL**: `http://localhost/EduExcellence/get_coursedata.php?country=1&page=1&perPage=10`
- **Response**:
```json
{
  "status": "success",
  "currentPage": 1,
  "totalPages": 5,
  "totalRows": 48,
  "perPage": 10,
  "courses": [ ... ]
}
```

---

### 6. `GET /get_course_details.php`
Returns full course details by course ID.
- **Parameters**: `id` (int, required)
- **Sample URL**: `http://localhost/EduExcellence/get_course_details.php?id=1`

---

### 7. `POST /submit_enquiry.php`
Saves course enquiries and student consultation requests.
- **Payload** (JSON or FormData):
```json
{
  "fullName": "Student Name",
  "email": "student@example.com",
  "phone": "+221 77 000 0000",
  "courseId": 1,
  "courseName": "M.S. in Computer Science",
  "university": "MIT",
  "targetIntake": "Fall 2026",
  "notes": "Looking for scholarship opportunities"
}
```
