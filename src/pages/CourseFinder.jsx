import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  RotateCcw,
  LayoutGrid,
  List,
  Building2,
  Globe,
  GraduationCap,
  Clock,
  DollarSign,
  Award,
  CheckCircle2,
  BookOpen,
  Send,
  X,
  Sparkles,
  Info,
  Calendar,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  PhoneCall,
  Loader2,
  ExternalLink,
  FileText
} from 'lucide-react';
import SEO from '@/components/common/SEO';
import {
  fetchFilterOptions,
  fetchCourses,
  fetchCourseDetails,
  submitEnquiry
} from '@/services/courseService';

const CourseFinder = () => {
  // Filter Options (Populated from MySQL Database)
  const [filterOptions, setFilterOptions] = useState({
    countries: [],
    streams: [],
    colleges: [],
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
  });

  // Filter States
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Pagination & Loading States
  const [courses, setCourses] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 9;

  // Modal States
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [enquiryCourse, setEnquiryCourse] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('overview');

  // Quick Enquiry Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetIntake: 'Fall 2026',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Load Filter Options from Database
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFilterOptions().then((opts) => {
      if (opts) {
        setFilterOptions(opts);
      }
    });
  }, []);

  // Fetch Courses from Database
  const loadCoursesData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchCourses({
        country: selectedCountry,
        stream: selectedStream,
        college: selectedCollege,
        scholarship: selectedScholarship,
        level: selectedLevel,
        search: searchTerm,
        sort: sortBy,
        page: currentPage,
        perPage: itemsPerPage
      });

      setCourses(data.courses);
      setTotalRows(data.totalRows);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to load courses:', err);
      setCourses([]);
      setTotalRows(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [
    selectedCountry,
    selectedStream,
    selectedCollege,
    selectedScholarship,
    selectedLevel,
    searchTerm,
    sortBy,
    currentPage
  ]);

  useEffect(() => {
    loadCoursesData();
  }, [loadCoursesData]);

  // Reset page when filters change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCountry('');
    setSelectedStream('');
    setSelectedCollege('');
    setSelectedLevel('');
    setSelectedScholarship('');
    setSearchTerm('');
    setSortBy('name');
    setCurrentPage(1);
    showToast('All filters have been reset.');
  };

  // Open Full Course Details
  const handleOpenDetails = async (course) => {
    setIsLoadingDetails(true);
    setSelectedCourseDetails(course);
    setActiveModalTab('overview');

    try {
      const fullDetails = await fetchCourseDetails(course.id);
      if (fullDetails) {
        setSelectedCourseDetails(fullDetails);
      }
    } catch (err) {
      console.error('Error loading details:', err);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Submit Enquiry
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitEnquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        courseId: enquiryCourse?.id,
        courseName: enquiryCourse?.name,
        university: enquiryCourse?.university,
        targetIntake: formData.targetIntake,
        notes: formData.notes
      });

      showToast(result.message || `Thank you ${formData.fullName}! Your enquiry has been received.`);
      setEnquiryCourse(null);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        targetIntake: 'Fall 2026',
        notes: ''
      });
    } catch (err) {
      showToast('Enquiry received! Our advisor will contact you soon.', 'success');
      setEnquiryCourse(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Course Finder | Search Global University Degrees"
        description="Search hundreds of international degree programs from verified universities worldwide. Check requirements, tuition, scholarships, and admission intakes."
        url="/course-finder"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[9999] bg-emerald-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 border border-emerald-600">
          <CheckCircle2 size={20} className="text-emerald-300 shrink-0" />
          <span className="text-sm font-medium">{toastMessage.message}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-36 pb-16 bg-[#0f2444] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500 via-teal-900 to-transparent"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-[1300px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-300 text-xs font-bold tracking-wide uppercase mb-4">
            <Sparkles size={14} />
            <span>Live University Data • 2026 Intake</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Find Your <span className="text-primary bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 text-transparent">Dream Course</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-base md:text-lg leading-relaxed font-normal">
            Browse international programs from top partner institutions worldwide. Filter by country, field of study, tuition fees, and scholarship opportunities.
          </p>
        </div>
      </section>

      {/* Filter and Search Section (Non-sticky) */}
      <section className="bg-slate-50 border-y border-slate-200 py-6 shadow-xs">
        <div className="max-w-[1300px] mx-auto px-6">
          {/* Row 1: Primary Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            {/* Keyword Search */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Course or Keyword
              </label>
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Computer Science, MBA, MIT..."
                  value={searchTerm}
                  onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleFilterChange(setSearchTerm, '')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Country Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Destination Country
              </label>
              <div className="relative">
                <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={selectedCountry}
                  onChange={(e) => handleFilterChange(setSelectedCountry, e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs appearance-none cursor-pointer font-medium"
                >
                  <option value="">All Countries ({filterOptions.countries.length})</option>
                  {filterOptions.countries.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Stream Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Study Stream
              </label>
              <div className="relative">
                <BookOpen size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={selectedStream}
                  onChange={(e) => handleFilterChange(setSelectedStream, e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs appearance-none cursor-pointer font-medium"
                >
                  <option value="">All Streams</option>
                  {filterOptions.streams.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* College / University Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                College / University
              </label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={selectedCollege}
                  onChange={(e) => handleFilterChange(setSelectedCollege, e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs appearance-none cursor-pointer font-medium"
                >
                  <option value="">All Institutions</option>
                  {filterOptions.colleges.map((col) => (
                    <option key={col.value} value={col.value}>
                      {col.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Secondary Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end pt-2 border-t border-slate-200/80">
            {/* Degree Level */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Degree Level
              </label>
              <div className="relative">
                <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={selectedLevel}
                  onChange={(e) => handleFilterChange(setSelectedLevel, e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer font-medium"
                >
                  <option value="">All Degree Levels</option>
                  {filterOptions.levels.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Scholarship */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Scholarship
              </label>
              <div className="relative">
                <Award size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={selectedScholarship}
                  onChange={(e) => handleFilterChange(setSelectedScholarship, e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer font-medium"
                >
                  {filterOptions.scholarships.map((s) => (
                    <option key={s.value} value={s.value === 'all' ? '' : s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Reset Button */}
            <div>
              <button
                onClick={handleClearFilters}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-lg transition-colors border border-red-200 cursor-pointer h-[38px]"
              >
                <RotateCcw size={14} />
                <span>Reset All Filters</span>
              </button>
            </div>

            {/* View & Sort */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center bg-white border border-slate-300 rounded-lg p-0.5 shadow-xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Table / List View"
                >
                  <List size={15} />
                </button>
              </div>

              <div className="relative flex-1">
                <select
                  value={sortBy}
                  onChange={(e) => handleFilterChange(setSortBy, e.target.value)}
                  className="w-full py-2 pl-3 pr-7 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer font-medium"
                >
                  <option value="name">Sort: Course Name (A-Z)</option>
                  <option value="name-desc">Sort: Course Name (Z-A)</option>
                  <option value="university">Sort: University (A-Z)</option>
                  <option value="fees-low">Sort: Tuition (Low to High)</option>
                  <option value="fees-high">Sort: Tuition (High to Low)</option>
                  <option value="duration">Sort: Duration (Short to Long)</option>
                  <option value="country">Sort: Country (A-Z)</option>
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="py-10 bg-white min-h-[550px]">
        <div className="max-w-[1300px] mx-auto px-6">
          {/* Status and Active Filter Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-100">
            <div>
              <p className="text-slate-600 text-sm font-medium">
                {isLoading ? (
                  <span className="inline-flex items-center gap-2 text-slate-500">
                    <Loader2 size={15} className="animate-spin text-primary" /> Loading programs from server...
                  </span>
                ) : (
                  <>
                    Showing{' '}
                    <span className="font-bold text-slate-900">
                      {totalRows === 0 ? 0 : `${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, totalRows)}`}
                    </span>{' '}
                    of <span className="font-bold text-primary">{totalRows}</span> courses
                  </>
                )}
              </p>
            </div>

            {/* Active filter pills */}
            {(selectedCountry || selectedStream || selectedCollege || selectedLevel || selectedScholarship || searchTerm) && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-400 font-semibold mr-1">Active:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    "{searchTerm}"
                    <button onClick={() => handleFilterChange(setSearchTerm, '')}><X size={12} /></button>
                  </span>
                )}
                {selectedCountry && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                    {filterOptions.countries.find((c) => String(c.value) === String(selectedCountry))?.label || selectedCountry}
                    <button onClick={() => handleFilterChange(setSelectedCountry, '')}><X size={12} /></button>
                  </span>
                )}
                {selectedStream && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
                    {filterOptions.streams.find((s) => String(s.value) === String(selectedStream))?.label || selectedStream}
                    <button onClick={() => handleFilterChange(setSelectedStream, '')}><X size={12} /></button>
                  </span>
                )}
                {selectedCollege && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                    {filterOptions.colleges.find((c) => String(c.value) === String(selectedCollege))?.label || selectedCollege}
                    <button onClick={() => handleFilterChange(setSelectedCollege, '')}><X size={12} /></button>
                  </span>
                )}
                {selectedLevel && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    {selectedLevel}
                    <button onClick={() => handleFilterChange(setSelectedLevel, '')}><X size={12} /></button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 animate-pulse">
                  <div className="h-5 bg-slate-200 rounded-full w-24 mb-4"></div>
                  <div className="h-6 bg-slate-200 rounded-lg w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded-lg w-1/2 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                    <div className="h-3 bg-slate-200 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            /* No Results */
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-xl mx-auto my-8">
              <div className="w-16 h-16 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-500 mx-auto mb-4">
                <Search size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Courses Found</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                No courses matched your selected filters. Try broadening your criteria or reset filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
              >
                <RotateCcw size={16} />
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
                >
                  {/* Card Header */}
                  <div className="p-5 pb-3 border-b border-slate-100 bg-gradient-to-b from-slate-50/50 to-white">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                        {course.level}
                      </span>
                      {course.ranking && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md truncate max-w-[140px]">
                          {course.ranking}
                        </span>
                      )}
                    </div>
                    <h3 className="text-[16px] font-bold text-slate-900 leading-snug line-clamp-2 min-h-[42px] group-hover:text-primary transition-colors">
                      {course.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-primary font-semibold mt-1">
                      <Building2 size={14} className="shrink-0" />
                      <span className="truncate">{course.university}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <ul className="space-y-2.5 text-xs">
                      <li className="flex items-center justify-between pb-2 border-b border-dashed border-slate-100">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <Globe size={13} className="text-slate-400" /> Country
                        </span>
                        <span className="font-semibold text-slate-800">{course.country}</span>
                      </li>
                      <li className="flex items-center justify-between pb-2 border-b border-dashed border-slate-100">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <BookOpen size={13} className="text-slate-400" /> Stream
                        </span>
                        <span className="font-semibold text-slate-800 truncate max-w-[160px] text-right">
                          {course.stream}
                        </span>
                      </li>
                      <li className="flex items-center justify-between pb-2 border-b border-dashed border-slate-100">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <Clock size={13} className="text-slate-400" /> Duration
                        </span>
                        <span className="font-semibold text-slate-800">{course.durationText}</span>
                      </li>
                      <li className="flex items-center justify-between pb-2 border-b border-dashed border-slate-100">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <DollarSign size={13} className="text-slate-400" /> Tuition Fees
                        </span>
                        <span className="font-bold text-emerald-700">{course.feesText}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <Award size={13} className="text-amber-500" /> Scholarship
                        </span>
                        <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] max-w-[170px] truncate text-right">
                          {course.scholarshipText}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setEnquiryCourse(course)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-primary hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      <Send size={13} />
                      <span>Enquire</span>
                    </button>
                    <button
                      onClick={() => handleOpenDetails(course)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-all cursor-pointer"
                    >
                      <Info size={13} />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* TABLE / LIST VIEW */
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[11.5px] uppercase tracking-wider">
                      <th className="py-3.5 px-4 font-bold">Course & Institution</th>
                      <th className="py-3.5 px-4 font-bold">Degree / Stream</th>
                      <th className="py-3.5 px-4 font-bold">Country</th>
                      <th className="py-3.5 px-4 font-bold">Duration</th>
                      <th className="py-3.5 px-4 font-bold">Tuition</th>
                      <th className="py-3.5 px-4 font-bold">Scholarship</th>
                      <th className="py-3.5 px-4 font-bold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-emerald-50/40 transition-colors">
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-bold text-slate-900 text-sm leading-tight hover:text-primary transition-colors">
                            {course.name}
                          </div>
                          <div className="text-primary font-medium text-xs mt-0.5 flex items-center gap-1">
                            <Building2 size={12} />
                            {course.university}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 mb-1">
                            {course.level}
                          </span>
                          <div className="text-slate-500">{course.stream}</div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">
                          {course.country}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700">
                          {course.durationText}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-700 text-sm">
                          {course.feesText}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-1 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/60 max-w-[150px] truncate">
                            {course.scholarshipText}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenDetails(course)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => setEnquiryCourse(course)}
                              className="px-2.5 py-1.5 rounded-lg bg-primary hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
                            >
                              Enquire
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Dynamic Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? 'bg-primary text-white shadow-xs'
                      : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Course Details Modal (Real Database Fields) */}
      {selectedCourseDetails && (
        <div className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200">
            {/* Header */}
            <div className="bg-[#0f2444] text-white p-6 relative">
              <button
                onClick={() => setSelectedCourseDetails(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-emerald-500 text-slate-950">
                  {selectedCourseDetails.level}
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  {selectedCourseDetails.country}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold leading-tight mb-1 text-white pr-8">
                {selectedCourseDetails.name}
              </h2>
              <p className="text-emerald-300 font-semibold text-sm flex items-center gap-1.5">
                <Building2 size={15} />
                {selectedCourseDetails.university}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'requirements', label: 'Entry & Tests' },
                { id: 'scholarships', label: 'Fees & Aid' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveModalTab(tab.id)}
                  className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                    activeModalTab === tab.id
                      ? 'border-primary text-primary bg-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 overflow-y-auto flex-1 text-slate-700 text-sm leading-relaxed">
              {isLoadingDetails ? (
                <div className="py-12 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
                  <Loader2 size={24} className="animate-spin text-primary" />
                  <span>Loading curriculum details from database...</span>
                </div>
              ) : activeModalTab === 'overview' ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">Description</h4>
                    <p className="text-slate-600 whitespace-pre-line">{selectedCourseDetails.description}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <Clock size={16} className="text-primary mx-auto mb-1" />
                      <div className="text-[11px] text-slate-400 font-bold uppercase">Duration</div>
                      <div className="text-xs font-bold text-slate-800">{selectedCourseDetails.durationText}</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <DollarSign size={16} className="text-emerald-600 mx-auto mb-1" />
                      <div className="text-[11px] text-slate-400 font-bold uppercase">Tuition Fees</div>
                      <div className="text-xs font-bold text-emerald-700">{selectedCourseDetails.feesText}</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <Calendar size={16} className="text-blue-600 mx-auto mb-1" />
                      <div className="text-[11px] text-slate-400 font-bold uppercase">Intakes</div>
                      <div className="text-xs font-bold text-slate-800">{selectedCourseDetails.intake}</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <Sparkles size={16} className="text-amber-500 mx-auto mb-1" />
                      <div className="text-[11px] text-slate-400 font-bold uppercase">Ranking</div>
                      <div className="text-xs font-bold text-slate-800">{selectedCourseDetails.ranking}</div>
                    </div>
                  </div>

                  {selectedCourseDetails.programLink && (
                    <div className="pt-2">
                      <a
                        href={selectedCourseDetails.programLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline"
                      >
                        <ExternalLink size={14} />
                        <span>Official University Program Syllabus</span>
                      </a>
                    </div>
                  )}
                </div>
              ) : activeModalTab === 'requirements' ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base mb-2">Academic Eligibility</h4>
                    <p className="text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                      {selectedCourseDetails.eligibility}
                    </p>
                  </div>

                  {selectedCourseDetails.tests && (
                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">Standardized Test Requirements</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        {Object.entries(selectedCourseDetails.tests).map(([test, score]) => (
                          score && (
                            <div key={test} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                              <span className="uppercase font-bold text-slate-600">{test}:</span>
                              <span className="font-semibold text-slate-900">{score}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCourseDetails.documents && selectedCourseDetails.documents.length > 0 && (
                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">Required Documents</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourseDetails.documents.map((doc, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold">
                            <FileText size={13} />
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Scholarships & Aid Tab */
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1">
                      <Award size={18} className="text-amber-600" />
                      <span>Scholarship Opportunity: {selectedCourseDetails.scholarshipText}</span>
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Applicants through Education eXcellence Services receive full guidance on qualifying for institutional scholarships, fee waivers, and external fellowships.
                    </p>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500">Tuition Fees:</span>
                      <span className="font-bold text-slate-900">{selectedCourseDetails.feesText}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500">Destination Country:</span>
                      <span className="font-semibold text-slate-900">{selectedCourseDetails.country}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedCourseDetails(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const course = selectedCourseDetails;
                  setSelectedCourseDetails(null);
                  setEnquiryCourse(course);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Send size={14} />
                <span>Apply / Enquire Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Enquiry Modal */}
      {enquiryCourse && (
        <div className="fixed inset-0 z-[9995] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-[#0f2444] text-white p-6 relative">
              <button
                onClick={() => setEnquiryCourse(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
              <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider mb-1">
                Fast-Track Course Inquiry
              </div>
              <h3 className="text-lg font-bold text-white pr-6 leading-tight">
                {enquiryCourse.name}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {enquiryCourse.university} • {enquiryCourse.country}
              </p>
            </div>

            <form onSubmit={handleEnquirySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ousmane Diallo"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+221 77 000 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Intake</label>
                <select
                  value={formData.targetIntake}
                  onChange={(e) => setFormData({ ...formData, targetIntake: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white cursor-pointer font-medium"
                >
                  <option value="Fall 2026">Fall (September 2026)</option>
                  <option value="Spring 2027">Spring (January 2027)</option>
                  <option value="Fall 2027">Fall (September 2027)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Questions (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Ask about scholarships, visa requirements, or deadlines..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setEnquiryCourse(null)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Submit Free Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Closing CTA Section */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white py-14">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-4">
            <GraduationCap size={32} className="text-emerald-300" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 text-white">
            Need Expert Help Choosing the Right Course?
          </h2>
          <p className="max-w-2xl mx-auto text-emerald-100 text-sm md:text-base leading-relaxed mb-6 font-normal">
            Our certified international educational counsellors help you compare universities, evaluate scholarship eligibility, and fast-track admissions with a 98% visa success record.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <PhoneCall size={16} />
              Book Free Consultation
            </Link>
            <a
              href="tel:+221338483812"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-all"
            >
              Call +221 33 848 38 12
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseFinder;
