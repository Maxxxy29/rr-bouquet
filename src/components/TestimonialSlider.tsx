import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '../types';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Testimonials Desktop Grid (showing 3 cards as in wireframe) & Mobile Carousel */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {testimonials.slice(0, 3).map((testi) => (
          <div
            key={testi.id}
            className="flex flex-col bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Bouquet photo container */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-stone-100">
              <img
                src={testi.photoUrl}
                alt={testi.customerName}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* Customer & Rating */}
            <h4 className="font-serif text-base font-semibold text-stone-900">
              {testi.customerName}
            </h4>
            <div className="flex items-center gap-1 my-2">
              {[...Array(testi.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Comment */}
            <p className="text-xs text-stone-600 leading-relaxed italic mt-1">
              "{testi.comment}"
            </p>
          </div>
        ))}
      </div>

      {/* Mobile / Tablet Carousel View */}
      <div className="lg:hidden">
        {testimonials.length > 0 && (
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
            <div className="aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-stone-100">
              <img
                src={testimonials[currentIndex].photoUrl}
                alt={testimonials[currentIndex].customerName}
                className="w-full h-full object-cover"
              />
            </div>

            <h4 className="font-serif text-lg font-semibold text-stone-900">
              {testimonials[currentIndex].customerName}
            </h4>
            
            <div className="flex items-center gap-1 my-2">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-sm text-stone-600 leading-relaxed italic mt-2">
              "{testimonials[currentIndex].comment}"
            </p>
          </div>
        )}
      </div>

      {/* Controls: Left & Right Arrows (matching wireframe arrows) */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prevSlide}
          aria-label="Ulasan sebelumnya"
          className="p-3 rounded-full border border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-medium text-stone-500">
          Geser untuk melihat testimoni lainnya
        </span>
        <button
          onClick={nextSlide}
          aria-label="Ulasan berikutnya"
          className="p-3 rounded-full border border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
