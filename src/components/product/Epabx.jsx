// EPABX products with product images, categories promoted to products list

const epabxProducts = [
  // --- Analog PBX ---
  {
    title: "Analog PBX",
    image: "https://images.unsplash.com/photo-1512359629-6323615b48d9?fit=crop&w=400&q=80",
    price: "",
    tag: "Analog",
    tagColor: "bg-yellow-500 text-white",
    description:
      "Reliable analog PBX system suitable for traditional phone lines and analog extensions.",
    features: [
      "Supports analog lines",
      "Expandable options",
      "Cost-effective",
    ],
  },
  {
    title: "Small Office PBX",
    image: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?fit=crop&w=400&q=80",
    price: "",
    tag: "Small Office",
    tagColor: "bg-yellow-400 text-white",
    description:
      "Compact PBX solution for small businesses and offices.",
    features: [
      "Suitable for small teams",
      "Easy installation",
      "Basic call management",
    ],
  },
  {
    title: "Multi Line PBX",
    image: "https://images.unsplash.com/photo-1468676071023-862eef0c2b52?fit=crop&w=400&q=80",
    price: "",
    tag: "Multi Line",
    tagColor: "bg-yellow-300 text-gray-900",
    description:
      "Multi-line PBX system for handling several concurrent calls.",
    features: [
      "Multiple incoming lines",
      "Flexible call distribution",
      "Ideal for busy offices",
    ],
  },
  {
    title: "Expandable PBX",
    image: "https://images.unsplash.com/photo-1556740767-c43c19d6ef73?fit=crop&w=400&q=80",
    price: "",
    tag: "Expandable",
    tagColor: "bg-yellow-600 text-white",
    description:
      "PBX system that grows with your business needs. Add extensions and lines as required.",
    features: [
      "Modular design",
      "Scalable",
      "Easy hardware add-ons",
    ],
  },
  {
    title: "Hybrid PBX",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=400&q=80",
    price: "",
    tag: "Hybrid",
    tagColor: "bg-yellow-700 text-white",
    description:
      "Blend of analog and digital PBX features for maximum flexibility.",
    features: [
      "Analog + Digital support",
      "Future-proof",
      "Feature-rich",
    ],
  },
  {
    title: "Analog PBX - View All",
    image: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?fit=crop&w=400&q=80",
    price: "",
    tag: "View All",
    tagColor: "bg-yellow-900 text-white",
    description: "Explore all Analog PBX systems available.",
    features: ["All models", "Full range"],
  },

  // --- Digital PBX ---
  {
    title: "Digital PBX",
    image: "https://images.unsplash.com/photo-1468676071023-862eef0c2b52?fit=crop&w=400&q=80",
    price: "",
    tag: "Digital PBX",
    tagColor: "bg-cyan-600 text-white",
    description:
      "Modern digital PBX offering crystal-clear calls and advanced features.",
    features: [
      "Digital extensions",
      "Better audio quality",
      "Easy integration",
    ],
  },
  {
    title: "IP PBX",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=400&q=80",
    price: "",
    tag: "IP PBX",
    tagColor: "bg-blue-500 text-white",
    description:
      "IP PBX systems with VoIP support for offices moving to digital telephony.",
    features: [
      "VoIP enabled",
      "Remote working ready",
      "Advanced call routing",
    ],
  },
  {
    title: "SIP PBX",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=400&q=80",
    price: "",
    tag: "SIP PBX",
    tagColor: "bg-indigo-700 text-white",
    description: "SIP compatible PBX for seamless internet telephony.",
    features: [
      "SIP trunking",
      "Flexible networks",
      "Modern protocol",
    ],
  },
  {
    title: "Call Center PBX",
    image: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?fit=crop&w=400&q=80",
    price: "",
    tag: "Call Center",
    tagColor: "bg-green-700 text-white",
    description: "PBX system designed for high-volume call centers.",
    features: [
      "Queue management",
      "Recording & analytics",
      "Agent management",
    ],
  },
  {
    title: "VoIP PBX",
    image: "https://images.unsplash.com/photo-1556740767-c43c19d6ef73?fit=crop&w=400&q=80",
    price: "",
    tag: "VoIP PBX",
    tagColor: "bg-blue-800 text-white",
    description: "Pure VoIP PBX solution for future-proof offices.",
    features: [
      "Internet based telephony",
      "Cloud compatible",
      "App and web calling",
    ],
  },
  {
    title: "Digital PBX - View All",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80",
    price: "",
    tag: "View All",
    tagColor: "bg-cyan-800 text-white",
    description: "Browse all Digital PBX products.",
    features: ["All models", "Feature range"],
  },

  // --- Intercom ---
  {
    title: "Audio Intercom",
    image: "https://images.unsplash.com/photo-1468676071023-862eef0c2b52?fit=crop&w=400&q=80",
    price: "",
    tag: "Audio",
    tagColor: "bg-teal-600 text-white",
    description: "Clear audio intercom system for secure communication.",
    features: [
      "HD Voice",
      "Wall-mountable",
      "Easy to use",
    ],
  },
  {
    title: "Video Intercom",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=400&q=80",
    price: "",
    tag: "Video",
    tagColor: "bg-pink-600 text-white",
    description: "Video-enabled intercom for visual verification.",
    features: [
      "High-res video",
      "Night vision",
      "Door release integration",
    ],
  },
  {
    title: "Villa Kit Intercom",
    image: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?fit=crop&w=400&q=80",
    price: "",
    tag: "Villa Kit",
    tagColor: "bg-yellow-500 text-white",
    description: "Intercom kit designed for villas and independent homes.",
    features: [
      "Multiple indoor units",
      "Outdoor station",
      "Weatherproof",
    ],
  },
  {
    title: "Apartment Kit Intercom",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=400&q=80",
    price: "",
    tag: "Apartment Kit",
    tagColor: "bg-cyan-500 text-white",
    description: "Suitable for apartments with easy expansion.",
    features: [
      "Multi-apartment support",
      "Centralized control",
      "Scalable",
    ],
  },
  {
    title: "Intercom - View All",
    image: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?fit=crop&w=400&q=80",
    price: "",
    tag: "View All",
    tagColor: "bg-teal-800 text-white",
    description: "Discover our range of Intercom products.",
    features: [
      "Audio, video, kits",
      "All types supported",
    ],
  },

  // --- Accessories ---
  {
    title: "Telephone Set",
    image: "https://images.unsplash.com/photo-1512359629-6323615b48d9?fit=crop&w=400&q=80",
    price: "",
    tag: "Accessory",
    tagColor: "bg-orange-400 text-white",
    description: "Reliable telephone sets for all PBX and intercom systems.",
    features: [
      "Wired and wireless",
      "Caller ID support",
      "Multiple models",
    ],
  },
  {
    title: "Voice Logger",
    image: "https://images.unsplash.com/photo-1468676071023-862eef0c2b52?fit=crop&w=400&q=80",
    price: "",
    tag: "Accessory",
    tagColor: "bg-orange-500 text-white",
    description: "Voice logger devices for recording and archiving calls.",
    features: [
      "USB/Network Loggers",
      "Bulk call recording",
      "Easy retrieval",
    ],
  },
  {
    title: "Line Card",
    image: "https://images.unsplash.com/photo-1556740767-c43c19d6ef73?fit=crop&w=400&q=80",
    price: "",
    tag: "Accessory",
    tagColor: "bg-orange-600 text-white",
    description: "Expansion line cards for adding extensions and trunk lines.",
    features: [
      "Analog, digital, GSM",
      "Easy installation",
      "Hot swappable",
    ],
  },
  {
    title: "Power Supply",
    image: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?fit=crop&w=400&q=80",
    price: "",
    tag: "Accessory",
    tagColor: "bg-orange-700 text-white",
    description: "Power adapters and UPS for PBX and Intercom systems.",
    features: [
      "Stable output",
      "Battery backup",
      "Compact design",
    ],
  },
  {
    title: "Accessories - View All",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80",
    price: "",
    tag: "View All",
    tagColor: "bg-orange-800 text-white",
    description: "Browse all accessories for EPABX and intercom.",
    features: [
      "Cables, handsets, cards",
      "Full accessories range",
    ],
  },
];

