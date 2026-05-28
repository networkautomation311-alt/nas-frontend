import React from "react";

const KeyFeatures = () => {
  return (
    <section className="bg-[#f5fafe] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0076D6]">Key Features</h2>
          <p className="text-gray-600 mt-3 text-lg">
            Discover the standout features that make us a leader in automation and security solutions.
          </p>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl shadow-md p-8 text-center hover:shadow-xl transition duration-300">
            <div className="text-[#0076D6] mb-4 text-5xl">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Advanced Security
            </h3>
            <p className="text-gray-600">
              State-of-the-art CCTV, access control, and security systems for 24/7 protection.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white rounded-3xl shadow-md p-8 text-center hover:shadow-xl transition duration-300">
            <div className="text-[#0076D6] mb-4 text-5xl">
              <i className="fas fa-network-wired"></i>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Seamless Connectivity
            </h3>
            <p className="text-gray-600">
              Reliable networking and smart automation that connect your spaces effortlessly.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white rounded-3xl shadow-md p-8 text-center hover:shadow-xl transition duration-300">
            <div className="text-[#0076D6] mb-4 text-5xl">
              <i className="fas fa-headset"></i>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Expert Support
            </h3>
            <p className="text-gray-600">
              Experienced professionals and round-the-clock service for customer peace of mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;