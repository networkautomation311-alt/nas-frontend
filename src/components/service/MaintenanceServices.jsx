import React from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  ShieldCheck,
  Cpu,
  Activity,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const maintenanceServices = [
  {
    title: "Routine System Servicing",
    icon: <Wrench size={34} />,
    description:
      "Regular inspection and maintenance of CCTV, networking, automation, and security systems.",
  },
  {
    title: "Software & Firmware Updates",
    icon: <Cpu size={34} />,
    description:
      "Keep your devices secure and optimized with firmware updates, patches, and system upgrades.",
  },
  {
    title: "Emergency Breakdown Support",
    icon: <ShieldCheck size={34} />,
    description:
      "Fast-response technical support and repair services to reduce downtime and restore operations quickly.",
  },
  {
    title: "Performance Optimization",
    icon: <Activity size={34} />,
    description:
      "Improve reliability and efficiency with system diagnostics, cable checks, and optimization.",
  },
];

const benefits = [
  "Reduce unexpected system failures",
  "Increase equipment lifespan",
  "Maintain security & performance",
  "Priority technical support",
  "Professional inspection reports",
  "Reliable and expert maintenance team",
];

const MaintenanceServices = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-red-700 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-widest text-red-300 font-semibold mb-4">
              Professional Maintenance Services
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Reliable Maintenance & Support Solutions
            </h1>

            <p className="text-gray-200 text-lg leading-relaxed mb-8">
              Ensure uninterrupted performance with preventive maintenance,
              emergency repairs, software updates, and expert technical support
              for all your security and networking systems.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://res.cloudinary.com/dz4zdzuaj/image/upload/v1778667463/ChatGPT_Image_May_13_2026_03_47_32_PM_zwadha.png"
              alt="Maintenance Services"
              className="rounded-3xl shadow-2xl w-full h-[250px] sm:h-[350px] md:h-[450px] object-center object-contain md:object-cover"
              style={{
                maxHeight: "450px",
                minHeight: "180px",
                width: "100%",
              }}
            />

            <div className="absolute bottom-5 left-5 bg-white text-gray-900 px-5 py-4 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-red-600">24/7</h3>
              <p className="text-sm font-medium">Technical Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Maintenance Services
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Comprehensive maintenance solutions to keep your systems secure,
              updated, and performing at their best.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {maintenanceServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:border-red-500 hover:-translate-y-2 transition duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-6">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Maintenance Matters */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
              alt="Maintenance Team"
              className="rounded-3xl shadow-2xl w-full h-[220px] xs:h-[260px] sm:h-[320px] md:h-[400px] object-center object-contain md:object-cover"
              style={{
                maxHeight: "400px",
                minHeight: "160px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <p className="text-red-600 font-semibold uppercase tracking-widest mb-3">
              Why Maintenance Matters
            </p>

            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Keep Your Systems Running Efficiently
            </h2>

            <div className="space-y-4">
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5"
                >
                  <div className="text-red-600">
                    <CheckCircle size={24} />
                  </div>

                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need Expert Maintenance Support?
          </h2>

          <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
            Schedule preventive maintenance or request emergency technical
            support for your CCTV, networking, automation, and security systems.
          </p>

          <Link
            to="/components/enquiry"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition"
          >
            Book Maintenance Service
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MaintenanceServices;