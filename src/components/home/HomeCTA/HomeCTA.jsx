import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const HomeCTA = () => {
    return (
        <section className="py-[70px] lg:py-[90px] px-[20px] lg:px-[60px] bg-gradient-to-br from-[#064e3b] via-[#043327] to-[#022c22] text-white relative overflow-hidden">
            
            {/* Ambient emerald glowing circle */}
            <div 
                className="absolute pointer-events-none z-0"
                style={{
                    width: '600px',
                    height: '600px',
                    top: '-200px',
                    right: '-100px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
                }}
            ></div>

            <div className="max-w-[1000px] mx-auto text-center relative z-10">
                <span className="inline-block bg-white/10 text-[#f4d160] px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-wider mb-6 border border-white/15">
                    Start Your Study Abroad Adventure
                </span>
                
                <h2 className="font-sans font-bold text-[30px] md:text-[46px] lg:text-[54px] leading-[1.15] text-white tracking-[-1px] mb-6">
                    Ready to Book Your Free Consultation?
                </h2>
                
                <p className="text-[16px] md:text-[19px] text-white/80 leading-relaxed max-w-[700px] mx-auto mb-8">
                    Speak directly with our certified admissions and visa experts. We’ll analyze your profile, recommend ideal universities, and chart out your step-by-step roadmap.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Link to="/contact">
                        <Button 
                            variant="custom" 
                            className="bg-primary hover:bg-primary-hover text-white px-9 py-4 rounded-[10px] font-bold text-[16px] transition-all shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 inline-flex items-center gap-2 h-auto"
                        >
                            Book Free Consultation
                            <ArrowRight size={18} />
                        </Button>
                    </Link>
                    <Link to="/about">
                        <Button 
                            variant="outline" 
                            className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-[10px] font-bold text-[16px] transition-all inline-flex items-center h-auto"
                        >
                            Learn About Our Process
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-[13px] text-white/70">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-[#f4d160]" />
                        <span>100% Free Initial Assessment</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-[#f4d160]" />
                        <span>No Obligation Required</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-[#f4d160]" />
                        <span>Reply Within 24 Hours</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeCTA;
