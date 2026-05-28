import { useState, useRef, useEffect } from "react";

const partnerImages = [
  "/brand/brand1.png",
  "/brand/brand2.png",
  "/brand/brand3.png",
  "/brand/brand4.png",
  "/brand/brand5.png",
  "/brand/brand6.png",
  "/brand/brand7.png",
  "/brand/brand8.png",
  "/brand/brand1.png", // fallback loop
  "/brand/brand2.png",
];

const partners = [
  { image: partnerImages[0] },
  { image: partnerImages[1] },
  { image: partnerImages[2] },
  { image: partnerImages[3] },
  { image: partnerImages[4] },
  { image: partnerImages[5] },
  { image: partnerImages[6] },
  { image: partnerImages[7] },
  { image: partnerImages[8] },
  { image: partnerImages[9] },
];

const getVisibleCount = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
  }
  return 5;
};

const PartnersSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const maxIndex = partners.length - visibleCount;

  // Touch swipe support
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const swipeThreshold = 45;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 3000);
    return () => clearInterval(interval);
  }, [visibleCount, currentIndex]);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = null;
    }
  };
  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchEndX.current = e.touches[0].clientX;
    }
  };
  const handleTouchEnd = () => {
    if (
      touchStartX.current !== null &&
      touchEndX.current !== null
    ) {
      const distance = touchStartX.current - touchEndX.current;
      if (Math.abs(distance) > swipeThreshold) {
        if (distance > 0) {
          setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        } else {
          setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="relative bg-white overflow-hidden py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-3 text-red-600 tracking-tight">
          Our Partners
        </h2>
        <p className="text-center text-gray-500 mb-10 text-base md:text-lg">
          We are trusted by these brands and more.
        </p>
        {/* Carousel */}
        <div className="relative">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center p-4"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div className="flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 min-h-[100px]">
                    <img
                      src={partner.image}
                      alt="Brand logo"
                      className="object-contain h-20 md:h-24 max-w-[180px] px-4 transition-all duration-200 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Dots Navigation */}
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all duration-300 outline-none focus:outline-none border-none
                  ${currentIndex === idx ? "w-4 h-4" : "w-3 h-3"}
                `}
                style={{
                  background: currentIndex === idx
                    ? "linear-gradient(90deg,#ff6d4d 0%,#ff3c2a 60%,#ff94a1 100%)"
                    : "#f5f5f7",
                  boxShadow: currentIndex === idx
                    ? "0 0 4px 0 #ff3c2a88"
                    : "none"
                }}
                aria-label={`Go to partner slide ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;