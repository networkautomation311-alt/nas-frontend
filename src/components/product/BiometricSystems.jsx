import React, { useState } from "react";

const biometricCategories = [
  {
    category: "Fingerprint",
    items: [
      {
        title: "Attendance Machine",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        price: "₹2,799 onwards",
        tag: "Fast Setup",
        tagColor: "bg-orange-500 text-white",
        description:
          "Fingerprint attendance devices for office and shop management.",
        features: ["Cloud reports", "Mobile app", "Easy export"],
      },
      {
        title: "Standalone Device",
        image:
          "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
        price: "₹3,699 onwards",
        tag: "Standalone",
        tagColor: "bg-indigo-600 text-white",
        description:
          "Plug and play fingerprint terminal with offline support.",
        features: ["No PC required", "Offline mode", "Fast syncing"],
      },
      {
        title: "Reader Terminal",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        price: "₹4,500 onwards",
        tag: "Professional",
        tagColor: "bg-blue-600 text-white",
        description:
          "Advanced fingerprint reader terminal for secure access.",
        features: ["SDK support", "LCD display", "LAN support"],
      },
      {
        title: "Multi-Bio System",
        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
        price: "₹8,700 onwards",
        tag: "Hybrid",
        tagColor: "bg-teal-600 text-white",
        description:
          "Face + Finger + RFID verification system with AI support.",
        features: ["Multi verification", "Cloud sync", "Large storage"],
      },
    ],
  },
  {
    category: "Face Recognition",
    items: [
      {
        title: "Face Terminal",
        image:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
        price: "₹5,499 onwards",
        tag: "Touchless",
        tagColor: "bg-blue-600 text-white",
        description:
          "AI powered touchless face recognition attendance machine.",
        features: ["Mask detection", "Fast unlock", "AI face scan"],
      },
      {
        title: "Access Device",
        image:
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
        price: "₹7,700 onwards",
        tag: "Secure Entry",
        tagColor: "bg-green-600 text-white",
        description:
          "Face recognition access control device for offices.",
        features: ["Anti spoofing", "Door control", "Live alerts"],
      },
      {
        title: "Hybrid Model",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
        price: "₹9,499 onwards",
        tag: "3-in-1",
        tagColor: "bg-pink-600 text-white",
        description:
          "Hybrid face, card and fingerprint verification system.",
        features: ["Cloud sync", "RFID support", "AI attendance"],
      },
      {
        title: "AI Attendance",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
        price: "₹13,200 onwards",
        tag: "Smart AI",
        tagColor: "bg-purple-600 text-white",
        description:
          "Fully automated AI attendance system with smart analytics.",
        features: ["Real time", "Geo enabled", "Cloud dashboard"],
      },
    ],
  },
  {
    category: "Access Control",
    items: [
      {
        title: "RFID Reader",
        image:
          "https://images.unsplash.com/photo-1457301547464-91995555cd23?q=80&w=1200&auto=format&fit=crop",
        price: "₹1,999 onwards",
        tag: "RFID",
        tagColor: "bg-lime-600 text-white",
        description:
          "RFID access control readers for fast office entry.",
        features: ["Long life", "Easy install", "Fast scan"],
      },
      {
        title: "Door Lock",
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1200&auto=format&fit=crop",
        price: "₹2,499 onwards",
        tag: "Smart Lock",
        tagColor: "bg-yellow-500 text-white",
        description:
          "Smart electromagnetic door lock for biometric systems.",
        features: ["Remote release", "Heavy duty", "Fail safe"],
      },
      {
        title: "Controller",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
        price: "₹6,200 onwards",
        tag: "Controller",
        tagColor: "bg-blue-800 text-white",
        description:
          "Centralized controller for multiple door access systems.",
        features: ["Cloud access", "Multi door", "Large storage"],
      },
      {
        title: "Biometric Panel",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        price: "₹7,900 onwards",
        tag: "Panel",
        tagColor: "bg-orange-600 text-white",
        description:
          "Central biometric panel with alarm and backup support.",
        features: ["Power backup", "Alarm support", "Fast response"],
      },
    ],
  },
  {
    category: "Accessories",
    items: [
      {
        title: "RFID Cards",
        image:
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
        price: "₹25 onwards",
        tag: "RFID",
        tagColor: "bg-blue-500 text-white",
        description:
          "RFID cards for attendance and access management systems.",
        features: ["Bulk order", "Fast print", "Custom branding"],
      },
      {
        title: "Power Supply",
        image:
          "https://images.unsplash.com/photo-1519121783345-dc7f3c7ae07d?q=80&w=1200&auto=format&fit=crop",
        price: "₹399 onwards",
        tag: "Power",
        tagColor: "bg-cyan-600 text-white",
        description:
          "Reliable power supply units for biometric devices.",
        features: ["Voltage protection", "Long life", "Compact"],
      },
      {
        title: "Exit Switch",
        image:
          "https://images.unsplash.com/photo-1449247613801-ab06418e2861?q=80&w=1200&auto=format&fit=crop",
        price: "₹120 onwards",
        tag: "Exit",
        tagColor: "bg-yellow-500 text-white",
        description:
          "Push exit switches for controlled door access systems.",
        features: ["Universal support", "Easy install", "Durable"],
      },
      {
        title: "Mount Box",
        image:
          "https://images.unsplash.com/photo-1457301547464-91995555cd23?q=80&w=1200&auto=format&fit=crop",
        price: "₹99 onwards",
        tag: "Mount",
        tagColor: "bg-slate-700 text-white",
        description:
          "Mounting boxes for biometric devices and clean wiring.",
        features: ["Weatherproof", "Metal body", "Easy fit"],
      },
    ],
  },
];

