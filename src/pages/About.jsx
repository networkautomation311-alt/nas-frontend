import { useState } from "react";

const CheckIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const stats = [
  { num: "1000+", label: "Installations" },
  { num: "30+", label: "Years Experience" },
  { num: "5", label: "Cities Served" },
  { num: "24×7", label: "Support" },
];

const focusCards = [
  {
    title: "Quality-Driven Solutions",
    desc: "Every project uses trusted brands and industry best practices to deliver reliable, high-performance results.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  {
    title: "Customer Satisfaction",
    desc: "Client-first thinking from the first consultation to long-term after-sales support and AMC.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Latest Technology",
    desc: "We stay ahead by implementing modern, future-ready automation and security tech across all projects.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Strong After-Sales Support",
    desc: "Our dedicated team ensures you're never left alone — from installation to ongoing AMC and maintenance.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.07 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.13 1 .37 1.97.71 2.9a2 2 0 0 1-.45 2.11L9.09 10.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.93.34 1.9.58 2.9.71A2 2 0 0 1 23 18z" />
      </svg>
    ),
  },
];

const whyUs = [
  "1000+ Successful Installations",
  "Experienced & Skilled Engineers",
  "Trusted Brands & Quality Products",
  "Fast Installation & Quick Support",
  "Customized Solutions for Every Client",
  "Affordable & Scalable Services",
  "24×7 Technical Assistance",
  "Single Point of Contact for All Services",
];

const differentiators = [
  "End-to-End Solution Provider — No Multiple Vendors Needed",
  "Strong Focus on Automation & Smart Technology",
  "Quick Response & Dedicated Support Team",
  "Proven Experience Across Multiple Industries",
  "Long-Term AMC & Maintenance Support",
];

const cities = ["Indore", "Dewas", "Ujjain", "Pithampur", "Mhow"];

const founderTags = ["CCTV Systems", "Networking", "Home Automation", "Security Solutions", "IT Infrastructure"];

export default function AboutPage() {
  const [hoveredCity, setHoveredCity] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* HERO */}
      <section className="relative overflow-hidden text-white">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: "none" }} // Ensure no blur or darkening, for clear video
            poster="/video-poster.jpg"
          >
            <source src="https://res.cloudinary.com/dz4zdzuaj/video/upload/q_auto/f_auto/v1779277578/cctv_nas_video_korjqw.mp4" type="video/mp4" />
            {/* fallback */}
          </video>
        </div>
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
          <p className="text-xs tracking-widest uppercase text-red-100 mb-5">About Us</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl mb-5">
            Smart. Secure.<br />
            <span className="text-orange-200">Automated.</span>
          </h1>
          <div className="w-10 h-0.5 bg-white/50 mb-6" />
          <p className="text-base md:text-lg text-red-50 max-w-xl leading-relaxed">
            A professional IT, security, and home automation company delivering intelligent, reliable systems for modern homes and businesses — all under one roof.
          </p>
          {/* Floating stat row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-4">
                <div className="text-2xl font-bold text-white">{s.num}</div>
                <div className="text-xs text-red-100 mt-1 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        {/* WHO WE ARE */}
        <section className="py-16 border-b border-gray-100">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-8">Company Overview</p>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                With years of industry experience, we specialize in building intelligent systems that improve efficiency, reduce manual errors, and enhance security. Our solutions are designed to be reliable, scalable, and future-ready.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We provide complete end-to-end services — from consultation and product supply to installation, automation, and long-term support. We work with trusted brands like <span className="font-medium text-gray-700">Hikvision</span> and other leading manufacturers, covering residential, commercial, and industrial projects.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Installations completed", val: "4000+" },
                { label: "Years of experience", val: "30+" },
                { label: "Cities we serve", val: "5" },
                { label: "24×7 support", val: "Always" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-gray-50 border border-gray-100 p-5">
                  <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">{item.val}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="py-16 border-b border-gray-100">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-8">Founder &amp; Leadership</p>
          <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0 bg-gradient-to-br from-red-600 to-orange-500">
                FN
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">Manish Dawar</div>
                <div className="text-sm text-gray-400 mt-0.5">Founder &amp; Director, Network Automation Solutions</div>
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed mb-4">
              Network Automation Solutions was founded with a vision to provide reliable, smart, and advanced security and automation solutions for modern homes and businesses. With <span className="font-semibold text-gray-700">30+ years of industry experience</span> in IT infrastructure, surveillance systems, and networking technologies, he has successfully built the company into a trusted service provider across Indore and nearby regions.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Under his leadership, the company has completed 4000+ successful installations and continues to deliver high-quality, customized solutions tailored to every client's needs.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {founderTags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CORE FOCUS */}
        <section className="py-16 border-b border-gray-100">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-8">Core Focus</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {focusCards.map((card) => (
              <div key={card.title} className="group bg-white rounded-xl border border-gray-100 p-6 hover:border-red-200 hover:shadow-sm transition-all duration-200">
                <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-600 mb-4 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-orange-500 group-hover:text-white transition-all duration-200">
                  {card.icon}
                </div>
                <div className="text-sm font-semibold text-gray-800 mb-2">{card.title}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="py-16 border-b border-gray-100">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-8">Vision &amp; Mission</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white">
              <p className="text-xs tracking-widest uppercase text-red-200 mb-3">Our Vision</p>
              <h3 className="text-xl font-bold mb-4 leading-snug">A fully automated, secure digital ecosystem</h3>
              <p className="text-sm text-red-100 leading-relaxed">
                To create a digital ecosystem where every home and business operates on a secure, error-free, and fully automated infrastructure.
              </p>
            </div>
            <div className="rounded-2xl p-8 bg-white border border-gray-100">
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">Our Mission</p>
              <ul className="space-y-3">
                {[
                  "Deliver smart, automation-driven solutions",
                  "Make systems faster, safer, and cost-effective",
                  "Ensure high-level security and performance",
                  "Provide reliable service and long-term customer satisfaction",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-500">
                    <span className="mt-0.5 text-red-500"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16 border-b border-gray-100">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-8">Why Choose Us</p>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5">Our Strengths</h2>
              <ul className="space-y-1">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-2.5 border-b border-gray-50 text-sm text-gray-500 last:border-0">
                    <span className="text-red-500"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5">What Makes Us Different</h2>
              <ul className="space-y-1">
                {differentiators.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-2.5 border-b border-gray-50 text-sm text-gray-500 last:border-0">
                    <span className="text-orange-500"><StarIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* OUR PRESENCE */}
        <section className="py-16 border-b border-gray-100">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">Our Presence</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Proudly serving across Madhya Pradesh</h2>
          <div className="flex flex-wrap gap-3">
            {cities.map((city) => (
              <button
                key={city}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm transition-all duration-200 ${
                  hoveredCity === city
                    ? "bg-gradient-to-r from-red-600 to-orange-500 text-white border-transparent shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:border-red-200"
                }`}
              >
                <MapPinIcon />
                {city}
              </button>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Our commitment to you</h2>
            <p className="text-gray-500 mt-3 max-w-lg leading-relaxed text-sm">
              We are committed to delivering reliable, secure, and future-ready solutions that help our clients create safer and smarter environments — today and for years to come.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm">
              Contact Us →
            </button>
            <button className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
              Our Services
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}