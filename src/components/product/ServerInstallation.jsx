// ServerInstallation.jsx
// Rewritten to match BiometricSystems.jsx (@file_context_1) style & structure
// Button size reduced, color changed to red gradient for both hero and card buttons

import {
  Server,
  Cloud,
  Lock,
  RefreshCcw,
} from "lucide-react";

const serverProducts = [
  {
    title: "Dedicated Server Hardware",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&w=400&q=80", // Server rack photo
    price: "₹35,000 onwards",
    tag: "Hardware",
    tagColor: "bg-violet-500 text-white",
    description:
      "Enterprise-grade server deployment for ultra-reliable uptime, redundancy, and best-in-class performance. Perfect for critical business applications.",
    features: [
      "Branded components",
      "RAID, SSDs, ECC RAM",
      "Onsite setup"
    ],
  },
  {
    title: "Virtualization & Cloud Setup",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?fit=crop&w=400&q=80", // Cloud or server room
    price: "₹18,000 onwards",
    tag: "Virtualization",
    tagColor: "bg-blue-500 text-white",
    description:
      "Virtual machines for scalable workloads, private/hybrid cloud with resource control, licensing support, and seamless migration.",
    features: [
      "VMWare/Hyper-V",
      "Private & hybrid cloud",
      "Resource optimization"
    ],
  },
  {
    title: "Secure Network Integration",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=400&q=80", // Network cable/photo
    price: "₹12,500 onwards",
    tag: "Security",
    tagColor: "bg-emerald-500 text-white",
    description:
      "Firewalls, segmentation, VPN. Robust security rollout for server, network & endpoint—protect your sensitive business data.",
    features: [
      "Zero-trust network",
      "Firewall installation",
      "User access control"
    ],
  },
  {
    title: "Backup & Disaster Recovery",
    image: "https://images.unsplash.com/photo-1465101178521-c1a48b11d222?fit=crop&w=400&q=80", // Backup/data safety photo
    price: "₹9,999 onwards",
    tag: "Continuity",
    tagColor: "bg-yellow-500 text-white",
    description:
      "Automated backup solutions and disaster recovery plans so your business never stops—local & cloud redundancy.",
    features: [
      "Automated scheduling",
      "Quick restore",
      "Compliance ready"
    ],
  },
];

const ServerInstallation = () => {
  return (
    <section className="bg-gradient-to-br from-white via-violet-50 to-purple-100 min-h-screen">
      {/* HERO / BANNER */}
      <div className="bg-[#352966]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-14 gap-8">
          <div>
            <span className="text-base uppercase tracking-widest text-violet-400 font-semibold mb-4 inline-block">
              Server Installation
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Enterprise&nbsp;
              <span className="text-violet-300">Server Installation Solutions</span>
            </h1>
            <p className="text-gray-200 md:text-lg mb-5 max-w-lg">
              Future-ready environments for seamless operations: hardware, virtualization, network security, backup & disaster recovery. Trained support, pan-India deployment!
            </p>
            <button className="bg-gradient-to-r from-red-500 via-red-600 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-4 py-2 rounded-lg shadow-xl transition mb-2 text-sm">
              Get Free Demo
            </button>
            <div className="text-violet-200 text-xs mt-2">
              <span className="font-black">500+</span> enterprises protected & upscaled
            </div>
          </div>
          {/* Banner Image */}
          <div className="relative">
            <div className="absolute w-32 h-32 bg-violet-400/10 rounded-full blur-3xl left-8 top-1/3 -z-10"></div>
            <img
              src="https://res.cloudinary.com/dz4zdzuaj/image/upload/v1778669941/ChatGPT_Image_May_13_2026_04_28_51_PM_n4jcdb.png"
              alt="Server Room"
              className="w-40 md:w-52 object-contain mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <h2 className="text-3xl text-center font-bold mb-2 text-gray-900">Best Server Solutions For You</h2>
        <p className="text-center mb-10 text-gray-600">
          Choose, compare and book—dedicated servers, virtualization, security, managed backup. Onsite installation available across India.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {serverProducts.map((product) => (
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
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-violet-700 mb-1">{product.title}</h3>
                {/* Price */}
                <div className="text-violet-700 font-extrabold text-xl mb-2">{product.price}</div>
                {/* Description */}
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                {/* Features */}
                <ul className="mb-3 space-y-1 text-sm text-gray-700">
                  {product.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-violet-600 font-bold">✔</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {/* Enquire Button */}
                <a
                  href={`/pages/enquiry-form?product=${encodeURIComponent(product.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-gradient-to-r from-red-500 via-red-600 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-md py-1.5 px-3 transition w-full text-sm text-center block"
                >
                  Enquire Now
                </a>
           
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Assurance Section */}
      <div className="bg-white border-t border-purple-100 py-10">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-10">
          <div className="flex items-center gap-4">
            <span className="bg-violet-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#8b5cf6" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#8b5cf6" fontFamily="Arial" fontWeight="bold">✓</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Onsite Installation</div>
              <div className="text-gray-500 text-sm">Anywhere in India</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-violet-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#8b5cf6" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#8b5cf6" fontFamily="Arial" fontWeight="bold">₹</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Transparent Pricing</div>
              <div className="text-gray-500 text-sm">No hidden charges</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-violet-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#8b5cf6" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#8b5cf6" fontFamily="Arial" fontWeight="bold">🕑</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Service Warranty</div>
              <div className="text-gray-500 text-sm">Priority tech support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Soft Animation & line-clamp utility (copied from BiometricSystems.jsx) */}
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

export default ServerInstallation;