import React from "react";

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Our Services</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Installation Services</h2>
          <p className="text-gray-600">
            We provide hassle-free installation and deployment of all our security and networking solutions, customized to your needs.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Maintenance Services</h2>
          <p className="text-gray-600">
            Routine inspections, repairs, and technical support to make sure your systems run smoothly and reliably.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">AMC (Annual Maintenance Contract)</h2>
          <p className="text-gray-600">
            Comprehensive yearly plans covering preventive maintenance and all necessary service visits for your peace of mind.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Offshore Support / Remote Working</h2>
          <p className="text-gray-600">
            Efficient remote troubleshooting, configuration, and expert support no matter where your business operates.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">FMS (Facility Management Services)</h2>
          <p className="text-gray-600">
            End-to-end management and monitoring of all installed systems for seamless facility operations.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Our Process</h2>
          <p className="text-gray-600">
            We follow a proven process: requirement analysis, solution design, implementation, training, and dedicated support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;