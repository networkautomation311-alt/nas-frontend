import React from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Headphones,
  ShieldCheck,
  Cpu,
  Clock3,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const supportServices = [
  {
    title: "Remote Diagnostics",
    icon: <Cpu size={34} />,
    description:
      "Secure real-time troubleshooting and diagnostics for CCTV, networking, automation, and IT systems.",
  },
  {
    title: "Software & Configuration Support",
    icon: <ShieldCheck size={34} />,
    description:
      "Remote software updates, configuration changes, and optimization without on-site delays.",
  },
  {
    title: "24/7 Technical Assistance",
    icon: <Headphones size={34} />,
    description:
      "Round-the-clock expert support from certified engineers for rapid issue resolution.",
  },
];

const benefits = [
  "Reduce downtime and operational costs",
  "Instant remote troubleshooting support",
  "Secure remote access solutions",
  "Fast issue detection & resolution",
  "Cross-platform IT & security support",
  "Reliable monitoring and maintenance",
];

const OffshoreSupport = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-red-700 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-widest text-red-300 font-semibold mb-4">
              Offshore Remote Support
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Secure Remote Support & Monitoring Solutions
            </h1>

            <p className="text-gray-200 text-lg leading-relaxed mb-8">
              Get professional offshore remote support for CCTV, networking,
              automation, and IT systems with secure access, real-time
              diagnostics, and 24/7 technical assistance.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop"
              alt="Offshore Support"
              className="rounded-3xl shadow-2xl h-[450px] w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 bg-white text-gray-900 px-5 py-4 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-red-600">24/7</h3>
              <p className="text-sm font-medium">Remote Assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What We Offer
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Reliable offshore remote support solutions designed to minimize
              downtime and maximize system performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportServices.map((service, index) => (
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

      {/* Benefits Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop"
              alt="Remote Monitoring"
              className="rounded-3xl shadow-2xl"
            />
          </div>

          <div>
            <p className="text-red-600 font-semibold uppercase tracking-widest mb-3">
              Why Choose Our Support
            </p>

            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Expert Remote Assistance Anytime, Anywhere
            </h2>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
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

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <div className="flex justify-center mb-5">
            <Globe size={50} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need Instant Remote Technical Support?
          </h2>

          <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
            Connect with our certified engineers for secure offshore remote
            support, monitoring, diagnostics, and system management services.
          </p>

          <Link
            to="/components/enquiry"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition"
          >
            Enable Remote Support
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OffshoreSupport;