// import React from 'react'
import Hero from './Hero';
import Services from './Services';
import AboutSection from './AboutSection';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Galeria from './Galeria';
import PromotionsCarousel from './PromotionsCarousel';
function Main() {
  return (
    <div>
      <Hero></Hero>
      <Services></Services>
      <PromotionsCarousel></PromotionsCarousel>
      <Galeria />
      <AboutSection></AboutSection>
      <Testimonials></Testimonials>
      <CTA></CTA>
    </div>
  );
}

export default Main;
