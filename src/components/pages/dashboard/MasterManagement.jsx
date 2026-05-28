import { useNavigate } from "react-router-dom";
import {
  MdCategory,
  MdAssignmentTurnedIn,
  MdOutlineEngineering,
  MdApartment,
  MdTimelapse,
  MdOutlineWorkspaces,
  MdDeviceHub,
  MdOutlineContactSupport,
} from "react-icons/md";
import {
  FaBalanceScale,
  FaRegCheckCircle,
  FaUsers,
  FaUserFriends,
  FaTools,
  FaLayerGroup,
} from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbListDetails } from "react-icons/tb";

// Added Department Master and Technician Master entries
const masterEntities = [
  { title: "Category Master", to: "/dashboard/category", icon: <MdCategory className="text-red-500 text-[1.7rem]" /> },
  { title: "Status Master", to: "/dashboard/status-master", icon: <MdAssignmentTurnedIn className="text-red-500 text-[1.7rem]" /> },
  { title: "Call Master", to: "/dashboard/call-master", icon: <MdOutlineEngineering className="text-red-500 text-[1.7rem]" /> },
  { title: "Vendor Master", to: "/dashboard/vender-master", icon: <FaBalanceScale className="text-red-500 text-[1.7rem]" /> },
  { title: "Call Urgency", to: "/dashboard/call-urgency", icon: <MdTimelapse className="text-red-500 text-[1.7rem]" /> },
  { title: "Problem Master", to: "/dashboard/problem-master", icon: <MdOutlineWorkspaces className="text-red-500 text-[1.7rem]" /> },
  { title: "Item Type Master", to: "/dashboard/item-type-master", icon: <MdDeviceHub className="text-red-500 text-[1.7rem]" /> },
  { title: "Support Period Master", to: "/dashboard/support-period-master", icon: <MdOutlineContactSupport className="text-red-500 text-[1.7rem]" /> },
  { title: "Designation Master", to: "/dashboard/designation-master", icon: <FaRegCheckCircle className="text-red-500 text-[1.7rem]" /> },
  { title: "Division Master", to: "/dashboard/division-master", icon: <MdApartment className="text-red-500 text-[1.7rem]" /> },
  { title: "Department Master", to: "/dashboard/department", icon: <MdApartment className="text-red-500 text-[1.7rem]" /> },
  { title: "Call Type Master", to: "/dashboard/call-type-master", icon: <FaTools className="text-red-500 text-[1.7rem]" /> },
  { title: "Call Nature Master", to: "/dashboard/call-nature-master", icon: <FaTools className="text-red-500 text-[1.7rem]" /> },
  { title: "Instrument Master", to: "/dashboard/instrument-master", icon: <MdDeviceHub className="text-red-500 text-[1.7rem]" /> },
  { title: "Employee Master", to: "/dashboard/employee-master", icon: <FaUsers className="text-red-500 text-[1.7rem]" /> },
  { title: "Customer Master", to: "/dashboard/customer-master", icon: <FaUserFriends className="text-red-500 text-[1.7rem]" /> },
  { title: "Customer Type Master", to: "/dashboard/customer-type-master", icon: <FaLayerGroup className="text-red-500 text-[1.7rem]" /> },
  { title: "End User Master", to: "/dashboard/end-user-master", icon: <HiOutlineUserGroup className="text-red-500 text-[1.7rem]" /> },
  // Technician Master entry added below
  { title: "Technician Master", to: "/dashboard/technician-master", icon: <MdOutlineEngineering className="text-red-500 text-[1.7rem]" /> },
];

function MasterManagement() {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-[90vh] bg-gradient-to-tr from-white to-red-50 rounded-xl shadow">
      <div className="flex items-center gap-4 mb-7">
        <FaLayerGroup className="text-4xl text-red-500" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Master Management</h1>
          <p className="text-gray-500 mt-1 text-base font-medium">
            Easily manage all system master data in one place
          </p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {masterEntities.map((entity) => (
          <MasterCard
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

function MasterCard({ title, to, icon, onClick }) {
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
        Manage <span className="font-medium">{title}</span>
      </div>
      <TbListDetails className="absolute right-5 bottom-5 text-gray-300 group-hover:text-red-400 text-xl transition" />
    </button>
  );
}

export default MasterManagement;