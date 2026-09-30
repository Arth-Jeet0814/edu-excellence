import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Users, Globe2, Award, Calendar } from 'lucide-react';

const statsData = [
    {
        icon: <Users size={28} className="text-white" />,
        number: "5,000+",
        label: "Students Placed",
        detail: "Guided to top global universities"
    },
    {
        icon: <Globe2 size={28} className="text-white" />,
        number: "25",
        label: "Countries",
        detail: "Worldwide destination options"
    },
    {
        icon: <Award size={28} className="text-white" />,
        number: "98%",
        label: "Visa Success",
        detail: "Proven approval track record"
    },
    {
        icon: <Calendar size={28} className="text-white" />,
        number: "15+",
        label: "Years Experience",
        detail: "Of trusted educational guidance"
    }
];

const StatsSection = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section ref={ref} className="py-[60px] lg:py-[80px] bg-primary relative overflow-hidden text-white">
            {/* Background Decorative Pattern */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{ 
                    backgroundImage: 'radial-gradient(circle 2px, white 100%, transparent 0)',
                    backgroundSize: '32px 32px'
                }}
            ></div>

            <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[60px] relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {statsData.map((stat, idx) => (
                        <div 
                            key={idx}
                            className={`flex flex-col items-center text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 transition-all duration-700 ${
                                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                            style={{ transitionDelay: `${idx * 120}ms` }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                                {stat.icon}
                            </div>
                            <span className="font-sans font-extrabold text-[32px] sm:text-[44px] lg:text-[50px] leading-tight tracking-tight mb-1 text-white">
                                {stat.number}
                            </span>
                            <span className="font-bold text-[14px] sm:text-[16px] text-[#f4d160] uppercase tracking-wide mb-1">
                                {stat.label}
                            </span>
                            <span className="text-[12px] sm:text-[13px] text-white/80">
                                {stat.detail}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
