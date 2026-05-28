import React, { useState } from "react";

const networkingCategories = [
  {
    name: "Switches",
    items: [
      {
        title: "PoE Switch",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        tag: "Power & Data",
        tagColor: "bg-blue-600 text-white",
        description:
          "Power cameras and wireless devices using a single Ethernet cable.",
      },

      {
        title: "Managed Switch",
        image:
          "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
        tag: "Managed",
        tagColor: "bg-green-600 text-white",
        description:
          "Advanced networking switch with VLAN, QoS and monitoring support.",
      },

      {
        title: "Fiber Switch",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        tag: "Fiber",
        tagColor: "bg-cyan-600 text-white",
        description:
          "High-speed fiber backbone switch for enterprise connectivity.",
      },

      {
        title: "Gigabit Switch",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
        tag: "Gigabit",
        tagColor: "bg-yellow-500 text-white",
        description:
          "Reliable gigabit networking switch for homes and offices.",
      },
    ],
  },

  {
    name: "Wireless",
    items: [
      {
        title: "Access Point",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
        tag: "WiFi",
        tagColor: "bg-blue-500 text-white",
        description:
          "Business-grade access points for secure wireless networking.",
      },

      {
        title: "Outdoor CPE",
        image:
          "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop",
        tag: "Outdoor",
        tagColor: "bg-green-500 text-white",
        description:
          "Outdoor wireless bridge for long-range connectivity solutions.",
      },

      {
        title: "Mesh WiFi",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
        tag: "Mesh",
        tagColor: "bg-indigo-500 text-white",
        description:
          "Whole-home seamless WiFi coverage with mesh technology.",
      },

      {
        title: "Range Extender",
        image:
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
        tag: "Coverage",
        tagColor: "bg-purple-500 text-white",
        description:
          "Boost weak WiFi signals and eliminate dead zones easily.",
      },
    ],
  },

  {
    name: "Storage",
    items: [
      {
        title: "Surveillance HDD",
        image:
          "https://images.unsplash.com/photo-1519121783345-dc7f3c7ae07d?q=80&w=1200&auto=format&fit=crop",
        tag: "24/7 Storage",
        tagColor: "bg-teal-600 text-white",
        description:
          "Specialized surveillance hard drives for DVR and NVR systems.",
      },

      {
        title: "SSD",
        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
        tag: "Fast Speed",
        tagColor: "bg-blue-600 text-white",
        description:
          "High-speed SSD storage for rapid performance and reliability.",
      },

      {
        title: "NAS Storage",
        image:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
        tag: "NAS",
        tagColor: "bg-gray-700 text-white",
        description:
          "Centralized network attached storage for backup and file sharing.",
      },

      {
        title: "External Drive",
        image:
          "https://images.unsplash.com/photo-1475666675596-cca2035b3f49?q=80&w=1200&auto=format&fit=crop",
        tag: "Portable",
        tagColor: "bg-orange-500 text-white",
        description:
          "Portable external drives for backup and additional storage.",
      },
    ],
  },

  {
    name: "Networking Accessories",
    items: [
      {
        title: "Cat6 Cable",
        image:
          "https://images.unsplash.com/photo-1475666675596-cca2035b3f49?q=80&w=1200&auto=format&fit=crop",
        tag: "Ethernet",
        tagColor: "bg-green-600 text-white",
        description:
          "Premium Cat6 cables for high-speed network connectivity.",
      },

      {
        title: "Patch Panel",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        tag: "Structured",
        tagColor: "bg-teal-600 text-white",
        description:
          "Organize and manage network connections with patch panels.",
      },

      {
        title: "Fiber Cable",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        tag: "Fiber",
        tagColor: "bg-blue-600 text-white",
        description:
          "Fiber optic cable for high-speed long-distance networking.",
      },

      {
        title: "Network Rack",
        image:
          "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
        tag: "Rack",
        tagColor: "bg-gray-800 text-white",
        description:
          "Professional server and networking racks for clean installations.",
      },
    ],
  },
];

const filterTabs = networkingCategories.map(c => c.name);

