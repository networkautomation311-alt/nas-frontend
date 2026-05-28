import React from "react";

const FounderLeadership = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0076D6]">
            Founder & Leadership
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Meet the visionary behind Network Automation Solutions
          </p>
        </div>

        {/* Founder Card */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl transition duration-300">
          
          {/* Founder Image */}
          <div className="flex-shrink-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Founder"
              className="w-52 h-52 rounded-full object-cover border-4 border-[#0076D6] shadow-md"
            />
          </div>

          {/* Founder Content */}
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Founder Name
            </h3>

            <p className="text-[#0076D6] font-semibold text-lg mb-6">
              Founder & Director, Network Automation Solutions
            </p>

            <div className="space-y-4 text-gray-700 leading-relaxed text-[17px]">
              <p>
                Network Automation Solutions was founded with a vision to
                provide reliable, smart, and advanced security & automation
                solutions for modern homes and businesses.
              </p>

              <p>
                With <span className="font-semibold">30+ years</span> of
                industry experience in IT infrastructure, surveillance systems,
                and networking technologies, the company has become a trusted
                service provider across Indore and nearby regions.
              </p>

              <p>
                The leadership team has strong expertise in CCTV systems,
                networking, automation, and security solutions, ensuring
                reliable, scalable, and future-ready implementations for every
                client.
              </p>

              <p>
                Under expert leadership, the company has successfully completed{" "}
                <span className="font-semibold text-[#0076D6]">
                  1000+ installations
                </span>{" "}
                while maintaining high-quality service and customer
                satisfaction.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-gray-50 rounded-2xl p-4 text-center shadow-sm">
                <h4 className="text-2xl font-bold text-[#0076D6]">30+</h4>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-center shadow-sm">
                <h4 className="text-2xl font-bold text-[#0076D6]">1000+</h4>
                <p className="text-sm text-gray-600">Installations</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-center shadow-sm">
                <h4 className="text-2xl font-bold text-[#0076D6]">24/7</h4>
                <p className="text-sm text-gray-600">Support Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderLeadership;