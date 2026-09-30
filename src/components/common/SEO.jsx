import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, type = "website" }) => {
    const siteName = "Education eXcellence Services";
    const fullTitle = title ? (title.includes(siteName) ? title : `${title} | ${siteName}`) : `${siteName} - Study Abroad & Global Education`;
    const defaultDescription = "Guiding Students. Creating Futures. Changing Lives. Expert study abroad counselling, university admissions, and visa guidance for USA, UK, Canada, Australia, Germany, and New Zealand.";
    const finalDescription = description || defaultDescription;
    const defaultImage = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop";
    const finalImage = image || defaultImage;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={finalDescription} />
            {url && <link rel="canonical" href={`https://www.edu-xservices.com${url}`} />}
            
            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />
        </Helmet>
    );
};

export default SEO;
