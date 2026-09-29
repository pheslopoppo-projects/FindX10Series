import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ChevronDown, Sparkles, AlertCircle } from 'lucide-react';
import ChatQuiz from './ChatQuiz';
import { moduleContent } from '../data/moduleContent';

export default function ModuleViewer({ module, onBack }) {
  const containerRef = useRef(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Look up module in moduleContent if ID is passed or merge with central data
  const currentModule = (typeof module === 'string'
    ? moduleContent.find((m) => m.id === module)
    : moduleContent.find((m) => m.id === module?.id)) || module || moduleContent[0];

  const slides = currentModule?.slides || [];
  const quiz = currentModule?.quiz || [];
  // Total snap items = content slides + 1 final slide for the Chat-Style Quiz
  const totalSnapCount = slides.length + 1;

  // Track active slide index on scroll
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const currentIndex = Math.round(scrollTop / clientHeight);
    setActiveSlideIndex(currentIndex);
  };

  const scrollToSlide = (index) => {
    if (!containerRef.current) return;
    const clientHeight = containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: index * clientHeight,
      behavior: 'smooth'
    });
  };

  // Ensure the module carousel initializes at slide 1 (index 0) on mount or module change
  useEffect(() => {
    setActiveSlideIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    // Support direct linking to quiz slide only when explicitly provided in query params
    const params = new URLSearchParams(window.location.search);
    if (params.get('slide') === 'quiz') {
      const timer = setTimeout(() => {
        scrollToSlide(totalSnapCount - 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentModule?.id, totalSnapCount]);

  return (
    <div className="relative h-screen w-full bg-moon-white text-titanium-dark overflow-hidden select-none">
      {/* Floating Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-white/80 backdrop-blur-md border-b border-light-titanium flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-light-titanium text-titanium-dark text-xs font-semibold hover:bg-light-titanium/50 active:scale-95 transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-warm-orange" />
          <span>Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-white border border-light-titanium text-warm-orange text-[11px] font-bold tracking-wider uppercase shadow-sm">
            {currentModule.title}
          </div>
        </div>
      </header>

      {/* Right-Hand Vertical Slide Indicator (TikTok style) */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2">
        {Array.from({ length: totalSnapCount }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSlide(idx)}
            className={`w-2 transition-all duration-300 rounded-full ${
              activeSlideIndex === idx
                ? 'h-6 bg-warm-orange shadow-md shadow-warm-orange/30'
                : 'h-2 bg-light-titanium hover:bg-warm-orange/50'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Main TikTok-Style Vertical Snap Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      >
        {/* Render Slides from moduleContent.js */}
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className="h-screen w-full snap-start flex flex-col justify-center items-center relative p-4 sm:p-6"
          >
            {/* Slide Content Wrapper */}
            <div className="w-full max-w-md h-full flex flex-col justify-between pt-16 pb-10">
              {/* Top Slide Header */}
              <div className="space-y-1.5 text-center">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-light-titanium text-[10px] font-bold uppercase tracking-widest text-warm-orange shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  <span>Slide {index + 1} of {slides.length}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-titanium-dark tracking-tight leading-snug">
                  {slide.title}
                </h2>
              </div>

              {/* Device Graphic Asset Area */}
              <div className="flex-1 my-3 flex items-center justify-center min-h-0 relative px-2 overflow-hidden">
                {/* <img /> tag strictly uses src={slide.imageUrl} and object-contain h-full w-full */}
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="object-contain h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to stylized placeholder if custom asset is not yet placed
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />

                {/* Hidden fallback container if image fails to load */}
                <div
                  style={{ display: 'none' }}
                  className="w-full h-48 rounded-2xl bg-white/80 border border-dashed border-light-titanium flex flex-col items-center justify-center p-4 text-center space-y-2 shadow-sm"
                >
                  <AlertCircle className="w-8 h-8 text-warm-orange" />
                  <p className="text-xs text-titanium-dark font-semibold">Image Asset Ready</p>
                  <p className="text-[11px] text-titanium-dark/60 font-mono break-all">{slide.imageUrl}</p>
                </div>
              </div>

              {/* Bottom Feature Description Card with Velvet Glass effect */}
              <div className="space-y-2.5">
                <div className="bg-white/70 backdrop-blur-md border border-light-titanium shadow-sm rounded-3xl p-4 sm:p-5">
                  <p className="text-xs sm:text-sm text-titanium-dark font-medium leading-relaxed">
                    {slide.description}
                  </p>
                </div>

                {/* Swipe Up Navigation Indicator */}
                {index < totalSnapCount - 1 && (
                  <div
                    onClick={() => scrollToSlide(index + 1)}
                    className="flex flex-col items-center justify-center text-titanium-dark/60 hover:text-warm-orange cursor-pointer transition-colors pt-1 animate-bounce"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider">
                      {index === slides.length - 1 ? 'Swipe to Quiz' : 'Swipe Up'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-warm-orange" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Final Slide: Chat-Style Quiz Component */}
        <div className="h-screen w-full snap-start flex flex-col justify-center items-center relative p-3 sm:p-5">
          <div className="w-full max-w-md h-full flex flex-col justify-between pt-14 pb-4">
            <ChatQuiz
              moduleId={currentModule.id}
              moduleTitle={currentModule.title}
              quiz={quiz}
              onComplete={onBack}
              onExit={onBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
