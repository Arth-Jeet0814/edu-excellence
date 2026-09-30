import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe } from 'lucide-react';
import Card from '@/components/common/Card';

const destinations = [
    {
        name: "United States",
        flag: "https://flagcdn.com/w80/us.png",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop",
        highlight: "World's top-ranked universities, flexible academic curriculum, and 12-36 months STEM OPT work opportunities.",
        badge: "4,000+ Universities"
    },
    {
        name: "United Kingdom",
        flag: "https://flagcdn.com/w80/gb.png",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
        highlight: "Globally acclaimed degrees with accelerated 1-year master's programs and a 2-year Graduate Route work visa.",
        badge: "160+ Universities"
    },
    {
        name: "Australia",
        flag: "https://flagcdn.com/w80/au.png",
        image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800&auto=format&fit=crop",
        highlight: "Group of Eight research institutions, world-class standard of living, and generous 2-4 year post-study work rights.",
        badge: "43 Universities"
    },
    {
        name: "Canada",
        flag: "https://flagcdn.com/w80/ca.png",
        image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop",
        highlight: "High quality of life, affordable tuition, and clear post-graduation work permits (PGWP) lasting 1-3 years.",
        badge: "100+ Universities"
    }
];

const PopularDestinations = () => {
    return (
        <section className="py-[70px] lg:py-[100px] px-[20px] lg:px-[60px] bg-white relative">
            <div className="max-w-[1200px] mx-auto">
                
                {/* Top Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-[48px] gap-6">
                    <div className="max-w-[650px]">
                        <span className="text-primary font-bold text-[13px] uppercase tracking-wider mb-2 block">
                            Global Horizons
                        </span>
                        <h2 className="font-sans font-bold text-[28px] md:text-[42px] lg:text-[48px] leading-[1.15] text-[#161616] tracking-[-1px] mb-3">
                            Popular Study <span className="text-primary">Destinations</span>
                        </h2>
                        <p className="text-[16px] text-[#666] leading-relaxed">
                            Discover premier academic destinations offering world-renowned qualifications and exceptional post-study career opportunities.
                        </p>
                    </div>

                    <div>
                        <Link to="/study-destinations">
                            <Button 
                                variant="outline" 
                                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3.5 rounded-[10px] font-bold text-[15px] transition-all inline-flex items-center gap-2 h-auto"
                            >
                                View All Destinations
                                <ArrowRight size={16} />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((dest, idx) => (
                        <Card 
                            key={idx}
                            hoverEffect={true}
                            className="bg-[#faf8fb] border border-[#f0eaf2] rounded-[20px] overflow-hidden flex flex-col group shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image Header */}
                            <div className="relative h-[200px] w-full overflow-hidden bg-gray-100">
                                <img 
                                    src={dest.image} 
                                    alt={dest.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                                
                                {/* Flag Badge */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                                    <img src={dest.flag} alt="" className="w-5 h-3.5 object-cover rounded-[2px]" />
                                    <span className="text-[12px] font-bold text-[#161616]">{dest.badge}</span>
                                </div>

                                {/* Country Name */}
                                <h3 className="absolute bottom-3 left-4 text-white font-sans font-bold text-[22px] tracking-tight m-0 drop-shadow">
                                    {dest.name}
                                </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex flex-col flex-grow justify-between">
                                <p className="text-[14px] leading-[1.6] text-[#5a5a5a] mb-6">
                                    {dest.highlight}
                                </p>

                                <Link 
                                    to="/study-destinations" 
                                    className="inline-flex items-center justify-between text-primary font-bold text-[13px] border-t border-[#f0eaf2] pt-4 group-hover:text-primary-hover"
                                >
                                    <span>Explore Details</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Mobile Button at bottom */}
                <div className="mt-8 text-center md:hidden">
                    <Link to="/study-destinations">
                        <Button 
                            variant="custom" 
                            className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-[10px] font-bold text-[15px] inline-flex items-center justify-center gap-2"
                        >
                            View All Destinations
                            <ArrowRight size={16} />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default PopularDestinations;
