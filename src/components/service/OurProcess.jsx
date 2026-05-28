import React from "react";
import { Link } from "react-router-dom";
import {
  ClipboardCheck,
  LayoutTemplate,
  Settings,
  Headphones,
  ArrowRight,
} from "lucide-react";

const processSteps = [
  {
    title: "Consult & Assess",
    icon: <ClipboardCheck size={36} />,
    description:
      "We understand your requirements, inspect existing infrastructure, and identify the best solution for your business.",
  },
  {
    title: "Design & Planning",
    icon: <LayoutTemplate size={36} />,
    description:
      "Our experts create a customized implementation plan, workflow, and technical strategy for smooth execution.",
  },
  {
    title: "Deploy & Integrate",
    icon: <Settings size={36} />,
    description:
      "We install, configure, integrate, and test systems professionally with minimal disruption to operations.",
  },
  {
    title: "Support & Maintenance",
    icon: <Headphones size={36} />,
    description:
      "Continuous support, preventive maintenance, and technical assistance to ensure long-term reliability.",
  },
];

const OurProcess = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-red-700 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <p className="uppercase tracking-widest text-red-300 font-semibold mb-4">
            Our Working Process
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Simple, Professional & Result-Oriented Workflow
          </h1>

          <p className="text-gray-200 text-lg leading-relaxed max-w-3xl mx-auto">
            From consultation to long-term support, our streamlined process
            ensures every project is delivered with quality, efficiency, and
            complete customer satisfaction.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:border-red-500 hover:-translate-y-2 transition duration-300 text-center"
              >
                {/* Step Number */}
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-6">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow */}
                {index !== processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-6 top-1/2 transform -translate-y-1/2 text-red-400">
                    <ArrowRight size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Process Matters */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
              alt="Professional Process"
              className="rounded-3xl shadow-2xl"
            />
          </div>

          <div>
            <p className="text-red-600 font-semibold uppercase tracking-widest mb-3">
              Why Our Process Works
            </p>

            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Structured Execution With Reliable Results
            </h2>

            <div className="space-y-4">
              {[
                "Clear project planning & execution",
                "Minimal downtime during deployment",
                "Customized solutions for every client",
                "Professional installation & testing",
                "Continuous technical support",
                "Long-term maintenance & optimization",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5"
                >
                  <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                    ✓
                  </div>

                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready To Start Your Project?
          </h2>

          <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
            Connect with our experts today and let us deliver a smart,
            professional, and efficient solution tailored to your requirements.
          </p>

          <Link
            to="/components/enquiry"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition"
          >
            Discuss Your Project
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OurProcess;