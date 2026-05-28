// Home automation products with product images, no icons—BiometricSystems style
const automationProducts = [
  {
    title: "Smart Lighting System",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80", // Example lighting device
    price: "₹1,299 onwards",
    tag: "Energy Saver",
    tagColor: "bg-yellow-500 text-white",
    description: "Automate lighting schedules and control every switch with a tap or your voice. Great for homes, offices, and retail.",
    features: [
      "App & voice control",
      "Auto schedules",
      "Low power use"
    ]
  },
  {
    title: "Smart Thermostat",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=400&q=80", // Example thermostat
    price: "₹2,599 onwards",
    tag: "Smart Comfort",
    tagColor: "bg-blue-500 text-white",
    description: "Optimize comfort and save utility costs. Control AC, fans, curtains remotely and automate pesky routines.",
    features: [
      "Remote control",
      "Usage analytics",
      "Works with Alexa/Google"
    ]
  },
  {
    title: "Security Integration Kit",
    image: "https://images.unsplash.com/photo-1536623975707-c4b3b2d1c2b3?fit=crop&w=400&q=80", // Example lock/alarm
    price: "₹3,699 onwards",
    tag: "Peace of Mind",
    tagColor: "bg-red-500 text-white",
    description: "Integrate automation with door locks, sensors, CCTV and alarm—single dashboard for safety at home or work.",
    features: [
      "Live alerts",
      "Unified dashboard",
      "Easy install"
    ]
  },
  {
    title: "Appliance Automation",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?fit=crop&w=400&q=80", // Example automated appliance
    price: "₹1,899 onwards",
    tag: "Modern Living",
    tagColor: "bg-green-500 text-white",
    description: "Automate coffee makers, geysers, fans with timers, schedules or phone. No manual touch required.",
    features: [
      "Remote on/off",
      "Multi-device",
      "No wiring needed"
    ]
  },
];

const HomeAutomation = () => {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-yellow-100 min-h-screen">
      {/* HERO / BANNER */}
      <div className="bg-[#142c53]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-14 gap-8">
          <div>
            <span className="text-base uppercase tracking-widest text-yellow-400 font-semibold mb-4 inline-block">
              Home Automation
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Smart Home & Office <span className="text-yellow-400">Automation Solutions</span>
            </h1>
            <p className="text-gray-200 md:text-lg mb-5 max-w-lg">
              Professional automation for comfort, security, and energy savings—lighting, air conditioning, appliance control, and more. Seamless installation, trained support!
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-xl transition mb-2">
              Get Free Demo
            </button>
            <div className="text-yellow-200 text-xs mt-2">
              <span className="font-black">2000+</span> Indian homes & offices upgraded
            </div>
          </div>
          {/* Banner Image */}
          <div className="relative">
            <div className="absolute w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl left-8 top-1/3 -z-10"></div>
            <img
              src="/images/home-automation/automation-illustration.png"
              alt="Home Automation Service"
              className="w-40 md:w-52 object-contain mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Products Grid - Ecommerce Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <h2 className="text-3xl text-center font-bold mb-2 text-gray-900">Best Home Automation Products</h2>
        <p className="text-center mb-10 text-gray-600">
          Choose, compare and book smart automation with home/office installation available across India.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {automationProducts.map((product) => (
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
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 mb-1">{product.title}</h3>
                {/* Price */}
                <div className="text-yellow-600 font-extrabold text-xl mb-2">{product.price}</div>
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
                <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 px-4 transition w-full">
                  Enquire Now
                </button>
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
              <div className="font-bold text-gray-900 mb-0.5">Professional Setup</div>
              <div className="text-gray-500 text-sm">Anywhere in India</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-yellow-50 rounded-full p-3">
              <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#facc15" strokeWidth="2"/><text x="14" y="19" textAnchor="middle" fontSize="18" fill="#facc15" fontFamily="Arial" fontWeight="bold">₹</text></svg>
            </span>
            <div>
              <div className="font-bold text-gray-900 mb-0.5">Upfront Pricing</div>
              <div className="text-gray-500 text-sm">No surprise costs</div>
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

export default HomeAutomation;