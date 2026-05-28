import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Camera,
  Wifi,
  Lock,
  Building2,
  Flame,
  ArrowRight,
} from "lucide-react";

const InstallationServices = () => {
  const installations = [
    {
      icon: <Camera size={32} />,
      title: "CCTV Surveillance",
      desc: "High-quality CCTV camera installation with remote monitoring and secure surveillance setup.",
    },
    {
      icon: <Lock size={32} />,
      title: "Access Control",
      desc: "Biometric attendance systems, access control, and smart locking solutions.",
    },
    {
      icon: <Building2 size={32} />,
      title: "EPABX & Intercom",
      desc: "Professional office communication systems with EPABX and intercom installation.",
    },
    {
      icon: <Wifi size={32} />,
      title: "Networking Setup",
      desc: "Complete WiFi, LAN networking, structured cabling, and internet setup services.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Automation Systems",
      desc: "Smart home and office automation solutions for better security and convenience.",
    },
    {
      icon: <Flame size={32} />,
      title: "Fire Alarm Systems",
      desc: "Reliable fire alarm and emergency alert system installation for safety compliance.",
    },
  ];

  const features = [
    "Certified & experienced engineers",
    "Site survey & project planning",
    "Professional cable management",
    "Device setup & configuration",
    "Customer guidance & training",
    "After-installation support",
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-red-700 text-white py-14 px-2 sm:py-20 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <p className="uppercase tracking-widest text-red-300 font-semibold mb-3 sm:mb-4 text-xs sm:text-base">
              Professional Installation Services
            </p>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6">
              Smart Security & Installation Solutions
            </h1>

            <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              We provide expert installation services for CCTV surveillance,
              networking, automation, access control, and complete security
              systems for homes and businesses.
            </p>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <img
              src="https://res.cloudinary.com/dz4zdzuaj/image/upload/v1778667207/ChatGPT_Image_May_13_2026_03_43_15_PM_iym63u.png"
              alt="Installation Services"
              className="rounded-3xl shadow-2xl w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[450px] object-cover object-center"
            />

            <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 bg-white text-gray-900 px-3 py-2 sm:px-5 sm:py-4 rounded-2xl shadow-xl">
              <h3 className="text-lg sm:text-2xl font-bold text-red-600">30+</h3>
              <p className="text-xs sm:text-sm font-medium">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-10 sm:py-20 px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              What We Install
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
              Professional installation and setup services with modern
              technology, expert engineers, and reliable support.
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {installations.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8 border border-gray-100 hover:border-red-500 hover:-translate-y-1 sm:hover:-translate-y-2 transition duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-5 sm:mb-6 mx-auto sm:mx-0">
                  {item.icon}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 text-center sm:text-left">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-center sm:text-left">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-10 sm:py-20 px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="mb-8 lg:mb-0">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop"
              alt="Professional Team"
              className="rounded-3xl shadow-2xl w-full h-[200px] sm:h-[320px] md:h-[400px] lg:h-[450px] object-cover object-center"
            />
          </div>

          <div>
            <p className="text-red-600 font-semibold uppercase tracking-widest mb-2 sm:mb-3 text-xs sm:text-base">
              Why Choose Us
            </p>

            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              Trusted Experts For Every Installation Project
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 sm:gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-base sm:text-lg">
                    ✓
                  </div>

                  <p className="text-gray-700 font-medium text-sm sm:text-base">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-20 px-2 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-red-600 to-red-700 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-2xl md:text-5xl font-bold mb-4 sm:mb-6">
            Need Professional Installation Services?
          </h2>

          <p className="text-base sm:text-lg text-red-100 max-w-2xl mx-auto mb-6 sm:mb-8">
            Contact our expert team today for CCTV installation, networking,
            automation, and complete security solutions.
          </p>

          <Link
            to="/pages/contact"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold hover:bg-gray-100 transition text-base sm:text-lg"
          >
            Request Free Quote
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default InstallationServices;