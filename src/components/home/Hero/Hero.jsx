import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import heroVideo from '@/assets/videos/hero video.mp4';

const Hero = () => {
    return (
        <div className="pt-[100px] lg:pt-[120px] relative overflow-hidden bg-gradient-to-b from-white via-[#faf8fb] to-white">
            
            {/* Subtle decorative purple glow */}
            <div 
                className="absolute pointer-events-none z-0"
                style={{
                    width: '1200px',
                    height: '1200px',
                    top: '-300px',
                    right: '-300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(5,150,105,0.15) 0%, rgba(16,185,129,0.05) 50%, transparent 70%)',
                }}
            ></div>

            {/* Top Area: Heading, Subtitle & Buttons */}
            <section className="relative z-10 px-[20px] lg:px-[60px] max-w-[1200px] mx-auto pt-[20px] lg:pt-[40px] pb-[50px] text-center flex flex-col items-center">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f8f5fa] border border-[#e8dced] text-primary text-[13px] font-semibold mb-6 shadow-sm animate-fade-in">
                    <Sparkles size={15} />
                    <span>Your Gateway to World-Class Global Education</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-sans font-bold text-[32px] sm:text-[46px] lg:text-[62px] leading-[1.1] text-[#161616] tracking-[-1.5px] max-w-[950px] mb-6">
                    Guiding Students to Top Universities <span className="text-primary">Worldwide</span>
                </h1>

                {/* Supporting Sentence */}
                <p className="text-[16px] sm:text-[19px] leading-[1.65] text-[#555] max-w-[760px] mb-8 font-normal">
                    Personalised help every step of the way — from choosing the right course and university to preparing your application and getting your visa.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-10">
                    <Link to="/contact" className="w-full sm:w-auto">
                        <Button 
                            variant="custom" 
                            className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-[10px] font-bold text-[16px] transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 h-auto"
                        >
                            Get Free Consultation
                            <ArrowRight size={18} />
                        </Button>
                    </Link>
                    <Link to="/about" className="w-full sm:w-auto">
                        <Button 
                            variant="custom" 
                            className="w-full sm:w-auto border-2 border-[#d1fae5] hover:border-primary hover:bg-[#f0fdf4] text-[#161616] px-8 py-4 rounded-[10px] font-bold text-[16px] transition-all inline-flex items-center justify-center h-auto"
                        >
                            Learn More
                        </Button>
                    </Link>
                </div>

                {/* Quick Trust Highlights */}
                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-[14px] text-[#666] font-medium pt-2">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-primary" />
                        <span>189 Partner Universities</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-primary" />
                        <span>25 Global Destinations</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-primary" />
                        <span>98% Visa Success Rate</span>
                    </div>
                </div>

            </section>

            {/* Video Container Backdrop */}
            <div className="w-full relative px-[20px] lg:px-[60px] max-w-[1300px] mx-auto pb-[40px]">
                <div className="relative w-full rounded-[24px] overflow-hidden bg-[#161616] shadow-2xl border border-black/5 aspect-[16/9] md:aspect-[21/9] max-h-[460px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 pointer-events-none"></div>
                    <video 
                        className="w-full h-full object-cover opacity-90 relative z-0" 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                    >
                        <source src={heroVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20 text-white">
                        <span className="text-xs uppercase tracking-widest bg-primary/80 px-3 py-1 rounded-full font-bold">
                            Study Abroad Excellence
                        </span>
                        <h3 className="font-sans font-bold text-xl md:text-2xl mt-2 mb-1 text-white">
                            Transforming Academic Dreams Into Global Reality
                        </h3>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Hero;
