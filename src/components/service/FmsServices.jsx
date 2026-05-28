import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  ShieldCheck,
  Headphones,
  ClipboardCheck,
  CheckCircle,
  ArrowRight,
  Users,
} from "lucide-react";

const fmsServices = [
  {
    title: "Comprehensive Facility Management",
    icon: <Building2 size={34} />,
    description:
      "Integrated management solutions including housekeeping, maintenance, security, pantry, and front office operations.",
  },
  {
    title: "24/7 Operational Support",
    icon: <Headphones size={34} />,
    description:
      "Dedicated support teams and helpdesk services to ensure smooth business operations around the clock.",
  },
  {
    title: "Customized FMS Solutions",
    icon: <ClipboardCheck size={34} />,
    description:
      "Flexible facility management services tailored for offices, industries, institutions, and commercial spaces.",
  },
  {
    title: "Safety & Compliance",
    icon: <ShieldCheck size={34} />,
    description:
      "Strict adherence to safety, environmental, and compliance standards for secure workplace management.",
  },
];

const benefits = [
  "Single-window facility management solutions",
  "Improved employee productivity",
  "Cost-effective operational management",
  "Professional maintenance & support",
  "Safety and compliance assurance",
  "Customized reporting & checklists",
];

const FmsServices = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-red-700 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-widest text-red-300 font-semibold mb-4">
              Facilities Management Services
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Smart & Reliable FMS Solutions
            </h1>

            <p className="text-gray-200 text-lg leading-relaxed mb-8">
              Simplify your operations with professional facilities management
              services designed to improve efficiency, safety, productivity,
              and workplace management.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop"
              alt="FMS Services"
              className="rounded-3xl shadow-2xl h-[450px] w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 bg-white text-gray-900 px-5 py-4 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-red-600">24/7</h3>
              <p className="text-sm font-medium">Facility Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our FMS Solutions
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Complete facility management services to keep your workplace
              organized, secure, efficient, and professionally maintained.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {fmsServices.map((service, index) => (
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

      {/* Why Choose FMS */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
              alt="Facility Management Team"
              className="rounded-3xl shadow-2xl"
            />
          </div>

          <div>
            <p className="text-red-600 font-semibold uppercase tracking-widest mb-3">
              Why Choose Our FMS
            </p>

            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Professional Management For Modern Workplaces
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <div className="flex justify-center mb-5">
            <Users size={50} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready To Simplify Your Facility Operations?
          </h2>

          <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
            Connect with our experts for customized facility management
            solutions that improve efficiency, safety, and workplace
            productivity.
          </p>

          <Link
            to="/components/enquiry"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition"
          >
            Request Free Consultation
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FmsServices;