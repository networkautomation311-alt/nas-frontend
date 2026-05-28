import { useState, useRef } from "react";

// Animated slide data
const slideImages = [
  "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1778657754/ChatGPT_Image_May_13_2026_01_05_06_PM_ntyqnm.png",
  "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1778659634/ChatGPT_Image_May_13_2026_01_36_57_PM_cm1evy.png",
  "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1778659727/ChatGPT_Image_May_13_2026_01_38_34_PM_exu7jf.png",
  "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1778659844/ChatGPT_Image_May_13_2026_01_40_33_PM_swddev.png",
];

const slideAlts = [
  "CCTV Installation",
  "Smart Home Automation",
  "Security Solutions",
  "Networking Services",
];

const slideHeadings = [
  <>
    Smart IT & CCTV <br />
    <span className="text-yellow-300">Automation Solutions</span>
  </>,
  <>
    Smarter <span className="text-yellow-300">Home Automation</span> <br />
    For a Secure Life
  </>,
  <>
    <span className="text-yellow-300">Security Solutions</span> <br />
    Tailored for You
  </>,
  <>
    <span className="text-yellow-300">Networking</span> Services <br />
    For Modern Businesses
  </>,
];

const slideDescriptions = [
  "We provide advanced CCTV, Networking, Security & Home Automation solutions for homes and businesses with 30+ years of experience.",
  "Transform your space into a Smart Home—effortless, secure, reliable, and convenient control at your fingertips.",
  "Comprehensive security strategies combining technology and expertise for families, offices, and industries.",
  "Fast, robust networking for reliable connectivity and cutting-edge communication infrastructure.",
];

const ANIMATION_IN = "slidein-fade";
const ANIMATION_OUT = "slideout-fade";

// BG video url updated as requested
const HERO_BG_VIDEO =
  "https://res.cloudinary.com/dz4zdzuaj/video/upload/v1778662672/107773-678526591_gfyfan.mp4";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animation, setAnimation] = useState(ANIMATION_IN);
  const changing = useRef(false);

  // NOTE: Video timer removed, no auto-advance

  // Helper to transition to next/prev with animation
  function handleNext(nextIdx = null) {
    if (changing.current) return;
    changing.current = true;
    setAnimation(ANIMATION_OUT);
    setTimeout(() => {
      let next;
      if (nextIdx !== null) {
        next = nextIdx;
      } else {
        next = current === slideImages.length - 1 ? 0 : current + 1;
      }
      setCurrent(next);
      setAnimation(ANIMATION_IN);
      changing.current = false;
    }, 360); // matches CSS duration
  }

  function handleDot(idx) {
    if (idx === current || changing.current) return;
    handleNext(idx);
  }

  return (
    <section className="relative text-black overflow-x-hidden">
      {/* BG video layer */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={HERO_BG_VIDEO} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay to boost contrast over video */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-orange-100 to-orange-200 opacity-90 pointer-events-none"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content ● Animated Headline & Description */}
        <div className="md:w-1/2 space-y-6">
          <h1
            className={`
              text-4xl md:text-5xl font-bold leading-tight min-h-[4.5rem] md:min-h-[5.8rem] transition-all
              ${animation === ANIMATION_IN ? "hero-headline-in" : "hero-headline-out"}
            `}
          >
            {slideHeadings[current]}
          </h1>
          <p
            className={`
              text-lg text-gray-700 min-h-[3.3rem] transition-all
              ${animation === ANIMATION_IN ? "hero-desc-in" : "hero-desc-out"}
            `}
          >
            {slideDescriptions[current]}
          </p>

          <div className="flex gap-4">
            <a
              href="/quote"
              className="bg-black text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-900 transition"
            >
              Get Quote
            </a>
            <a
              href="/pages/contact"
              className="border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition"
            >
              Contact Us
            </a>
          </div>
        </div>
        {/* Right Animated Design Slider */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex flex-col items-center justify-center relative min-h-[280px]">
          <div className="relative flex items-center h-[230px] md:h-[300px] w-80 md:w-[400px] overflow-hidden rounded-xl shadow-lg bg-white/30">
            {/* Slide icons (prev/next) removed */}
            <div className="flex-1 flex justify-center items-center w-full h-full">
              <img
                src={slideImages[current]}
                alt={slideAlts[current]}
                className={`
                  w-full h-[210px] md:h-[270px] object-contain
                  transition-all duration-500 ease-in-out
                  ${animation === ANIMATION_IN ? "slide-img-in" : "slide-img-out"}
                `}
                key={current}
              />
            </div>
          </div>
          {/* Dots with animated expand */}
          <div className="flex gap-2 mt-5 justify-center">
            {slideImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDot(idx)}
                className={`h-3 w-3 rounded-full outline-none border-none 
                  ${
                    current === idx
                      ? "bg-yellow-300 scale-125 ring-2 ring-yellow-200"
                      : "bg-black bg-opacity-20"
                  }
                  transition-all duration-300`}
                aria-label={`Go to slide ${idx + 1}`}
                style={{outline: "none", border: "none"}}
              ></button>
            ))}
          </div>
        </div>
      </div>
      <style>
        {`
        /* Slide headline in/out animations */
        .hero-headline-in {
          animation: heroHeadlineIn 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .hero-headline-out {
          animation: heroHeadlineOut 0.36s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes heroHeadlineIn {
          from { opacity: 0; filter: blur(3px); transform: translateY(24px) scale(0.98);}
          to   { opacity: 1; filter: blur(0); transform: none;}
        }
        @keyframes heroHeadlineOut {
          from { opacity: 1; filter: blur(0); transform: none;}
          to   { opacity: 0; filter: blur(5px); transform: translateY(-20px) scale(0.96);}
        }

        /* Description animations */
        .hero-desc-in {
          animation: heroDescIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .hero-desc-out {
          animation: heroDescOut 0.34s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes heroDescIn {
          from { opacity: 0; filter: blur(3px); transform: translateY(16px);}
          to   { opacity: 1; filter: blur(0); transform: none;}
        }
        @keyframes heroDescOut {
          from { opacity: 1; filter: blur(0); transform: none;}
          to   { opacity: 0; filter: blur(6px); transform: translateY(-10px);}
        }

        /* Slide image animations */
        .slide-img-in {
          animation: slideImageIn 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .slide-img-out {
          animation: slideImageOut 0.36s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideImageIn {
          from { opacity: 0; transform: scale(0.85) translateX(40px);}
          to   { opacity: 1; transform: scale(1) translateX(0);}
        }
        @keyframes slideImageOut {
          from { opacity: 1; transform: scale(1) translateX(0);}
          to   { opacity: 0; transform: scale(0.91) translateX(-30px);}
        }
        `}
      </style>
    </section>
  );
};

export default Hero;