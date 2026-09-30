import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles/App.css';
import AppRoutes from './routes/AppRoutes';

function App() {
  // Initialize Lenis for smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Education eXcellence Services - Guiding Students. Creating Futures. Changing Lives.</title>
        <meta name="description" content="Education eXcellence Services: Personalised study abroad guidance helping ambitious students gain admission to top universities across the USA, UK, Canada, Australia, Germany, and New Zealand." />
      </Helmet>
      <Router>
        <AppRoutes />
      </Router>
    </HelmetProvider>
  );
}

export default App;
