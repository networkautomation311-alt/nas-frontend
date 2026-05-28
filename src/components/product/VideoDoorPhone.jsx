// VideoDoorPhone.jsx - Updated layout/structure to match BiometricSystems.jsx structure

import {
  Mic2,
  Video,
  KeyRound,
  Smartphone,
} from "lucide-react";

// Video Door Phone products grid array - refactored to match BiometricSystems product structure
const videoDoorPhoneProducts = [
  {
    title: "Two-Way Communication",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80",
    price: "Built-in Mic & Speaker",
    tag: "Safety",
    tagColor: "bg-blue-500 text-white",
    description:
      "Talk to visitors and verify identity before opening the door. HD audio with noise cancellation—no shouting required.",
    features: [
      "Crystal clear voice",
      "Private conversation",
      "Hands-free operation",
    ],
    icon: <Mic2 size={38} strokeWidth={2.1} className="text-blue-400" />
  },
  {
    title: "Live Video Monitoring",
    image: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?fit=crop&w=400&q=80",
    price: "HD Video Feed",
    tag: "24/7 View",
    tagColor: "bg-teal-500 text-white",
    description:
      "See visitors in real time—wide-angle, HD video even at night or in bad weather. No more guesswork at the door.",
    features: [
      "Night vision",
      "Tamper alerts",
      "Wide-angle lens",
    ],
    icon: <Video size={38} strokeWidth={2.1} className="text-teal-400" />
  },
  {
    title: "Remote Unlock",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&w=400&q=80",
    price: "Smart Access",
    tag: "Convenience",
    tagColor: "bg-green-500 text-white",
    description:
      "Open your door from anywhere via mobile app or indoor station. Keep kids and seniors safe without hassle.",
    features: [
      "Mobile/unlock button",
      "Secure, encrypted relay",
      "Works from anywhere",
    ],
    icon: <KeyRound size={38} strokeWidth={2.1} className="text-green-400" />
  },
  {
    title: "App & Mobile Integration",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=400&q=80",
    price: "iOS & Android",
    tag: "Smart",
    tagColor: "bg-pink-500 text-white",
    description:
      "Instant notifications, view live video, talk to visitors, and unlock your door—all from your smartphone.",
    features: [
      "Instant alerts",
      "Remote monitoring",
      "Simple setup",
    ],
    icon: <Smartphone size={38} strokeWidth={2.1} className="text-pink-400" />
  },
];

const VideoDoorPhone = () => {
  return (
    <section className="bg-gradient-to-br from-white via-indigo-50 to-blue-100 min-h-screen">
      {/* HERO / BANNER */}
      <div className="bg-[#1d2542]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-14 gap-8">
          <div>
            <span className="text-base uppercase tracking-widest text-red-400 font-semibold mb-4 inline-block">
              Video Door Phone
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Seamless Visitor <span className="text-red-400">Screening & Secure Access</span>
            </h1>
            <p className="text-gray-200 md:text-lg mb-5 max-w-lg">
              See, speak, and decide—empowering smarter and safer entry to your property. Advanced video door phones deliver security, convenience, and control{" "}
              <span className="text-red-400 font-bold">at your fingertips.</span>
            </p>
            <button
              className="bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold rounded-lg shadow-xl transition mb-2 text-sm px-4 py-2"
              style={{ minWidth: 0 }}
            >
              Book Free Demo
            </button>
            <div className="text-blue-200 text-xs mt-2">
              <span className="font-black">1000+</span> homes & offices secured
            </div>
          </div>
          {/* Banner Image */}
          <div className="relative">
            <div className="absolute w-32 h-32 bg-red-400/10 rounded-full blur-3xl left-8 top-1/3 -z-10"></div>
            <img
              src="https://res.cloudinary.com/dz4zdzuaj/image/upload/v1778669673/ChatGPT_Image_May_13_2026_04_24_16_PM_ikbzlj.png"
              alt="Video Door Phone"
              className="w-44 md:w-56 object-contain mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Products Grid - Ecommerce Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <h2 className="text-3xl text-center font-bold mb-2 text-gray-900">Best Video Door Phone Solutions</h2>
        <p className="text-center mb-10 text-gray-600">
          Choose the right video door phone for your apartment, office, or villa. Expert setup & support across India.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {videoDoorPhoneProducts.map((product) => (
            <div
              key={product.title}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl flex flex-col transition hover:scale-105 relative border border-gray-100 group"
            >
              {/* Tag */}
              <span className={`absolute right-3 top-3 text-xs px-3 py-1 rounded-full font-semibold ${product.tagColor} z-10`}>
                {product.tag}
              </span>
              {/* Product Image */}
              <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-t-2xl overflow-hidden border-b">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                {/* Icon */}
                <div className="mb-2 flex items-center justify-center">{product.icon}</div>
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 mb-1">{product.title}</h3>
                {/* Price */}
                <div className="text-red-600 font-extrabold text-xl mb-2">{product.price}</div>
                {/* Description */}
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                {/* Features */}
                <ul className="mb-3 space-y-1 text-sm text-gray-700">
                  {product.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-blue-500 font-bold">✔</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {/* Enquire Button */}
                <a
                  href={`/pages/enquiry-form?product=${encodeURIComponent(product.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-md transition w-full text-sm px-3 py-1.5 text-center block"
                  style={{ minWidth: 0 }}
                >
                  Enquire Now
                </a>
           
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Assurance Section */}
      <div className="bg-white border-t border-blue-100 py-10">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-10">
          <div className="flex items-center gap-4">
            <span className="bg-blue-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#3b82f6" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#3b82f6" fontFamily="Arial" fontWeight="bold">✓</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Onsite Installation</div>
              <div className="text-gray-500 text-sm">Pan-India, by experts</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-blue-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#3b82f6" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#3b82f6" fontFamily="Arial" fontWeight="bold">₹</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Upfront Pricing</div>
              <div className="text-gray-500 text-sm">Transparent, no hidden fees</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-blue-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#3b82f6" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#3b82f6" fontFamily="Arial" fontWeight="bold">🕑</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Warranty & Support</div>
              <div className="text-gray-500 text-sm">Prompt & priority care</div>
            </div>
          </div>
        </div>
      </div>

      {/* Style Block for Consistent UI */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 18s linear infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default VideoDoorPhone;