import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Wrench,
  Clock3,
  FileCheck,
  Headphones,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const amcPlans = [
  {
    title: "Comprehensive AMC",
    icon: <ShieldCheck size={34} />,
    description:
      "Includes complete maintenance support with replacement of faulty parts, repairs, and labor charges.",
  },
  {
    title: "Non-Comprehensive AMC",
    icon: <Wrench size={34} />,
    description:
      "Covers service and labor charges while spare parts are billed separately as per actual usage.",
  },
  {
    title: "Custom AMC Plans",
    icon: <FileCheck size={34} />,
    description:
      "Tailored AMC solutions designed according to your business size, infrastructure, and requirements.",
  },
];

const amcBenefits = [
  "Regular preventive maintenance visits",
  "Quick response & issue resolution",
  "Priority remote & on-site support",
  "Detailed maintenance reports",
  "Experienced & certified engineers",
  "Long-term system reliability",
];

const coveredSystems = [
  "CCTV surveillance systems",
  "Biometric & access control devices",
  "Fire alarm & safety systems",
  "WiFi, routers & networking devices",
  "Video door phones & smart locks",
  "Home & office automation systems",
];

const AmcServices = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-red-700 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-widest text-red-300 font-semibold mb-4">
              Annual Maintenance Contract
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              AMC Services For Complete Peace Of Mind
            </h1>

            <p className="text-gray-200 text-lg leading-relaxed mb-8">
              Protect your security and networking infrastructure with reliable
              AMC plans including preventive maintenance, priority support, and
              expert technical assistance.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://res.cloudinary.com/dz4zdzuaj/image/upload/v1778667068/ChatGPT_Image_May_13_2026_03_40_52_PM_lvunhc.png"
              alt="AMC Services"
              className="rounded-3xl shadow-2xl h-[450px] w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 bg-white text-gray-900 px-5 py-4 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-red-600">365</h3>
              <p className="text-sm font-medium">Days Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* AMC Plans */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              AMC Plans We Offer
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Flexible annual maintenance plans designed for homes, offices,
              industries, and commercial installations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {amcPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:border-red-500 hover:-translate-y-2 transition duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-6">
                  {plan.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {plan.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {plan.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop"
              alt="AMC Support"
              className="rounded-3xl shadow-2xl"
            />
          </div>

          <div>
            <p className="text-red-600 font-semibold uppercase tracking-widest mb-3">
              Why Choose Our AMC
            </p>

            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Reliable Support Throughout The Year
            </h2>

            <div className="space-y-4">
              {amcBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5"
                >
                  <div className="text-red-600">
                    <CheckCircle size={24} />
                  </div>

                  <p className="text-gray-700 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Covered Systems */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-600 font-semibold uppercase tracking-widest mb-3">
              Covered Systems
            </p>

            <h2 className="text-4xl font-bold text-gray-800">
              Systems Included In AMC Support
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coveredSystems.map((system, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <Headphones size={22} />
                </div>

                <p className="text-gray-700 font-medium">{system}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <div className="flex justify-center mb-5">
            <Clock3 size={50} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Secure Your Systems With AMC Support
          </h2>

          <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
            Get preventive maintenance, quick technical support, and complete
            peace of mind with our professional AMC services.
          </p>

          <Link
            to="/pages/contact"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition"
          >
            Request AMC Quote
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AmcServices;