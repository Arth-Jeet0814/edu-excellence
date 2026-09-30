import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    GraduationCap, 
    Building2, 
    DollarSign, 
    Briefcase, 
    CheckCircle2, 
    ArrowRight, 
    Sparkles, 
    Globe, 
    MapPin, 
    BookOpen 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/common/SEO';
import Card from '@/components/common/Card';

const countriesData = [
    {
        id: 'usa',
        name: 'United States',
        flag: 'https://flagcdn.com/w80/us.png',
        image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop',
        overview: 'The United States is the world\'s leading destination for higher education, renowned for groundbreaking research, flexible interdisciplinary degrees, and unmatched post-study STEM OPT career pathways.',
        stats: [
            { label: 'International Students', value: '1M+' },
            { label: 'Universities', value: '4,000+' },
            { label: 'Avg Tuition / Year', value: 'About $50K' },
            { label: 'Post-Study Work', value: '12-36 months OPT' }
        ],
        topUniversities: ['MIT', 'Stanford', 'Harvard', 'Caltech']
    },
    {
        id: 'uk',
        name: 'United Kingdom',
        flag: 'https://flagcdn.com/w80/gb.png',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop',
        overview: 'The UK provides prestigious academic heritage, fast-track 1-year master’s degree structures, internationally recognized qualifications, and a 2-year Graduate Route work visa.',
        stats: [
            { label: 'International Students', value: '500K+' },
            { label: 'Universities', value: '160+' },
            { label: 'Avg Tuition / Year', value: 'About £22K' },
            { label: 'Post-Study Work', value: '2 years' }
        ],
        topUniversities: ['Oxford', 'Cambridge', 'Imperial', 'LSE']
    },
    {
        id: 'canada',
        name: 'Canada',
        flag: 'https://flagcdn.com/w80/ca.png',
        image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop',
        overview: 'Canada is celebrated for welcoming multicultural communities, high academic standards, affordable tuition fees, and transparent 1-3 year Post-Graduation Work Permits (PGWP).',
        stats: [
            { label: 'International Students', value: '642K+' },
            { label: 'Universities', value: '100+' },
            { label: 'Avg Tuition / Year', value: 'About $30K' },
            { label: 'Post-Study Work', value: '1-3 years PGWP' }
        ],
        topUniversities: ['Toronto', 'McGill', 'UBC', 'McMaster']
    },
    {
        id: 'australia',
        name: 'Australia',
        flag: 'https://flagcdn.com/w80/au.png',
        image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800&auto=format&fit=crop',
        overview: 'Australia combines world-leading research hubs, an enviable outdoor lifestyle, strong international student rights, and generous 2-4 year post-study work visa opportunities.',
        stats: [
            { label: 'International Students', value: '624K+' },
            { label: 'Universities', value: '43' },
            { label: 'Avg Tuition / Year', value: 'About $35K' },
            { label: 'Post-Study Work', value: '2-4 years post-study visa' }
        ],
        topUniversities: ['ANU', 'Melbourne', 'Sydney', 'UNSW']
    },
    {
        id: 'germany',
        name: 'Germany',
        flag: 'https://flagcdn.com/w80/de.png',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop',
        overview: 'Germany is Europe\'s economic powerhouse, offering virtually tuition-free education at world-class public universities and an 18-month job-seeker visa for international graduates.',
        stats: [
            { label: 'International Students', value: '350K+' },
            { label: 'Universities', value: '400+' },
            { label: 'Avg Tuition / Year', value: '€0-20K' },
            { label: 'Post-Study Work', value: '18 months post-study' }
        ],
        topUniversities: ['TU Munich', 'Heidelberg', 'LMU', 'Humboldt']
    },
    {
        id: 'new-zealand',
        name: 'New Zealand',
        flag: 'https://flagcdn.com/w80/nz.png',
        image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=800&auto=format&fit=crop',
        overview: 'New Zealand boasts a globally ranked, hands-on education system, unmatched safety and natural beauty, smaller class sizes, and 1-3 years post-study work entitlements.',
        stats: [
            { label: 'International Students', value: '120K+' },
            { label: 'Universities', value: '8' },
            { label: 'Avg Tuition / Year', value: 'About $25K' },
            { label: 'Post-Study Work', value: '1-3 years post-study' }
        ],
        topUniversities: ['Auckland', 'Otago', 'Canterbury', 'Victoria']
    }
];

