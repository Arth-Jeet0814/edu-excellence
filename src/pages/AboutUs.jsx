import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowRight, 
    Target, 
    Eye, 
    Shield, 
    Heart, 
    Award, 
    Sparkles, 
    Compass, 
    Globe, 
    CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/common/SEO';
import Card from '@/components/common/Card';
import teamImage from '@/assets/images/about_us_team.jpg';

const teamMembers = [
    {
        name: "Moustapha Diop",
        role: "Managing Director & Principal Consultant",
        credential: "15+ Years Education Strategy",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
    },
    {
        name: "Amina Ndiaye",
        role: "Head of International Admissions (USA & Canada)",
        credential: "Certified US Admissions Specialist",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
    },
    {
        name: "Cheikh Tall",
        role: "Senior Visa & Compliance Specialist (UK & Europe)",
        credential: "Ex-Immigration Compliance Advisor",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
    },
    {
        name: "Fatou Sow",
        role: "Career Counsellor & Australia/NZ Admissions Lead",
        credential: "Qualified Career Guidance Strategist",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop"
    }
];

const coreValues = [
    {
        icon: <Shield size={26} className="text-primary" />,
        title: "Integrity",
        description: "Uncompromising honesty and ethical clarity in every profile evaluation, university recommendation, and financial assessment."
    },
    {
        icon: <Target size={26} className="text-primary" />,
        title: "Student-Centric",
        description: "Every strategy is tailored uniquely to the student's individual talents, financial plans, and long-term career dreams."
    },
    {
        icon: <Award size={26} className="text-primary" />,
        title: "Excellence",
        description: "Delivering world-class standards in admissions documentation, statement of purpose refinement, and visa preparation."
    },
    {
        icon: <Heart size={26} className="text-primary" />,
        title: "Empathy",
        description: "Understanding the emotional and financial significance of studying abroad, supporting families with dedicated patience."
    },
    {
        icon: <Sparkles size={26} className="text-primary" />,
        title: "Innovation",
        description: "Leveraging cutting-edge admissions insights and streamlined tracking tools to deliver fast, stress-free outcomes."
    },
    {
        icon: <Globe size={26} className="text-primary" />,
        title: "Global Perspective",
        description: "Equipping students with the cross-cultural awareness and future-proof mindset needed to thrive in international workplaces."
    }
];

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <SEO 
                title="About Us | Education eXcellence Services" 
                description="Learn about Education eXcellence Services, our story, mission, vision, expert advisory team, and core values dedicated to guiding your international education."
                url="/about"
            />

            {/* 1. Our Story Section */}
            <div className="bg-[#faf8fb] relative pt-[130px] pb-14 lg:pt-[160px] lg:pb-20 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[60px] relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-[13px] font-bold text-[#888] mb-8">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-primary">About Us</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                        <div className="flex-1 text-left">
                            <span className="text-primary font-bold text-[13px] uppercase tracking-wider mb-3 block">
                                Our Story
                            </span>
                            <h1 className="font-sans font-bold text-[32px] md:text-[46px] lg:text-[54px] leading-[1.1] text-[#161616] tracking-[-1.5px] mb-6">
                                Guiding Students from <br className="hidden lg:block"/>
                                <span className="text-primary">Preparation to Admission & Visa.</span>
                            </h1>
                            <p className="text-[16px] md:text-[17px] leading-[1.7] text-[#555] mb-6">
                                At <strong className="text-[#161616]">Education eXcellence Services (Edu-X)</strong>, based in Dakar, Senegal, we believe that world-class international education should be accessible to every ambitious student. Navigating international applications, test requirements, funding options, and strict visa regulations can feel overwhelming.
                            </p>
                            <p className="text-[16px] md:text-[17px] leading-[1.7] text-[#555] mb-8">
                                That is why our team provides structured, transparent, end-to-end guidance. From your initial diagnostic consultation and university shortlisting, to comprehensive essay polishing, scholarship applications, and mock visa interviews, we stand by your side until you step onto campus.
                            </p>
                            <Link to="/contact">
                                <Button 
                                    variant="custom" 
                                    className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-[10px] font-bold text-[15px] transition-all shadow-md hover:-translate-y-0.5 inline-flex items-center gap-2 h-auto"
                                >
                                    Get in Touch
                                    <ArrowRight size={17} />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 aspect-[4/3] lg:aspect-auto lg:h-[480px]">
                                <img src={teamImage} alt="Education eXcellence Services Team Guidance" className="w-full h-full object-cover" />
                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-[#f0eaf2]">
                                    <p className="text-[13px] font-semibold text-[#161616] m-0 flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-primary shrink-0" />
                                        <span>Personalised strategy for 189 partner universities across 25 countries</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Mission and Vision (Two Cards) */}
            <div className="py-16 lg:py-24 bg-white relative">
                <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[60px]">
                    <div className="text-center max-w-[700px] mx-auto mb-12">
                        <span className="text-primary font-bold text-[13px] uppercase tracking-wider mb-2 block">
                            Our Purpose
                        </span>
                        <h2 className="font-sans font-bold text-[28px] md:text-[40px] text-[#161616] tracking-[-1px]">
                            Mission & Vision
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission Card */}
                        <Card className="p-8 lg:p-10 border border-[#f0eaf2] bg-[#faf8fb] rounded-[20px] flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-md shadow-primary/20">
                                    <Target size={28} />
                                </div>
                                <h3 className="font-sans font-bold text-[24px] text-[#161616] mb-4">
                                    Our Mission
                                </h3>
                                <p className="text-[16px] leading-[1.7] text-[#555]">
                                    To deliver personalised, accessible, and transparent guidance that empowers students to secure admission into top-tier global universities and build rewarding, future-ready global careers.
                                </p>
                            </div>
                            <div className="pt-6 mt-6 border-t border-[#e8dced] flex items-center gap-2 text-primary font-bold text-[14px]">
                                <CheckCircle2 size={16} />
                                <span>Student-First Mentorship Every Day</span>
                            </div>
                        </Card>

                        {/* Vision Card */}
                        <Card className="p-8 lg:p-10 border border-[#f0eaf2] bg-[#faf8fb] rounded-[20px] flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-[#0f2444] text-white flex items-center justify-center mb-6 shadow-md">
                                    <Eye size={28} />
                                </div>
                                <h3 className="font-sans font-bold text-[24px] text-[#161616] mb-4">
                                    Our Vision
                                </h3>
                                <p className="text-[16px] leading-[1.7] text-[#555]">
                                    To become the most trusted global education partner across Africa and beyond, recognized for unwavering integrity, high admission placement rates, and transformative student outcomes.
                                </p>
                            </div>
                            <div className="pt-6 mt-6 border-t border-[#e8dced] flex items-center gap-2 text-[#161616] font-bold text-[14px]">
                                <CheckCircle2 size={16} className="text-primary" />
                                <span>Global Impact & Lifelong Trust</span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* 3. Team Section with Advisory Team */}
            <div className="bg-[#faf8fb] py-16 lg:py-24">
                <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[60px]">
                    <div className="text-center max-w-[700px] mx-auto mb-14">
                        <span className="text-primary font-bold text-[13px] uppercase tracking-wider mb-2 block">
                            Our Experts
                        </span>
                        <h2 className="font-sans font-bold text-[28px] md:text-[40px] text-[#161616] tracking-[-1px] mb-3">
                            Meet Our Advisory Team
                        </h2>
                        <p className="text-[16px] text-[#666]">
                            Experienced education strategists, admissions specialists, and certified visa consultants dedicated to your success.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, idx) => (
                            <Card key={idx} className="overflow-hidden bg-white border border-[#f0eaf2] rounded-[18px] shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="aspect-[4/5] w-full relative overflow-hidden bg-gray-100">
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>
                                <div className="p-5 text-center">
                                    <h3 className="font-sans font-bold text-[17px] text-[#161616] mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-[13px] text-primary font-semibold mb-2">
                                        {member.role}
                                    </p>
                                    <span className="inline-block bg-[#f8f5fa] text-[#666] px-3 py-1 rounded-full text-[11px] font-medium border border-[#e8dced]">
                                        {member.credential}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Core Values (6 Cards) */}
            <div className="py-16 lg:py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[60px]">
                    <div className="text-center max-w-[700px] mx-auto mb-14">
                        <span className="text-primary font-bold text-[13px] uppercase tracking-wider mb-2 block">
                            Guiding Principles
                        </span>
                        <h2 className="font-sans font-bold text-[28px] md:text-[40px] text-[#161616] tracking-[-1px] mb-3">
                            Our Core Values
                        </h2>
                        <p className="text-[16px] text-[#666]">
                            These foundational pillars govern every interaction, recommendation, and milestone we achieve together.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coreValues.map((val, idx) => (
                            <Card 
                                key={idx} 
                                className="p-8 border border-[#f0eaf2] bg-[#faf8fb] rounded-[18px] flex flex-col hover:border-primary/40 hover:shadow-md transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white border border-[#e8dced] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                    {val.icon}
                                </div>
                                <h3 className="font-sans font-bold text-[20px] text-[#161616] mb-2 group-hover:text-primary transition-colors">
                                    {val.title}
                                </h3>
                                <p className="text-[14.5px] leading-[1.65] text-[#5a5a5a]">
                                    {val.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Band */}
            <div className="bg-primary py-16 text-white">
                <div className="max-w-[1000px] mx-auto px-[20px] lg:px-[60px] text-center">
                    <h2 className="font-sans font-bold text-[28px] md:text-[40px] text-white leading-[1.2] tracking-[-1px] mb-4">
                        Ready to Take the First Step Towards Your Global Dream?
                    </h2>
                    <p className="text-[16px] md:text-[18px] text-white/85 max-w-[650px] mx-auto mb-8">
                        Schedule a one-on-one session with our senior counsellors at Education eXcellence Services today and get complete clarity on courses, scholarships, and visas.
                    </p>
                    <Link to="/contact">
                        <Button 
                            variant="custom" 
                            className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-[10px] font-bold text-[16px] transition-all shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2 h-auto"
                        >
                            Book Free Consultation
                            <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
