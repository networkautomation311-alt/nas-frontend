import React, { useState } from "react";

const cctvCategories = [
  {
    name: "IP Cameras",
    products: [
      {
        title: "2MP IP Bullet",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        price: "₹3,200 onwards",
        tag: "IP Bullet",
        tagColor: "bg-blue-600 text-white",
        description:
          "High resolution weatherproof bullet IP camera for outdoor security.",
        features: ["2MP clarity", "PoE support", "Remote viewing"],
      },
      {
        title: "4MP Dome Camera",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
        price: "₹4,299 onwards",
        tag: "Smart Dome",
        tagColor: "bg-green-600 text-white",
        description:
          "Crystal clear indoor dome camera with smart infrared support.",
        features: ["4MP HD", "Wide angle", "Night vision"],
      },
      {
        title: "PTZ Camera",
        image:
          "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?q=80&w=1200&auto=format&fit=crop",
        price: "₹8,499 onwards",
        tag: "PTZ Camera",
        tagColor: "bg-pink-600 text-white",
        description:
          "Advanced PTZ camera with motion tracking and optical zoom.",
        features: ["20x zoom", "360° rotation", "Motion tracking"],
      },
      {
        title: "Fisheye Camera",
        image:
          "https://images.unsplash.com/photo-1563299796-2b93b6dfb58e?q=80&w=1200&auto=format&fit=crop",
        price: "₹6,000 onwards",
        tag: "360° View",
        tagColor: "bg-orange-500 text-white",
        description:
          "Panoramic fisheye camera for full area surveillance coverage.",
        features: ["360° coverage", "Smart IR", "Two-way audio"],
      },
    ],
  },

  {
    name: "Analog Cameras",
    products: [
      {
        title: "HD Bullet Camera",
        image:
          "https://images.unsplash.com/photo-1519121783345-dc7f3c7ae07d?q=80&w=1200&auto=format&fit=crop",
        price: "₹1,299 onwards",
        tag: "HD Bullet",
        tagColor: "bg-blue-500 text-white",
        description:
          "Affordable HD bullet camera with weatherproof design.",
        features: ["HD clarity", "Night vision", "Outdoor use"],
      },
      {
        title: "HD Dome Camera",
        image:
          "https://images.unsplash.com/photo-1475666675596-cca2035b3f49?q=80&w=1200&auto=format&fit=crop",
        price: "₹1,499 onwards",
        tag: "HD Dome",
        tagColor: "bg-green-500 text-white",
        description:
          "Stylish dome camera for office and home security systems.",
        features: ["Ceiling mount", "HD video", "Wide angle"],
      },
      {
        title: "AHD Camera",
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1200&auto=format&fit=crop",
        price: "₹1,699 onwards",
        tag: "AHD",
        tagColor: "bg-yellow-500 text-white",
        description:
          "Advanced HD analog camera with improved video quality.",
        features: ["Day/Night mode", "Strong body", "AHD support"],
      },
      {
        title: "Analog PTZ",
        image:
          "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?q=80&w=1200&auto=format&fit=crop",
        price: "₹5,499 onwards",
        tag: "PTZ",
        tagColor: "bg-pink-600 text-white",
        description:
          "Flexible PTZ analog camera for large area monitoring.",
        features: ["PTZ movement", "Long IR", "Preset control"],
      },
    ],
  },

  {
    name: "Recorders",
    products: [
      {
        title: "4CH NVR",
        image:
          "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1200&auto=format&fit=crop",
        price: "₹5,999 onwards",
        tag: "4 Channel",
        tagColor: "bg-cyan-600 text-white",
        description:
          "Reliable NVR for IP cameras with cloud access support.",
        features: ["Cloud storage", "4 channel", "Mobile access"],
      },
      {
        title: "8CH DVR",
        image:
          "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
        price: "₹6,499 onwards",
        tag: "8 Channel",
        tagColor: "bg-yellow-500 text-white",
        description:
          "Popular DVR system for shops, offices, and homes.",
        features: ["8 channels", "Motion alerts", "Remote app"],
      },
      {
        title: "Hybrid DVR",
        image:
          "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
        price: "₹7,200 onwards",
        tag: "Hybrid",
        tagColor: "bg-blue-600 text-white",
        description:
          "Supports both analog and IP camera systems together.",
        features: ["IP + Analog", "HDD support", "Remote viewing"],
      },
      {
        title: "Cloud Recorder",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        price: "₹8,000 onwards",
        tag: "Cloud",
        tagColor: "bg-pink-600 text-white",
        description:
          "Secure cloud recording system with encrypted storage.",
        features: ["24/7 backup", "Encrypted", "Fast playback"],
      },
    ],
  },

  {
    name: "Accessories",
    products: [
      {
        title: "Power Supply",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
        price: "₹399 onwards",
        tag: "Power",
        tagColor: "bg-blue-600 text-white",
        description:
          "Reliable CCTV power supply and SMPS solutions.",
        features: ["Stable voltage", "Safety protection", "Long life"],
      },
      {
        title: "CCTV Cable",
        image:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
        price: "₹19/m onwards",
        tag: "Cable",
        tagColor: "bg-green-600 text-white",
        description:
          "Premium quality CCTV cables with copper core.",
        features: ["Flexible", "Copper core", "Long distance"],
      },
      {
        title: "Connectors",
        image:
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
        price: "₹15 onwards",
        tag: "Connector",
        tagColor: "bg-yellow-500 text-white",
        description:
          "All CCTV connectors including BNC and RJ45.",
        features: ["Easy install", "Durable", "Universal support"],
      },
      {
        title: "Mounting Kits",
        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
        price: "₹99 onwards",
        tag: "Mount",
        tagColor: "bg-cyan-600 text-white",
        description:
          "Strong mounting brackets for CCTV installation.",
        features: ["Rustproof", "Strong grip", "Indoor/outdoor"],
      },
    ],
  },
];

