import { useState, useEffect } from 'react';

const HappyCustomer = () => {
  // State for image slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Images array
  const images = [
    { image: "/image/ng 1.jpg" },
    { image: "/image/ng 2.jpg" },
    { image: "/image/ng 3.jpg" },
    { image: "/image/ng 4.jpg" },
    { image: "/image/ng 5.jpg" },
    { image: "/image/ng 6.jpg" },
    { image: "/image/ng 7.jpg" },
    { image: "/image/ng 8.jpg" },
    { image: "/image/ng 9.jpg" },
    { image: "/image/ng 10.jpeg" },
    { image: "/image/ng 11.jpeg" },
    { image: "/image/ng 12.jpeg" },
    { image: "/image/ng 14.jpeg" },
    { image: "/image/ng 15.jpeg" },
    { image: "/image/ng 16.jpeg" },
    { image: "/image/ng 17.jpeg" },
    { image: "/image/ng 18.jpeg" },
    { image: "/image/ng 19.jpeg" },
  ];

  // Handle slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  // Autoplay functionality using useEffect
  useEffect(() => {
    let autoplayInterval;
    if (isAutoplay) {
      autoplayInterval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(autoplayInterval);
    // eslint-disable-next-line
  }, [isAutoplay, images.length]);

  // Handle mouse events for pausing/resuming autoplay
  const handleMouseEnter = () => {
    setIsAutoplay(false);
  };

  const handleMouseLeave = () => {
    setIsAutoplay(true);
  };

  // Red linear gradient for color change
  // We'll apply a red linear gradient background with Tailwind + inline style
  // Example: bg-gradient-to-r from-red-600 via-red-500 to-red-400 (with fallback inline)
  // Red accent color is also used below for active thumbnail & button for better theming

  return (
    <div className="bg-white">
      <section className="text-red py-5">
        <div className="container mx-auto px-4">
          <div
            className="p-5 rounded-lg"
          >
            {/* Image Slider with Thumbnails */}
            <div className="mt-12 w-full max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center text-red-600">Our Gallery</h3>

              {/* Main Slider */}
              <div
                className="relative slider-container rounded-lg overflow-hidden shadow-lg mb-6 group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img.image}
                      alt={`Gallery Image ${index + 1}`}
                      className="min-w-full object-contain"
                      style={{ backgroundColor: "transparent", maxHeight: "400px", height: "400px" }}
                    />
                  ))}
                </div>

                {/* Left/Previous Button */}
                <button
                  onClick={previousSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Previous Slide"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                {/* Right/Next Button */}
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Next Slide"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsAutoplay((a) => !a)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white p-2 rounded-full bg-gradient-to-r from-[#ff6d4d] via-[#ff3c2a] to-[#ff94a1] bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                  style={{
                    background: "linear-gradient(90deg, #ff6d4d 0%, #ff3c2a 60%, #ff94a1 100%)"
                  }}
                  aria-label={isAutoplay ? "Pause Autoplay" : "Play Autoplay"}
                  type="button"
                >
                  {isAutoplay ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img.image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail w-16 h-16 rounded-lg border-2 border-transparent object-cover cursor-pointer transition-all duration-300 ${currentSlide === index ? 'active border-[#ff3c2a] scale-110 shadow-lg' : ''}`}
                    onClick={() => goToSlide(index)}
                    style={{
                      backgroundColor: "transparent",
                      borderImage: currentSlide === index
                        ? "linear-gradient(90deg,#ff3c2a 0,#ff6d4d 60%,#ff94a1 100%) 1"
                        : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HappyCustomer;