const Epabx = () => {
  return (
    <section className="bg-gradient-to-br from-white via-orange-50 to-yellow-100 min-h-screen">
      {/* HERO / BANNER */}
      <div className="bg-[#ffd300] bg-gradient-to-tr from-yellow-100 via-yellow-50 to-orange-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-14 gap-8">
          <div>
            <span className="text-base uppercase tracking-widest text-yellow-600 font-semibold mb-4 inline-block">
              EPABX & Intercom Provider
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
              Modern <span className="text-yellow-500">EPABX Systems</span> For Every Business
            </h1>
            <p className="text-gray-800 md:text-lg mb-5 max-w-lg">
              Centralized communication, smart call routing, intercom, paging & more. Installation, configuration, and support for offices, apartments, hotels.
            </p>
            <button className="bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold px-4 py-2 rounded-lg shadow-xl transition mb-2 text-sm">
              Get Free Demo
            </button>
            <div className="text-yellow-800 text-xs mt-2">
              <span className="font-black">500+</span> businesses trust us
            </div>
          </div>
          {/* Banner Image */}
          <div className="relative">
            <div className="absolute w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl left-8 top-1/3 -z-10"></div>
            <img
              src="https://res.cloudinary.com/dz4zdzuaj/image/upload/v1778672705/epabx-pbx-hero_vfn9df.png"
              alt="EPABX Service"
              className="w-40 md:w-52 object-contain mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Products Grid - Updated to show all categories as products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <h2 className="text-3xl text-center font-bold mb-2 text-gray-900">EPABX, Intercom & Accessories</h2>
        <p className="text-center mb-10 text-gray-600">
          Find the right solution for your business: Analog & Digital PBX, Intercoms, Accessories and more.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {epabxProducts.map((product) => (
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
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-700 mb-1">{product.title}</h3>
                {/* Price */}
                {product.price && <div className="text-yellow-500 font-extrabold text-xl mb-2">{product.price}</div>}
                {/* Description */}
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                {/* Features */}
                <ul className="mb-3 space-y-1 text-sm text-gray-700">
                  {product.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-yellow-500 font-bold">✔</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {/* Enquire Button */}
                <a
                  href={`/pages/enquiry-form?product=${encodeURIComponent(product.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-md py-1.5 px-3 transition w-full text-sm text-center block"
                >
                  Enquire Now
                </a>
           
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Assurance Section */}
      <div className="bg-white border-t border-yellow-100 py-10">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-10">
          <div className="flex items-center gap-4">
            <span className="bg-yellow-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#facc15" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#facc15" fontFamily="Arial" fontWeight="bold">✓</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Onsite Installation</div>
              <div className="text-gray-500 text-sm">Anywhere in India</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-yellow-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#facc15" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#facc15" fontFamily="Arial" fontWeight="bold">₹</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Transparent Pricing</div>
              <div className="text-gray-500 text-sm">No hidden charges</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-yellow-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#facc15" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#facc15" fontFamily="Arial" fontWeight="bold">🕑</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Service Warranty</div>
              <div className="text-gray-500 text-sm">Priority tech support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Soft Animation (reuse) */}
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

export default Epabx;