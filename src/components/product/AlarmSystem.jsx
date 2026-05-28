import React from "react";
import {
  Shield,
  Flame,
  Siren,
  Smartphone,
} from "lucide-react";

// Product array – mimics structure from VideoDoorPhone
const alarmProducts = [
  {
    title: "Intrusion Detection",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=400&q=80",
    price: "Door/Window Sensors",
    tag: "Security",
    tagColor: "bg-red-600 text-white",
    description:
      "Smart sensors protect every entry point—triggering a loud local siren and instantly alerting you if an intruder is detected.",
    features: [
      "Perimeter coverage",
      "Instant loud alarm",
      "Mobile notifications"
    ],
    icon: <Shield size={38} strokeWidth={2.2} className="text-red-500" />
  },
  {
    title: "Fire & Smoke Monitoring",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=400&q=80",
    price: "Smart Detectors",
    tag: "Safety",
    tagColor: "bg-orange-500 text-white",
    description:
      "Intelligent smoke and heat sensors deliver rapid alerts and siren activation. Early warning—wherever you are.",
    features: [
      "24/7 fire alert",
      "App & onsite warning",
      "Works during power cuts"
    ],
    icon: <Flame size={38} strokeWidth={2.2} className="text-orange-500" />
  },
  {
    title: "Panic / SOS Alerts",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80",
    price: "SOS Button",
    tag: "Emergency",
    tagColor: "bg-pink-500 text-white",
    description:
      "One-tap panic buttons for medical, fire, or duress situations. Get fast help for seniors and loved ones.",
    features: [
      "Wireless SOS button",
      "Family notification",
      "App-alert & siren"
    ],
    icon: <Siren size={38} strokeWidth={2.2} className="text-pink-500" />
  },
  {
    title: "App & Remote Control",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&w=400&q=80",
    price: "iOS & Android",
    tag: "Smart",
    tagColor: "bg-blue-500 text-white",
    description:
      "Arm/disarm system, control siren, see alerts, and monitor status remotely from anywhere via mobile app.",
    features: [
      "Instant push alerts",
      "Remote arming",
      "Full event history"
    ],
    icon: <Smartphone size={38} strokeWidth={2.2} className="text-blue-500" />
  },
];

const benefits = [
  "Comprehensive, all-in-one coverage: intrusion, fire, and SOS",
  "24/7 real-time alerting with tamper detection",
  "Seamless mobile app for full control & insights",
  "Easy, wireless setup for any property type",
  "Professional support & rapid response",
];

const AlarmSystem = () => {
  return (
    <section className="bg-gradient-to-br from-white via-orange-50 to-yellow-100 min-h-screen">
      {/* HERO / BANNER */}
      <div className="bg-[#b91c1c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-14 gap-8">
          <div>
            <span className="text-base uppercase tracking-widest text-yellow-200 font-semibold mb-4 inline-block">
              Alarm Systems
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Smart <span className="text-yellow-300">Alarm Protection</span> for Total Safety
            </h1>
            <p className="text-yellow-100 md:text-lg mb-5 max-w-lg">
              Instantly respond to break-ins, fire, or emergencies. Modern wireless alarms with app controls; stay secure even when you’re away.
              <span className="text-yellow-300 font-bold"> Peace of mind, always.</span>
            </p>
            <button
              className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-lg shadow-xl transition mb-2 text-sm px-4 py-2"
              style={{ minWidth: 0 }}
            >
              Book Free Demo
            </button>
            <div className="text-yellow-200 text-xs mt-2">
              <span className="font-black">1000+</span> homes & offices protected
            </div>
          </div>
          {/* Banner Image */}
          <div className="relative">
            <div className="absolute w-32 h-32 bg-orange-300/10 rounded-full blur-3xl left-8 top-1/3 -z-10"></div>
            <img
              src="https://res.cloudinary.com/dz4zdzuaj/image/upload/v1778668386/ChatGPT_Image_May_13_2026_04_02_39_PM_obrif2.png"
              alt="Alarm System"
              className="w-44 md:w-56 object-contain mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Products Grid - Ecommerce Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <h2 className="text-3xl text-center font-bold mb-2 text-gray-900">
          Best Alarm System Solutions
        </h2>
        <p className="text-center mb-10 text-gray-600">
          Choose the right alarm package for your apartment, villa, or office. Expert setup & support across India.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {alarmProducts.map((product) => (
            <div
              key={product.title}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl flex flex-col transition hover:scale-105 relative border border-gray-100 group"
            >
              {/* Tag */}
              <span
                className={`absolute right-3 top-3 text-xs px-3 py-1 rounded-full font-semibold ${product.tagColor} z-10`}
              >
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
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-700 mb-1">
                  {product.title}
                </h3>
                {/* Price */}
                <div className="text-orange-700 font-extrabold text-xl mb-2">{product.price}</div>
                {/* Description */}
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                {/* Features */}
                <ul className="mb-3 space-y-1 text-sm text-gray-700">
                  {product.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-red-500 font-bold">✔</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {/* Enquire Button */}
                <a
                  href={`/pages/enquiry-form?product=${encodeURIComponent(product.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-gradient-to-r from-red-500 via-red-600 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-md transition w-full text-sm px-3 py-1.5 text-center block"
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
      <div className="bg-white border-t border-orange-100 py-10">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-10">
          <div className="flex items-center gap-4">
            <span className="bg-orange-50 rounded-full p-3">
              <svg width="28" height="28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="#f97316" strokeWidth="2" />
                <text
                  x="14"
                  y="19"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#f97316"
                  fontFamily="Arial"
                  fontWeight="bold"
                >
                  ✓
                </text>
              </svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Onsite Installation</div>
              <div className="text-gray-500 text-sm">Pan-India, by experts</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-orange-50 rounded-full p-3">
              <svg width="28" height="28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="#f97316" strokeWidth="2" />
                <text
                  x="14"
                  y="19"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#f97316"
                  fontFamily="Arial"
                  fontWeight="bold"
                >
                  ₹
                </text>
              </svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Upfront Pricing</div>
              <div className="text-gray-500 text-sm">Transparent, no hidden fees</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-orange-50 rounded-full p-3">
              <svg width="28" height="28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="#f97316" strokeWidth="2" />
                <text
                  x="14"
                  y="19"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#f97316"
                  fontFamily="Arial"
                  fontWeight="bold"
                >
                  🕑
                </text>
              </svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Warranty & Support</div>
              <div className="text-gray-500 text-sm">Prompt & priority care</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose/Benefits Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        <div className="flex-1 bg-gradient-to-br from-orange-200/60 to-white rounded-2xl p-8 mb-8 md:mb-0">
          <h3 className="font-black text-2xl text-orange-800 mb-4 flex items-center gap-2">
            <span>Why Choose NAS Alarms?</span>
            <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path d="M12 20v-6m0 0v-2a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0z" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </h3>
          <ul className="list-none space-y-4 text-base text-gray-900">
            {benefits.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-orange-600 font-bold mt-1 text-base">✔</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dz4zdzuaj/image/upload/v1778668386/ChatGPT_Image_May_13_2026_04_02_39_PM_obrif2.png"
            alt="Alarm System Assurance"
            className="w-full max-w-xs md:max-w-sm drop-shadow-lg rounded-2xl"
            loading="lazy"
          />
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

export default AlarmSystem;