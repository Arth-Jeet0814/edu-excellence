import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

// Pages
const Home = lazy(() => import('@/pages/Home'));
const AboutUs = lazy(() => import('@/pages/AboutUs'));
const StudyDestinations = lazy(() => import('@/pages/StudyDestinations'));
const Contact = lazy(() => import('@/pages/Contact'));

const PublicLayout = ({ children }) => (
    <div className="relative z-0 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
            {children}
        </main>
        <Footer />
    </div>
);

const AppRoutes = () => {
    return (
        <Suspense fallback={<div className="flex h-[60vh] w-full items-center justify-center text-primary font-bold">Loading...</div>}>
            <Routes>
                {/* 4 Core Pages Only */}
                <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><AboutUs /></PublicLayout>} />
                <Route path="/about-us" element={<Navigate to="/about" replace />} />
                <Route path="/study-destinations" element={<PublicLayout><StudyDestinations /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
                
                {/* Catch-all redirect to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