const featuredUniversities = [
    {
        name: 'MIT (Massachusetts Institute of Technology)',
        location: 'Cambridge, Massachusetts, USA',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop',
        popularPrograms: ['Computer Science & AI', 'Mechanical Engineering', 'Physics & Data Science', 'Economics & Finance'],
        highlight: 'Ranked #1 university in the world, renowned for pioneering technological and scientific research.'
    },
    {
        name: 'University of Cambridge',
        location: 'Cambridge, United Kingdom',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop',
        popularPrograms: ['Natural Sciences', 'Law & Jurisprudence', 'Medicine & Biotechnology', 'Engineering & Mathematics'],
        highlight: 'Over 800 years of academic distinction producing Nobel laureates and world leaders.'
    },
    {
        name: 'Stanford University',
        location: 'Stanford, California, USA',
        image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop',
        popularPrograms: ['Computer Science', 'Business & MBA', 'Bioengineering', 'Artificial Intelligence & Ethics'],
        highlight: 'The heartbeat of Silicon Valley innovation with industry-defining entrepreneurship ecosystems.'
    }
];

const comparisonData = [
    {
        country: 'United States',
        tuition: '$20-50K',
        livingCosts: '$12-18K',
        workDuringStudy: '20 hrs week',
        postStudyWork: '12-36 months'
    },
    {
        country: 'United Kingdom',
        tuition: '£12-25K',
        livingCosts: '£12-15K',
        workDuringStudy: '20 hrs week',
        postStudyWork: '2 years'
    },
    {
        country: 'Canada',
        tuition: 'CAD 15-35K',
        livingCosts: 'CAD 12-15K',
        workDuringStudy: '20 hrs week',
        postStudyWork: '3 years'
    },
    {
        country: 'Australia',
        tuition: 'AUD 20-45K',
        livingCosts: 'AUD 15-21K',
        workDuringStudy: '40 hrs fortnight',
        postStudyWork: '2-4 years'
    }
];

