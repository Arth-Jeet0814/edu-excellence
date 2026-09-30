import React, { useEffect } from 'react';
import SEO from '@/components/common/SEO';
import Hero from '@/components/home/Hero/Hero';
import WhyChooseUs from '@/components/home/WhyChooseUs/WhyChooseUs';
import StatsSection from '@/components/home/StatsSection/StatsSection';
import PopularDestinations from '@/components/home/PopularDestinations/PopularDestinations';
import HomeCTA from '@/components/home/HomeCTA/HomeCTA';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SEO 
                title="Home | Education eXcellence Services" 
                description="Guiding Students. Creating Futures. Changing Lives. Guiding ambitious students to top universities worldwide with personalised course selection, admissions coaching, and 98% visa success rate."
                url="/"
            />
            {/* 1. Hero Section */}
            <Hero />

            {/* 2. Why Choose Us (3 Cards) */}
            <WhyChooseUs />

            {/* 3. Animated Stats */}
            <StatsSection />

            {/* 4. Popular Destinations (4 Cards) */}
            <PopularDestinations />

            {/* 5. Closing CTA Banner */}
            <HomeCTA />
        </>
    );
};

export default Home;