// All products ek saath
const allProducts = biometricCategories.flatMap((cat) => cat.items);

const tabs = [
  { category: "All" },
  ...biometricCategories.map((cat) => ({ category: cat.category })),
];

// ENQUIRY_LINK sahi hai
const ENQUIRY_LINK = "/pages/enquiry-form";

const BiometricSystems = () => {
  const [active, setActive] = useState(0);

  // Kisi bhi tab pe click karte products dikhaye
  const productsToDisplay =
    active === 0
      ? allProducts
      : biometricCategories[active - 1].items;

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100">
      {/* HERO */}
      <div className="bg-[#081a33]">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* LEFT */}
          <div className="max-w-xl">
            <span className="inline-block mb-4 text-cyan-400 uppercase tracking-widest font-semibold">
              Biometric Security Solutions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              Smart Attendance &
              <span className="text-cyan-400"> Access Control</span>
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Modern biometric attendance and access control systems
              with AI recognition and secure office management.
            </p>
            <div className="flex flex-wrap gap-4">
              {/* Demo button */}
              <button className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:to-red-800 transition-all duration-300 text-white px-4 py-2 rounded-lg font-semibold shadow-lg text-sm">
                Get Free Demo
              </button>
              <button className="border border-white text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:to-red-800 hover:text-black transition-all duration-300 px-4 py-2 rounded-lg font-semibold text-sm">
                Explore Products
              </button>
            </div>
            <div className="mt-6 text-cyan-300 font-semibold">
              Trusted By 1000+ Businesses
            </div>
          </div>
          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 rounded-full"></div>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              alt="Biometric"
              className="relative w-[320px] md:w-[450px] rounded-3xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      </div>

      {/* SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-3">
          Biometric Products
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Choose advanced biometric systems for attendance,
          security and access management.
        </p>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tabs.map((tab, index) => (
            <button
              key={tab.category}
              onClick={() => setActive(index)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                active === index
                  ? "bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-red-100 hover:to-red-200 shadow"
              }`}
            >
              {tab.category}
            </button>
          ))}
        </div>
        {/* PRODUCTS */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {productsToDisplay.map((product) => (
            <div
              key={product.title}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
            >
              {/* IMAGE */}
              <div className="relative h-60 bg-gray-100 overflow-hidden">
                <span
                  className={`absolute top-4 right-4 z-10 text-xs font-bold px-3 py-1 rounded-full ${product.tagColor}`}
                >
                  {product.tag}
                </span>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {/* CONTENT */}
              <div className="p-5 flex flex-col h-[320px]">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <div className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                  {product.price}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {product.description}
                </p>
                <ul className="space-y-2 mb-5">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="text-cyan-600 font-bold">✔</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={
                    ENQUIRY_LINK +
                    encodeURIComponent(
                      ` I am interested in: ${product.title}`
                    )
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full rounded-xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:to-red-800 transition-all duration-300 text-white py-2 font-semibold shadow-md hover:shadow-xl text-sm text-center block"
                >
                  Enquire Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRUST SECTION */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-8">
          <div className="bg-cyan-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-xl font-bold mb-2">Installation Support</h3>
            <p className="text-gray-600">
              Professional biometric installation service across India.
            </p>
          </div>
          <div className="bg-red-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Affordable Pricing</h3>
            <p className="text-gray-600">
              Transparent pricing with no hidden charges.
            </p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-bold mb-2">Technical Support</h3>
            <p className="text-gray-600">
              Dedicated support and maintenance assistance.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BiometricSystems;