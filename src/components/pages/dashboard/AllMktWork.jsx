import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineMarkEmailUnread,
  MdOutlineWorkspaces,
} from "react-icons/md";
import { FaFileSignature } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";

// Entities for Market Work
const marketWorkEntities = [
  {
    title: "Order",
    to: "/dashboard/order",
    icon: <FaFileSignature className="text-red-500 text-[1.7rem]" />,
    description: "Manage, track, and review all sales orders in the system.",
  },
  {
    title: "Enquiry",
    to: "/dashboard/enquiry",
    icon: <MdOutlineMarkEmailUnread className="text-red-500 text-[1.7rem]" />,
    description: "View and respond to all customer and market enquiries efficiently.",
  },
];

function AllMktWork() {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-[60vh] bg-gradient-to-tr from-white to-red-50 rounded-xl shadow">
      <div className="flex items-center gap-4 mb-7">
        <MdOutlineWorkspaces className="text-4xl text-red-500" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Market Work</h2>
          <p className="text-gray-500 mt-1 text-base font-medium">
            Manage, track, and review market activities efficiently.
          </p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {marketWorkEntities.map((entity) => (
          <MarketWorkCard
            key={entity.title}
            title={entity.title}
            icon={entity.icon}
            to={entity.to}
            description={entity.description}
            onClick={() => navigate(entity.to)}
          />
        ))}
      </div>
    </div>
  );
}

function MarketWorkCard({ title, to, icon, description, onClick }) {
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
      <div className="text-xs text-gray-500 group-hover:text-red-500 mt-auto tracking-wide">
        {description}
      </div>
      <TbListDetails className="absolute right-5 bottom-5 text-gray-300 group-hover:text-red-400 text-xl transition" />
    </button>
  );
}

export default AllMktWork;