const CCTVSurveillance = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // All products for "All"
  const allProducts = cctvCategories.flatMap((cat) =>
    cat.products.map((p) => ({
      ...p,
      category: cat.name,
    }))
  );

  // Current category products
  const showProducts =
    activeCategory === "All"
      ? allProducts
      : cctvCategories
          .find((cat) => cat.name === activeCategory)
          ?.products.map((p) => ({ ...p, category: activeCategory })) || [];

  // For title of current section
  const currentCategoryLabel =
    activeCategory === "All" ? "All Products" : activeCategory;

  // Set your enquiry link here
  const enquiryLink = "/pages/enquiry-form"; // Replace with your desired link

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100">
      {/* HERO SECTION */}
      <div className="bg-[#081a33]">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <span className="inline-block mb-4 text-yellow-400 uppercase tracking-widest font-semibold">
              CCTV Security Solutions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              Secure Your Home & Office With
              <span className="text-yellow-400"> Smart CCTV</span>
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Complete CCTV surveillance systems with installation,
              monitoring, remote viewing and 24/7 support services.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all duration-300 text-white px-4 py-2 rounded-lg font-semibold shadow-lg text-sm">
                Get Free Demo
              </button>
              <button className="border border-white text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg font-semibold text-sm">
                Explore Products
              </button>
            </div>
            <div className="mt-6 text-yellow-300 font-semibold">
              5000+ Installations Completed
            </div>
          </div>
          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
              alt="CCTV"
              className="relative w-[320px] md:w-[450px] rounded-3xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            key="All"
            className={`${
              activeCategory === "All"
                ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-xl"
                : "bg-white text-gray-700 shadow-md hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:text-white"
            } transition-all duration-300 px-3 py-1.5 rounded-full font-semibold text-sm`}
            onClick={() => setActiveCategory("All")}
            type="button"
          >
            All
          </button>
          {cctvCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`${
                activeCategory === category.name
                  ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-xl"
                  : "bg-white text-gray-700 shadow-md hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:text-white"
              } transition-all duration-300 px-3 py-1.5 rounded-full font-semibold text-sm`}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS of ACTIVE CATEGORY (ALL) */}
      <section
        key={activeCategory}
        id={activeCategory.replace(/\s/g, "")}
        className="max-w-7xl mx-auto px-4 py-10"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {currentCategoryLabel}
          </h2>
          <button className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 font-semibold text-white text-sm px-2 py-1 rounded transition-all duration-300">
            View All →
          </button>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {showProducts.map((product) => (
            <div
              key={product.title + product.category}
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
                <div className="text-2xl font-extrabold text-yellow-600 mb-3">
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
                      <span className="text-blue-600 font-bold">✔</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={enquiryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full rounded-xl bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all duration-300 text-white py-2 font-semibold shadow-md hover:shadow-xl text-sm text-center block"
                >
                  Enquire Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST SECTION */}
      <div className="bg-white mt-10 border-t">
        <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-xl font-bold mb-2">
              Professional Installation
            </h3>
            <p className="text-gray-600">
              Expert CCTV installation services by trained technicians.
            </p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">
              Affordable Pricing
            </h3>
            <p className="text-gray-600">
              Best CCTV solutions at transparent and competitive prices.
            </p>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-bold mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Dedicated customer support and warranty assistance anytime.
            </p>
          </div>
        </div>
      </div>

      {/* CUSTOM CSS */}
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

export default CCTVSurveillance;