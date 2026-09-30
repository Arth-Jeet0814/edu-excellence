import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Clock, 
    Send, 
    CheckCircle2, 
    Globe, 
    HelpCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/common/SEO';
import Card from '@/components/common/Card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How much do your consultation services cost?",
        answer: "Your initial profile assessment and expert counselling consultation at Education eXcellence Services are 100% free. Any additional specialized services (such as personalized visa processing or mock interview packages) are always discussed and agreed transparently upfront with zero hidden charges."
    },
    {
        question: "What is the typical application and visa processing timeline?",
        answer: "On average, the comprehensive study abroad journey takes between 3 to 6 months. This includes university shortlisting, document preparation, offer letter turnaround, and visa issuance. We recommend beginning your preparation as early as possible."
    },
    {
        question: "What is your visa approval success rate?",
        answer: "We proudly maintain a proven 98% visa success rate. Our dedicated visa compliance team rigorously checks every financial document, academic transcript, and statement of purpose to ensure complete compliance with embassy regulations."
    },
    {
        question: "Do you provide assistance with scholarships and financial aid?",
        answer: "Yes, absolutely! We actively identify merit-based, need-based, and country-specific scholarships across our 189 partner universities and provide dedicated guidance for drafting compelling scholarship essays."
    }
];

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        destination: 'USA',
        degree: "Master's",
        intake: 'Fall 2026',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 600);
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <SEO 
                title="Contact Us | Education eXcellence Services" 
                description="Get in touch with Education eXcellence Services in Dakar, Senegal. Book your free study abroad consultation, call +221 33 848 38 12, or email support@edu-xservices.com." 
                url="/contact" 
            />

            {/* 1. Hero Header */}
            <div className="bg-[#faf8fb] relative pt-[130px] pb-12 lg:pt-[160px] lg:pb-16 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[60px] relative z-10 text-center">
                    {/* Breadcrumb */}
                    <div className="flex items-center justify-center gap-2 text-[13px] font-bold text-[#888] mb-6">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-primary">Contact</span>
                    </div>

                    <span className="text-primary font-bold text-[13px] uppercase tracking-wider mb-2 block">
                        Get In Touch
                    </span>
                    <h1 className="font-sans font-bold text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] text-[#161616] tracking-[-1.5px] mb-4">
                        Book Your Free <span className="text-primary">Consultation</span>
                    </h1>
                    <p className="text-[16px] md:text-[18px] text-[#555] max-w-[650px] mx-auto">
                        Speak with our experienced admissions and visa experts at Education eXcellence Services to begin planning your global study journey today.
                    </p>
                </div>
            </div>

            {/* 2. Three Info Cards */}
            <div className="py-12 bg-white">
                <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[60px]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Phone Card */}
                        <Card className="p-7 border border-[#f0eaf2] bg-[#faf8fb] rounded-[18px] flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-4 shadow-md shadow-primary/20">
                                <Phone size={24} />
                            </div>
                            <h3 className="font-sans font-bold text-[18px] text-[#161616] mb-1">Call Us</h3>
                            <a href="tel:+221338483812" className="text-[15px] font-semibold text-primary hover:underline mb-2">
                                +221 33 848 38 12
                            </a>
                            <span className="text-[12px] text-[#777]">Direct helpline with student advisors</span>
                        </Card>

                        {/* Email Card */}
                        <Card className="p-7 border border-[#f0eaf2] bg-[#faf8fb] rounded-[18px] flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-4 shadow-md shadow-primary/20">
                                <Mail size={24} />
                            </div>
                            <h3 className="font-sans font-bold text-[18px] text-[#161616] mb-1">Email Us</h3>
                            <a href="mailto:support@edu-xservices.com" className="text-[15px] font-semibold text-primary hover:underline mb-2">
                                support@edu-xservices.com
                            </a>
                            <span className="text-[12px] text-[#777]">Reply guaranteed within 24 hours</span>
                        </Card>

                        {/* Office Address Card */}
                        <Card className="p-7 border border-[#f0eaf2] bg-[#faf8fb] rounded-[18px] flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-4 shadow-md shadow-primary/20">
                                <MapPin size={24} />
                            </div>
                            <h3 className="font-sans font-bold text-[18px] text-[#161616] mb-1">Visit Office</h3>
                            <p className="text-[14px] text-[#555] font-medium mb-2">
                                Av Malick Sy, Dakar Plateau, Dakar Senegal
                            </p>
                            <span className="text-[12px] text-[#777]">Mon - Sat: 10:00 AM - 6:00 PM</span>
                        </Card>
                    </div>
                </div>
            </div>

            {/* 3. Main Consultation Form & Map */}
            <div className="py-12 lg:py-16 bg-[#faf8fb]">
                <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[60px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                        
                        {/* Consultation Form (7 Cols) */}
                        <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-[24px] border border-[#f0eaf2] shadow-md">
                            <div className="mb-8">
                                <span className="text-primary font-bold text-[12px] uppercase tracking-wider block mb-1">
                                    Personalized Consultation
                                </span>
                                <h2 className="font-sans font-bold text-[26px] md:text-[32px] text-[#161616] tracking-tight">
                                    Send Us Your Details
                                </h2>
                                <p className="text-[14.5px] text-[#666] mt-1">
                                    Fill out the form below and our senior counsellors at Education eXcellence Services will contact you within 24 hours.
                                </p>
                            </div>

                            {isSubmitted ? (
                                <div className="p-8 text-center bg-[#f8f5fa] border border-[#e8dced] rounded-2xl">
                                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="font-sans font-bold text-[22px] text-[#161616] mb-2">
                                        Thank You for Reaching Out!
                                    </h3>
                                    <p className="text-[15px] text-[#555] mb-6">
                                        Your consultation request has been received. One of our educational advisors will contact you shortly to schedule your personalized session.
                                    </p>
                                    <Button 
                                        onClick={() => setIsSubmitted(false)}
                                        variant="outline"
                                        className="border-primary text-primary hover:bg-primary hover:text-white"
                                    >
                                        Submit Another Inquiry
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Full Name */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="name" className="block text-[13px] font-bold text-[#161616]">
                                            Full Name *
                                        </label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-[#faf8fb] border border-[#e8dced] rounded-[10px] px-4 py-3 text-[14.5px] focus:outline-none focus:border-primary focus:bg-white transition-all"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    {/* Email & Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label htmlFor="email" className="block text-[13px] font-bold text-[#161616]">
                                                Email Address *
                                            </label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-[#faf8fb] border border-[#e8dced] rounded-[10px] px-4 py-3 text-[14.5px] focus:outline-none focus:border-primary focus:bg-white transition-all"
                                                placeholder="yourname@example.com"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label htmlFor="phone" className="block text-[13px] font-bold text-[#161616]">
                                                Phone Number *
                                            </label>
                                            <input 
                                                type="tel" 
                                                id="phone" 
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-[#faf8fb] border border-[#e8dced] rounded-[10px] px-4 py-3 text-[14.5px] focus:outline-none focus:border-primary focus:bg-white transition-all"
                                                placeholder="+221 XX XXX XX XX"
                                            />
                                        </div>
                                    </div>

                                    {/* Destination & Degree */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label htmlFor="destination" className="block text-[13px] font-bold text-[#161616]">
                                                Preferred Destination
                                            </label>
                                            <select 
                                                id="destination" 
                                                name="destination"
                                                value={formData.destination}
                                                onChange={handleChange}
                                                className="w-full bg-[#faf8fb] border border-[#e8dced] rounded-[10px] px-4 py-3 text-[14.5px] focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                                            >
                                                <option value="USA">USA</option>
                                                <option value="UK">UK</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Germany">Germany</option>
                                                <option value="New Zealand">New Zealand</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="degree" className="block text-[13px] font-bold text-[#161616]">
                                                Intended Degree
                                            </label>
                                            <select 
                                                id="degree" 
                                                name="degree"
                                                value={formData.degree}
                                                onChange={handleChange}
                                                className="w-full bg-[#faf8fb] border border-[#e8dced] rounded-[10px] px-4 py-3 text-[14.5px] focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                                            >
                                                <option value="Bachelor's">Bachelor's</option>
                                                <option value="Master's">Master's</option>
                                                <option value="PhD">PhD</option>
                                                <option value="Diploma/Certificate">Diploma/Certificate</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Preferred Intake */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="intake" className="block text-[13px] font-bold text-[#161616]">
                                            Preferred Intake (Current Upcoming Intakes)
                                        </label>
                                        <select 
                                            id="intake" 
                                            name="intake"
                                            value={formData.intake}
                                            onChange={handleChange}
                                            className="w-full bg-[#faf8fb] border border-[#e8dced] rounded-[10px] px-4 py-3 text-[14.5px] focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                                        >
                                            <option value="Fall 2026">Fall 2026 (Aug / Sep 2026)</option>
                                            <option value="Spring 2027">Spring 2027 (Jan / Feb 2027)</option>
                                            <option value="Summer 2027">Summer 2027 (May / Jun 2027)</option>
                                            <option value="Fall 2027">Fall 2027 (Aug / Sep 2027)</option>
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="message" className="block text-[13px] font-bold text-[#161616]">
                                            Message *
                                        </label>
                                        <textarea 
                                            id="message" 
                                            name="message"
                                            required
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-[#faf8fb] border border-[#e8dced] rounded-[10px] px-4 py-3 text-[14.5px] focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
                                            placeholder="Tell us about your academic goals, intended field of study, English test scores, or questions..."
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <Button 
                                        type="submit" 
                                        variant="custom" 
                                        disabled={isSubmitting}
                                        className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-[10px] font-bold text-[16px] transition-all shadow-md hover:shadow-primary/30 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 h-auto mt-2"
                                    >
                                        {isSubmitting ? 'Sending Request...' : 'Submit Consultation Request'}
                                        <Send size={16} />
                                    </Button>

                                    <div className="flex items-center justify-center gap-4 text-[12px] text-[#777] pt-2">
                                        <span className="flex items-center gap-1">
                                            <CheckCircle2 size={14} className="text-primary" /> 100% Confidential
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} className="text-primary" /> Reply within 24 Hours
                                        </span>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Map & Office Timings (5 Cols) */}
                        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                            {/* Office Hours Card */}
                            <Card className="p-7 border border-[#f0eaf2] bg-white rounded-[22px] shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#f8f5fa] text-primary flex items-center justify-center">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-sans font-bold text-[18px] text-[#161616]">
                                            Office Hours
                                        </h3>
                                        <span className="text-[12px] text-[#777]">Dakar Office & Virtual Sessions</span>
                                    </div>
                                </div>
                                <div className="space-y-2 text-[14.5px] text-[#555] border-t border-[#f0eaf2] pt-4">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Monday – Saturday:</span>
                                        <span className="font-bold text-[#161616]">10:00 AM – 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Sunday:</span>
                                        <span className="text-[#888]">Closed (Inquiries Monitored)</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Map Embed */}
                            <div className="rounded-[22px] overflow-hidden border border-[#f0eaf2] shadow-sm bg-white p-4 flex-grow flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-primary" />
                                        <span className="font-bold text-[15px] text-[#161616]">Dakar Office Location</span>
                                    </div>
                                    <span className="text-[12px] text-primary font-semibold">Senegal</span>
                                </div>
                                <div className="rounded-xl overflow-hidden border border-[#e8dced] bg-[#faf8fb] h-[260px] relative">
                                    <iframe
                                        title="Education eXcellence Services Dakar Office"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15437.362142278918!2d-17.447576!3d14.678121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec1724a7378d3eb%3A0x6b4f7a75069279ea!2sAvenue%20Malick%20Sy%2C%20Dakar%2C%20Senegal!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* 4. FAQ Accordion (4 items) */}
            <div className="py-16 lg:py-24 bg-white">
                <div className="max-w-[1000px] mx-auto px-[20px] lg:px-[60px]">
                    <div className="text-center max-w-[700px] mx-auto mb-12">
                        <span className="text-primary font-bold text-[13px] uppercase tracking-wider mb-2 block">
                            Common Inquiries
                        </span>
                        <h2 className="font-sans font-bold text-[28px] md:text-[40px] text-[#161616] tracking-[-1px] mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[16px] text-[#666]">
                            Everything you need to know about our free consultation, timelines, visa success rates, and scholarship help.
                        </p>
                    </div>

                    <div className="bg-[#faf8fb] border border-[#f0eaf2] rounded-[24px] p-6 lg:p-10 shadow-sm">
                        <Accordion type="single" collapsible defaultValue="item-0">
                            {faqs.map((faq, index) => (
                                <AccordionItem 
                                    key={index} 
                                    value={`item-${index}`}
                                    className="border-b border-[#e8dced] last:border-b-0"
                                >
                                    <AccordionTrigger className="w-full flex justify-between items-center py-5 text-left font-bold text-[16px] lg:text-[18px] text-[#161616] hover:text-primary transition-colors pr-4 hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    
                                    <AccordionContent className="pb-6">
                                        <p className="text-[15px] leading-[1.7] text-[#555] pr-4">
                                            {faq.answer}
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Contact;
