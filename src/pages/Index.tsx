import React from 'react';
import Hero from '../components/Hero';
import FeaturedIn from '../components/FeaturedIn';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Mission from '../components/Mission';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';

const Index = () => {
  return (
    // The main wrapper div is no longer needed here as Layout provides it.
    <>
      <Hero />
      <FeaturedIn />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Mission />
      <Pricing />
      <FAQ />
    </>
  );
};

export default Index;