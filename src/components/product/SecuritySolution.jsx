// No need for explicit import React for function components (React 17+)
import {
  Camera,
  KeyRound,
  Shield,
  Flame
} from "lucide-react";

// Security product/feature cards (modeled like BiometricSystems)
const securityFeatures = [
  {
    title: "Surveillance Cameras",
    icon: <Camera size={44} strokeWidth={2.2} className="text-blue-500" />,
    color: "from-blue-100 to-gray-100",
    description:
      "Monitor and record premises 24/7—deter crime, gather evidence, and ensure staff and asset safety with high-definition cameras.",
    tag: "Vision Everywhere",
    tagColor: "bg-blue-500 text-white",
    features: [
      "Infrared & night view",
      "App viewing & alerts",
      "HD cloud storage"
    ]
  },
  {
    title: "Access Control",
    icon: <KeyRound size={44} strokeWidth={2.2} className="text-green-500" />,
    color: "from-green-100 to-emerald-100",
    description:
      "Restrict and monitor entry points using RFID, cards, or biometrics. Log every movement with flexible permissions and schedules.",
    tag: "Authorized Entry",
    tagColor: "bg-green-500 text-white",
    features: [
      "Biometric/RFID",
      "Custom permissions",
      "Detailed logs"
    ]
  },
  {
    title: "Intrusion Detection",
    icon: <Shield size={44} strokeWidth={2.2} className="text-yellow-500" />,
    color: "from-yellow-100 to-orange-100",
    description:
      "Protect after hours with smart motion sensors, door/window alerts, and real-time alarm notifications—fast response to threats.",
    tag: "Instant Alerts",
    tagColor: "bg-yellow-500 text-white",
    features: [
      "Motion & door sensors",
      "Instant phone alert",
      "Audible alarm"
    ]
  },
  {
    title: "Fire & Safety Alarms",
    icon: <Flame size={44} strokeWidth={2.2} className="text-red-500" />,
    color: "from-red-100 to-pink-100",
    description:
      "Safeguard life and property. Advanced smoke, fire, and gas sensors trigger evacuation and notify authorities automatically.",
    tag: "Life Safety",
    tagColor: "bg-red-500 text-white",
    features: [
      "Smoke & gas sensors",
      "Auto notifications",
      "24/7 active"
    ]
  },
];

const SecuritySolution = () => {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-gray-100 min-h-screen">
      {/* HERO / BANNER */}
      <div className="bg-[#0a1e36]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-14 gap-8">
          <div>
            <span className="text-base uppercase tracking-widest text-blue-400 font-semibold mb-4 inline-block">
              Security Partner
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Smart Business <span className="text-blue-300">Security Solutions</span>
            </h1>
            <p className="text-gray-200 md:text-lg mb-5 max-w-lg">
              Defend your staff, data, and premises with intelligent surveillance, entry management, and reliable safety systems—fully managed, fast setup.
            </p>
            <button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold px-4 py-2 rounded-md shadow-xl transition mb-2 text-sm">
              Request Free Assessment
            </button>
            <div className="text-blue-200 text-xs mt-2">
              <span className="font-black">500+</span> businesses protected
            </div>
          </div>
          {/* Banner Image */}
          <div className="relative">
            <div className="absolute w-32 h-32 bg-blue-400/10 rounded-full blur-3xl left-8 top-1/3 -z-10"></div>
            <img
              src="/images/security/security-illustration.png"
              alt="Security Service Banner"
              className="w-40 md:w-52 object-contain mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Products Grid - Ecommerce Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <h2 className="text-3xl text-center font-bold mb-2 text-gray-900">Best Security Features For You</h2>
        <p className="text-center mb-10 text-gray-600">
          Discover, compare and set up security solutions tailored for your workspace or property—nationwide support.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl flex flex-col transition hover:scale-105 relative border border-gray-100 group`}
            >
              {/* Tag */}
              <span className={`absolute right-3 top-3 text-xs px-3 py-1 rounded-full font-semibold ${feature.tagColor} z-10`}>
                {feature.tag}
              </span>
              {/* Icon */}
              <div className="w-full h-36 flex items-center justify-center rounded-t-2xl overflow-hidden bg-gray-50 border-b">
                <div className="flex items-center justify-center">{feature.icon}</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 mb-1">{feature.title}</h3>
                {/* Description */}
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{feature.description}</p>
                {/* Features */}
                <ul className="mb-3 space-y-1 text-sm text-gray-700">
                  {feature.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-blue-500 font-bold">✔</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {/* Enquire Button */}
                <a
                  href={`/pages/enquiry-form?product=${encodeURIComponent(feature.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-md py-1.5 px-3 transition w-full text-sm text-center block"
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
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#2563eb" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#2563eb" fontFamily="Arial" fontWeight="bold">✓</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Professional Installation</div>
              <div className="text-gray-500 text-sm">Anywhere in India</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-blue-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#2563eb" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#2563eb" fontFamily="Arial" fontWeight="bold">₹</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Transparent Pricing</div>
              <div className="text-gray-500 text-sm">No hidden charges</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-blue-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#2563eb" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#2563eb" fontFamily="Arial" fontWeight="bold">🕑</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Service Warranty</div>
              <div className="text-gray-500 text-sm">Priority tech support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        <div className="flex-1 bg-gradient-to-br from-blue-200/60 to-white rounded-2xl p-8 mb-8 md:mb-0">
          <h3 className="font-black text-2xl text-blue-800 mb-4 flex items-center gap-2">
            <span>Why Choose Security?</span>
            <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path d="M12 20v-6m0 0v-2a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0z" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </h3>
          <ul className="list-none space-y-4 text-lg text-gray-800 pt-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">✓</span>
              Real-time surveillance & instant notification of events
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">✓</span>
              Access control—grant, revoke, and track movement
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">✓</span>
              Automated defense—alarm, doors, and responses
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">✓</span>
              Compliance-ready records for audit and safety
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">✓</span>
              Professional design, installation, and maintenance
            </li>
          </ul>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/images/security/security-illustration.png"
            alt="Security Illustration"
            className="max-w-xs md:max-w-sm w-full"
            loading="lazy"
          />
        </div>
      </div>

      {/* Soft Animation (reuse SCSS) */}
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

export default SecuritySolution;