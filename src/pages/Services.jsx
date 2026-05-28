import React from "react";
import { FaTools, FaCogs, FaHandshake, FaNetworkWired, FaUserShield, FaStream } from "react-icons/fa";

// Khud se image add kiye (sample royalty-free illustrative images, replace as needed)
const services = [
  {
    icon: <FaTools className="text-red-600 text-3xl mb-3" />,
    title: "Installation Services",
    description:
      "End-to-end installation for CCTV, networking, and security solutions, handled by certified professionals. Includes configuration, testing, and on-site training.",
    img: "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1779276487/ChatGPT_Image_May_20_2026_04_57_55_PM_vlsdmi.png", // tools/installation image (placeholder)
    imgAlt: "Engineers installing security equipment",
  },
  {
    icon: <FaCogs className="text-red-600 text-3xl mb-3" />,
    title: "Maintenance Services",
    description:
      "Scheduled inspections, preventive maintenance, troubleshooting, and quick repairs—ensuring your systems keep running at peak performance.",
    img: "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1779277239/ChatGPT_Image_May_20_2026_05_10_27_PM_i8tn8d.png", // maintenance/check image
    imgAlt: "Technician performing maintenance check",
  },
  {
    icon: <FaHandshake className="text-red-600 text-3xl mb-3" />,
    title: "AMC (Annual Maintenance Contract)",
    description:
      "Flexible yearly maintenance contracts for comprehensive care—service visits, parts, on-call assistance, and priority support under one plan.",
    img: "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1779277406/ChatGPT_Image_May_20_2026_05_13_08_PM_zfrhmz.png", // handshake/team
    imgAlt: "Team providing AMC service",
  },
  {
    icon: <FaNetworkWired className="text-red-600 text-3xl mb-3" />,
    title: "Offshore Support / Remote Working",
    description:
      "Expert troubleshooting, configuration, and monitoring provided securely over remote connection, minimizing downtime and response time.",
    img: "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1779276851/ChatGPT_Image_May_20_2026_05_03_38_PM_uumdc7.png", // remote support concept
    imgAlt: "Remote support concept illustration",
  },
  {
    icon: <FaUserShield className="text-red-600 text-3xl mb-3" />,
    title: "FMS (Facility Management Services)",
    description:
      "Round-the-clock monitoring and management for IT & security infrastructure—proactive reporting, incident response, and on-site caretaking.",
    img: "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1779277088/ChatGPT_Image_May_20_2026_05_07_56_PM_vkjkdz.png", // facility management
    imgAlt: "Facility management team supervising systems",
  },
];

const processSteps = [
  { label: "1", step: "Requirement Gathering & Analysis" },
  { label: "2", step: "Detailed Site Survey & Solution Design" },
  { label: "3", step: "Professional Installation" },
  { label: "4", step: "Rigorous Testing & Client Training" },
  { label: "5", step: "Ongoing Support & Maintenance" },
];

const Services = () => (
  <div className="max-w-6xl mx-auto py-5 px-4">
    <h1 className="text-4xl sm:text-5xl text-center font-semibold text-red-700 mb-10 drop-shadow-sm tracking-tight">
      Our Services
    </h1>
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-16">
      {services.map((svc, idx) => (
        <div
          key={svc.title}
          className="bg-white rounded-2xl shadow-lg flex flex-col items-center border border-gray-100 hover:-translate-y-1 hover:shadow-2xl transition-all group p-0"
        >
          <div className="w-full h-40 overflow-hidden rounded-t-2xl bg-gray-50 flex justify-center items-center">
            <img
              src={svc.img}
              alt={svc.imgAlt}
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              style={{ minHeight: "10rem", objectPosition: "center" }}
            />
          </div>
          <div className="flex flex-col items-center p-7 pt-4">
            {svc.icon}
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center group-hover:text-red-700 transition-colors">
              {svc.title}
            </h2>
            <p className="text-gray-600 text-center">{svc.description}</p>
          </div>
        </div>
      ))}
    </div>
    {/* Our Process Redesigned */}
    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-inner">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Our Process</h2>
      </div>
      <ol className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0 mt-2">
        {processSteps.map((step, idx) => (
          <li key={idx} className="flex-1 flex items-start md:flex-col md:items-center group">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-700 font-bold text-lg border-2 border-red-400 group-hover:bg-red-600 group-hover:text-white transition-all">
              {step.label}
            </span>
            <span className="ml-4 md:ml-0 md:mt-2 text-gray-800 text-base font-medium text-center">{step.step}</span>
            {idx < processSteps.length - 1 && (
              <span className="hidden md:block h-2 w-12 bg-red-200 mt-5 mb-0 rounded-full"></span>
            )}
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default Services;