// No need for explicit import React for function components (React 17+)
import {
  Wifi,
  Network,
  ShieldCheck,
  Settings2,
} from "lucide-react";

// WiFi & Networking feature cards (modeled like BiometricSystems)
const wifiFeatures = [
  {
    title: "Seamless Connectivity",
    icon: <Wifi size={44} strokeWidth={2.2} className="text-blue-500" />,
    color: "from-blue-100 to-cyan-100",
    description:
      "Experience uninterrupted, high-speed WiFi throughout your home or workspace for ultimate productivity and entertainment.",
    tag: "Coverage",
    tagColor: "bg-blue-500 text-white",
    features: [
      "High-speed dual-band",
      "No drop zones",
      "Smart handoff"
    ],
  },
  {
    title: "Mesh Networking",
    icon: <Network size={44} strokeWidth={2.2} className="text-pink-500" />,
    color: "from-pink-100 to-violet-100",
    description:
      "Eliminate dead zones with intelligent mesh solutions—expand your network seamlessly as your needs grow.",
    tag: "Smart Mesh",
    tagColor: "bg-pink-500 text-white",
    features: [
      "Flexible expansion",
      "Seamless roaming",
      "Unified SSID"
    ],
  },
  {
    title: "Enterprise-Grade Security",
    icon: <ShieldCheck size={44} strokeWidth={2.2} className="text-green-600" />,
    color: "from-green-100 to-lime-100",
    description:
      "Protect your data and devices with advanced encryption, firewalls, and multi-layer defense—safe for work and home.",
    tag: "Security",
    tagColor: "bg-green-500 text-white",
    features: [
      "WPA3 encryption",
      "Firewalled VLANs",
      "Guest isolation"
    ],
  },
  {
    title: "Advanced Management",
    icon: <Settings2 size={44} strokeWidth={2.2} className="text-yellow-500" />,
    color: "from-yellow-100 to-orange-100",
    description:
      "Monitor usage, set up guest networks, and prioritize traffic with cloud-managed tools and intuitive mobile apps.",
    tag: "Control",
    tagColor: "bg-yellow-500 text-white",
    features: [
      "Cloud dashboard",
      "App control",
      "Guest/parental access"
    ],
  },
];

const WifiNetworking = () => {
  return (
    <section className="bg-gradient-to-br from-white via-sky-50 to-cyan-100 min-h-screen">
      {/* HERO / BANNER */}
      <div className="bg-[#046389]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-14 gap-8">
          <div>
            <span className="text-base uppercase tracking-widest text-cyan-200 font-semibold mb-4 inline-block">
              WiFi & Networking
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Professional <span className="text-cyan-200">WiFi Solutions</span>
            </h1>
            <p className="text-cyan-100 md:text-lg mb-5 max-w-lg">
              Fast, reliable, and secure networking for homes, offices, shops, and enterprises—wireless the way it should be!
            </p>
            <button className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold px-4 py-2 rounded-lg shadow-xl transition mb-2 text-sm">
              Get Free Consultation
            </button>
            <div className="text-cyan-200 text-xs mt-2">
              <span className="font-black">500+</span> connected installations and growing
            </div>
          </div>
          {/* Banner Image */}
          <div className="relative">
            <div className="absolute w-32 h-32 bg-cyan-300/20 rounded-full blur-3xl left-8 top-1/3 -z-10"></div>
            <img
              src="/images/wifi-networking/wifi-illustration.png"
              alt="WiFi Networking Illustration"
              className="w-40 md:w-52 object-contain mx-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Products Grid - Ecommerce Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <h2 className="text-3xl text-center font-bold mb-2 text-gray-900">Best WiFi & Networking Features</h2>
        <p className="text-center mb-10 text-gray-600">
          Compare, customize and schedule professional WiFi setup across home, office, or campus.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {wifiFeatures.map((feature) => (
            <div
              key={feature.title}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl flex flex-col transition hover:scale-105 relative border border-gray-100 group`}
            >
              {/* Tag */}
              <span className={`absolute right-3 top-3 text-xs px-3 py-1 rounded-full font-semibold ${feature.tagColor} z-10`}>
                {feature.tag}
              </span>
              {/* Icon Instead of Image */}
              <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-t-2xl overflow-hidden border-b">
                <div className="">{feature.icon}</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-700 mb-1">{feature.title}</h3>
                {/* No price for these */}
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{feature.description}</p>
                <ul className="mb-3 space-y-1 text-sm text-gray-700">
                  {(feature.features || []).map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-cyan-600 font-bold">✔</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`/pages/enquiry-form?product=${encodeURIComponent(feature.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-md py-1.5 px-3 transition w-full text-sm text-center block"
                >
                  Enquire Now
                </a>
           
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Assurance Section */}
      <div className="bg-white border-t border-cyan-100 py-10">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-10">
          <div className="flex items-center gap-4">
            <span className="bg-cyan-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#06b6d4" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#06b6d4" fontFamily="Arial" fontWeight="bold">✓</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Router Onsite Setup</div>
              <div className="text-gray-500 text-sm">Fast installation & testing</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-cyan-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#06b6d4" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#06b6d4" fontFamily="Arial" fontWeight="bold">₹</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Transparent Pricing</div>
              <div className="text-gray-500 text-sm">No hidden charges</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-cyan-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#06b6d4" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#06b6d4" fontFamily="Arial" fontWeight="bold">🛡️</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Security Optimized</div>
              <div className="text-gray-500 text-sm">Priority protection support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Soft Animation (optional, reuse) */}
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

export default WifiNetworking;