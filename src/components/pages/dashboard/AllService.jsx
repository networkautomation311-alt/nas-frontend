import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEngineering } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { GiProgression } from "react-icons/gi";
import { FaRegCheckCircle } from "react-icons/fa";

// NOTE: This is modeled after MasterManagement.jsx structure but focuses on "Call Entry Form", "Plan To Action", and "Cross Check Form" as services
const serviceEntities = [
  {
    title: "Call Entry Form",
    to: "/dashboard/call-entry-form",
    icon: <MdOutlineEngineering className="text-red-500 text-[1.7rem]" />,
  },
  {
    title: "Plan To Action",
    to: "/dashboard/plan-to-action",
    icon: <GiProgression className="text-red-500 text-[1.7rem]" />,
  },
  {
    title: "Cross Check Form",
    to: "/dashboard/cross-check-form",
    icon: <FaRegCheckCircle className="text-red-500 text-[1.7rem]" />,
  },
];

function AllService() {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-[60vh] bg-gradient-to-tr from-white to-red-50 rounded-xl shadow">
      <div className="flex items-center gap-4 mb-7">
        <FaLayerGroup className="text-4xl text-red-500" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">All Services</h1>
          <p className="text-gray-500 mt-1 text-base font-medium">
            Access all service forms and entry points at one place
          </p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {serviceEntities.map((entity) => (
          <ServiceCard
            key={entity.title}
            title={entity.title}
            icon={entity.icon}
            to={entity.to}
            onClick={() => navigate(entity.to)}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ title, to, icon, onClick }) {
  return (
    <button
      type="button"
      aria-label={title}
      onClick={onClick}
      className="group transition-all bg-white border-2 border-transparent hover:border-red-500 rounded-xl shadow hover:shadow-lg px-6 py-6 flex flex-col items-start hover:bg-red-50 cursor-pointer relative h-full"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="bg-red-100 rounded-full p-3 group-hover:bg-red-200 transition">{icon}</span>
        <span className="font-bold text-lg text-gray-800 group-hover:text-red-700">{title}</span>
      </div>
      <div className="text-xs text-gray-430 group-hover:text-red-500 mt-auto tracking-wide">
        Open <span className="font-medium">{title}</span>
      </div>
      <TbListDetails className="absolute right-5 bottom-5 text-gray-300 group-hover:text-red-400 text-xl transition" />
    </button>
  );
}

export default AllService;