const NetworkingSolutions = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  // Merge all items with category for easy product listing under 'All'
  const allProducts = networkingCategories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.name }))
  );

  const displayedCategories =
    selectedTab === "All"
      ? [
          {
            name: "All",
            items: allProducts,
          },
        ]
      : networkingCategories.filter((cat) => cat.name === selectedTab);

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100">
      {/* HERO */}
      <div className="bg-gradient-to-r from-red-800 via-red-600 to-red-500">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* LEFT */}
          <div className="max-w-xl">
            <span className="inline-block mb-4 text-red-300 uppercase tracking-widest font-semibold">
              Networking Solutions
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              Smart Office &
              <span className="text-red-300"> Enterprise Networking</span>
            </h1>

            <p className="text-red-100 text-lg mb-6">
              Complete networking solutions including switching,
              wireless connectivity, structured cabling and storage.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:from-red-700 hover:via-red-600 hover:to-red-500 transition-all duration-300 text-white px-4 py-2 rounded-xl font-semibold shadow-lg text-sm">
                Get Free Survey
              </button>

              <button className="border border-white text-white bg-gradient-to-r from-red-400 via-red-200 to-red-100 hover:bg-white hover:text-red-800 transition-all duration-300 px-4 py-2 rounded-xl font-semibold text-sm">
                Explore Products
              </button>
            </div>

            <div className="mt-6 text-red-200 font-semibold">
              2000+ Networks Installed
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 rounded-full"></div>

            <img
              src="https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1779280601/ChatGPT_Image_May_20_2026_06_06_23_PM_lrrgmq.png"
              alt="Networking"
              className="relative w-[320px] md:w-[450px] rounded-3xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-3">
          Networking Products
        </h2>

        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore enterprise networking devices and accessories for
          offices, campuses and businesses.
        </p>

        {/* FILTER TABS */}
        <div className="flex justify-center mb-12 flex-wrap gap-4">
          <button
            className={`px-3 py-1.5 rounded-full font-semibold border transition text-sm ${
              selectedTab === "All"
                ? "bg-gradient-to-r from-red-600 to-red-400 text-white border-red-600 shadow"
                : "bg-white text-red-700 border-red-200 hover:bg-red-100"
            }`}
            onClick={() => setSelectedTab("All")}
          >
            All
          </button>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              className={`px-3 py-1.5 rounded-full font-semibold border transition text-sm ${
                selectedTab === tab
                  ? "bg-gradient-to-r from-red-600 to-red-400 text-white border-red-600 shadow"
                  : "bg-white text-red-700 border-red-200 hover:bg-red-100"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {displayedCategories.map((category) => (
          <div key={category.name} className="mb-16">
            {/* CATEGORY TITLE */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-900">
                {category.name === "All" ? "All Products" : category.name}
              </h3>
              {/* Hide View All on "All" tab */}
              {category.name !== "All" && (
                <button className="text-red-600 hover:text-red-800 font-semibold text-sm">
                  View All →
                </button>
              )}
            </div>

            {/* GRID */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {category.items.map((item, idx) => (
                <div
                  key={item.title + idx}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
                >
                  {/* IMAGE */}
                  <div className="relative h-60 bg-gray-100 overflow-hidden">
                    <span
                      className={`absolute top-4 right-4 z-10 text-xs font-bold px-3 py-1 rounded-full ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 flex flex-col h-[230px]">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                      {item.description}
                    </p>

                    <a
                      href={`/pages/enquiry-form?product=${encodeURIComponent(item.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full rounded-xl bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-600 transition-all duration-300 text-white py-2 font-semibold shadow-md hover:shadow-xl text-center block text-sm"
                    >
                      Enquire Now
                    </a>
               
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-8">
          <div className="bg-red-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">🌐</div>

            <h3 className="text-xl font-bold mb-2">
              Professional Installation
            </h3>

            <p className="text-gray-600">
              Structured networking and installation by expert engineers.
            </p>
          </div>

          <div className="bg-red-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">💰</div>

            <h3 className="text-xl font-bold mb-2">
              Affordable Pricing
            </h3>

            <p className="text-gray-600">
              Best networking solutions at transparent pricing.
            </p>
          </div>

          <div className="bg-red-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">🛠️</div>

            <h3 className="text-xl font-bold mb-2">
              Support & Warranty
            </h3>

            <p className="text-gray-600">
              Dedicated support and enterprise-grade warranty service.
            </p>
          </div>
        </div>
      </div>

      {/* STYLE */}
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

export default NetworkingSolutions;