const StudyDestinations = () => {
    const [selectedTab, setSelectedTab] = useState('usa');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const activeCountry = countriesData.find(c => c.id === selectedTab) || countriesData[0];

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <SEO 
                title="Study Destinations | Education eXcellence Services" 
                description="Explore top global study destinations: USA, UK, Canada, Australia, Germany, and New Zealand with Education eXcellence Services in Dakar, Senegal. Compare tuition costs, living expenses, work rights, and top universities."
                url="/study-destinations"
            />

            {/* 1. Header Banner */}
            <div className="bg-[#faf8fb] relative pt-[130px] pb-12 lg:pt-[160px] lg:pb-16 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[60px] relative z-10 text-center">
                    {/* Breadcrumb */}
                    <div className="flex items-center justify-center gap-2 text-[13px] font-bold text-[#888] mb-6">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-primary">Study Destinations</span>
                    </div>

                    <span className="text-primary font-bold text-[13px] uppercase tracking-wider mb-2 block">
                        Global Study Hubs
                    </span>
                    <h1 className="font-sans font-bold text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] text-[#161616] tracking-[-1.5px] mb-4">
                        Explore Top Global <span className="text-primary">Study Destinations</span>
                    </h1>
                    <p className="text-[16px] md:text-[18px] text-[#555] max-w-[700px] mx-auto">
                        Compare world-renowned education systems, tuition costs, post-study work visas, and admission criteria across 6 premier destinations.
                    </p>
                </div>
            </div>

            {/* 2. Destination Tabs & Content Cards */}
            <div className="py-14 lg:py-20 bg-white">
                <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[60px]">
                    
                    {/* Country Selector Tabs */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start lg:justify-center">
                        {countriesData.map((country) => (
                            <button
                                key={country.id}
                                onClick={() => setSelectedTab(country.id)}
                                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-[14px] sm:text-[15px] transition-all whitespace-nowrap border ${
                                    selectedTab === country.id
                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105'
                                        : 'bg-[#faf8fb] text-[#444] border-[#e8dced] hover:border-primary/50'
                                }`}
                            >
                                <img src={country.flag} alt="" className="w-5 h-3.5 object-cover rounded-[2px]" />
                                <span>{country.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Active Destination Card Display */}
                    <Card className="bg-[#faf8fb] border border-[#f0eaf2] rounded-[24px] p-6 lg:p-10 shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            
                            {/* Image & Flag */}
                            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md">
                                <img 
                                    src={activeCountry.image} 
                                    alt={activeCountry.name} 
                                    className="w-full h-full object-cover" 
                                />
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow">
                                    <img src={activeCountry.flag} alt="" className="w-5 h-3.5 object-cover rounded-[2px]" />
                                    <span className="text-[13px] font-bold text-[#161616]">{activeCountry.name}</span>
                                </div>
                            </div>

                            {/* Details & Stats */}
                            <div className="lg:col-span-7 flex flex-col justify-between">
                                <div>
                                    <h2 className="font-sans font-bold text-[28px] lg:text-[36px] text-[#161616] tracking-tight mb-3">
                                        Study in {activeCountry.name}
                                    </h2>
                                    <p className="text-[15px] lg:text-[16px] leading-[1.65] text-[#555] mb-8">
                                        {activeCountry.overview}
                                    </p>

                                    {/* 4 Stat Boxes */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {activeCountry.stats.map((stat, idx) => (
                                            <div key={idx} className="bg-white p-4 rounded-xl border border-[#e8dced] shadow-xs">
                                                <span className="block text-[11px] font-bold text-primary uppercase tracking-wider mb-1">
                                                    {stat.label}
                                                </span>
                                                <span className="block font-sans font-bold text-[18px] lg:text-[20px] text-[#161616]">
                                                    {stat.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Top Universities */}
                                    <div className="mb-8">
                                        <span className="block text-[13px] font-bold text-[#161616] uppercase tracking-wider mb-3">
                                            Top Universities:
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {activeCountry.topUniversities.map((uni, idx) => (
                                                <span 
                                                    key={idx} 
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-[#e8dced] text-[#333] text-[13px] font-semibold"
                                                >
                                                    <GraduationCap size={15} className="text-primary" />
                                                    {uni}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Apply Now Button */}
                                <div>
                                    <Link to="/contact">
                                        <Button 
                                            variant="custom" 
                                            className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-[10px] font-bold text-[15px] transition-all shadow-md inline-flex items-center gap-2 h-auto"
                                        >
                                            Apply Now to {activeCountry.name}
                                            <ArrowRight size={17} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </Card>

                </div>
            </div>

            {/* 3. Featured Global Universities (3 Cards) */}
            <div className="py-16 lg:py-24 bg-[#faf8fb]">
                <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[60px]">
                    <div className="text-center max-w-[700px] mx-auto mb-14">
                        <span className="text-primary font-bold text-[13px] uppercase tracking-wider mb-2 block">
                            World-Class Institutions
                        </span>
                        <h2 className="font-sans font-bold text-[28px] md:text-[40px] text-[#161616] tracking-[-1px] mb-3">
                            Featured Global Universities
                        </h2>
                        <p className="text-[16px] text-[#666]">
                            Explore premier world-ranking institutions shaping global leadership, technology, and research.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredUniversities.map((uni, idx) => (
                            <Card 
                                key={idx} 
                                className="bg-white border border-[#f0eaf2] rounded-[20px] overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="relative h-[210px] w-full overflow-hidden bg-gray-100">
                                    <img 
                                        src={uni.image} 
                                        alt={uni.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-3 left-4 right-4 text-white">
                                        <div className="flex items-center gap-1.5 text-[12px] text-white/90 mb-1">
                                            <MapPin size={14} className="text-primary shrink-0" />
                                            <span>{uni.location}</span>
                                        </div>
                                        <h3 className="font-sans font-bold text-[18px] leading-tight text-white m-0">
                                            {uni.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <div>
                                        <p className="text-[13.5px] text-[#666] leading-relaxed mb-5">
                                            {uni.highlight}
                                        </p>

                                        <span className="block text-[12px] font-bold text-[#161616] uppercase tracking-wider mb-2">
                                            Popular Programs:
                                        </span>
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {uni.popularPrograms.map((prog, pIdx) => (
                                                <span key={pIdx} className="bg-[#f8f5fa] text-[#444] text-[12px] px-2.5 py-1 rounded-md font-medium border border-[#e8dced]">
                                                    {prog}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <Link to="/contact">
                                        <Button 
                                            variant="outline" 
                                            className="w-full border-primary text-primary hover:bg-primary hover:text-white py-2.5 rounded-[8px] font-bold text-[13px] transition-colors inline-flex items-center justify-center gap-1.5 h-auto"
                                        >
                                            Check Eligibility <ArrowRight size={14} />
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Comparison Table (USA, UK, Canada, Australia) */}
            <div className="py-16 lg:py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[60px]">
                    <div className="text-center max-w-[700px] mx-auto mb-14">
                        <span className="text-primary font-bold text-[13px] uppercase tracking-wider mb-2 block">
                            Quick Breakdown
                        </span>
                        <h2 className="font-sans font-bold text-[28px] md:text-[40px] text-[#161616] tracking-[-1px] mb-3">
                            Country Comparison Table
                        </h2>
                        <p className="text-[16px] text-[#666]">
                            Compare tuition costs, living expenses, work allowances during study, and post-study work visa rights side by side.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-[20px] border border-[#f0eaf2] shadow-sm">
                        <table className="w-full text-left border-collapse min-w-[650px]">
                            <thead>
                                <tr className="bg-primary text-white text-[14px]">
                                    <th className="p-5 font-bold">Country</th>
                                    <th className="p-5 font-bold">Average Tuition</th>
                                    <th className="p-5 font-bold">Living Costs / Year</th>
                                    <th className="p-5 font-bold">Work During Study</th>
                                    <th className="p-5 font-bold">Post-Study Work</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f0eaf2] text-[14.5px] text-[#444]">
                                {comparisonData.map((row, idx) => (
                                    <tr 
                                        key={idx} 
                                        className={idx % 2 === 0 ? 'bg-white hover:bg-[#faf8fb]' : 'bg-[#faf8fb] hover:bg-[#f3edf7] transition-colors'}
                                    >
                                        <td className="p-5 font-bold text-[#161616] flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            {row.country}
                                        </td>
                                        <td className="p-5 font-semibold text-[#161616]">{row.tuition}</td>
                                        <td className="p-5">{row.livingCosts}</td>
                                        <td className="p-5">{row.workDuringStudy}</td>
                                        <td className="p-5 font-semibold text-primary">{row.postStudyWork}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 5. CTA Banner to Contact */}
            <div className="bg-gradient-to-r from-[#064e3b] via-primary to-[#064e3b] py-16 text-white">
                <div className="max-w-[1000px] mx-auto px-[20px] lg:px-[60px] text-center">
                    <span className="text-[#f4d160] font-bold text-[13px] uppercase tracking-wider mb-2 block">
                        Personalised Strategy
                    </span>
                    <h2 className="font-sans font-bold text-[28px] md:text-[42px] text-white leading-[1.2] tracking-[-1px] mb-4">
                        Need Help Deciding Which Destination is Best for You?
                    </h2>
                    <p className="text-[16px] md:text-[18px] text-white/85 max-w-[650px] mx-auto mb-8">
                        Our counsellors match your academic background, budget, and long-term career aspirations with the ideal destination and institution.
                    </p>
                    <Link to="/contact">
                        <Button 
                            variant="custom" 
                            className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-[10px] font-bold text-[16px] transition-all shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2 h-auto"
                        >
                            Book Your Free Consultation
                            <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StudyDestinations;
