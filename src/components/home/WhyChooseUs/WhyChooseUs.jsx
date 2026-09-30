import React from 'react';
import { Compass, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '@/components/common/Card';

const whyChooseCards = [
    {
        icon: <Compass size={32} className="text-white" />,
        title: "Expert Counselling",
        description: "Personalised, one-on-one advice tailored to each student's unique academic profile, passions, and long-term career aspirations."
    },
    {
        icon: <GraduationCap size={32} className="text-white" />,
        title: "University Partnerships",
        description: "Direct ties and official partnerships with 189 partner universities across 25 leading global study destinations."
    },
    {
        icon: <ShieldCheck size={32} className="text-white" />,
        title: "Visa Assistance",
        description: "Meticulous documentation, mock interview training, and compliance checks driving an exceptional 98% visa success rate."
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-[70px] lg:py-[100px] px-[20px] lg:px-[60px] bg-[#faf8fb] relative overflow-hidden">
            
            {/* Subtle background ambient blur */}
            <div 
                className="absolute pointer-events-none z-0"
                style={{
                    width: '600px',
                    height: '600px',
                    top: '10%',
                    left: '-200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%)',
                }}
            ></div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-[750px] mx-auto mb-[50px] lg:mb-[60px]">
                    <span className="text-primary font-bold text-[13px] uppercase tracking-wider mb-2 block">
                        Why Choose Us
                    </span>
                    <h2 className="font-sans font-bold text-[28px] md:text-[42px] lg:text-[48px] leading-[1.15] text-[#161616] tracking-[-1px] mb-4">
                        Built Around Your <span className="text-primary">Global Ambitions</span>
                    </h2>
                    <p className="text-[16px] text-[#666] leading-relaxed">
                        We blend deep admissions expertise with individual mentorship to ensure your journey from application to arrival is smooth, confident, and successful.
                    </p>
                </div>

                {/* 3 Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {whyChooseCards.map((card, idx) => (
                        <Card 
                            key={idx}
                            hoverEffect={true}
                            className="bg-white/80 backdrop-blur-md border border-[#f0eaf2] p-8 lg:p-10 rounded-[20px] shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col items-start group"
                        >
                            {/* Icon Container */}
                            <div className="w-16 h-16 rounded-[14px] bg-primary flex items-center justify-center mb-6 shadow-md shadow-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                {card.icon}
                            </div>

                            {/* Title */}
                            <h3 className="font-sans font-bold text-[22px] text-[#161616] mb-3 group-hover:text-primary transition-colors">
                                {card.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[15px] leading-[1.65] text-[#5a5a5a] mb-6 flex-grow">
                                {card.description}
                            </p>

                            {/* Learn More link */}
                            <Link 
                                to="/about" 
                                className="inline-flex items-center gap-2 text-primary font-bold text-[14px] group-hover:translate-x-1 transition-transform"
                            >
                                Read more <ArrowRight size={15} />
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
