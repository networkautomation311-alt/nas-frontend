// =====================================
// src/components/pages/dashboard/Client.jsx
// =====================================

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import ClientCreateModal from "./ClientCreateModal";
import ClientProfileModal from "./ClientProfileModal";
import ClientFormModal from "./ClientFormModal";

const API = "http://localhost:5000/api/v1/client";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  // CREATE & EDIT STATES
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [editClient, setEditClient] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  // =====================================
  // FETCH CLIENTS
  // =====================================

  // Fetch clients whenever search changes, avoid direct setState on first render
  useEffect(() => {
    let ignore = false;
    const fetchClients = async () => {
      try {
        const res = await axios.get(`${API}?search=${search}`);
        if (!ignore) {
          setClients(res.data.data || []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchClients();
    return () => {
      ignore = true;
    };
  }, [search]);

  // Also expose fetchClients for children/actions
  const refreshClients = async () => {
    try {
      const res = await axios.get(`${API}?search=${search}`);
      setClients(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // DELETE CLIENT
  // =====================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete client?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`);
      await refreshClients();
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // DASHBOARD DATA
  // =====================================

  const totalBusiness = clients.reduce(
    (sum, item) => sum + (item.totalBusiness || 0),
    0
  );

  const totalDue = clients.reduce(
    (sum, item) => sum + (item.pendingAmount || 0),
    0
  );

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Client Management
          </h1>
          <p className="text-gray-500">
            ERP Client Master
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full sm:w-80"
          />
          {/* ADD CLIENT BUTTON */}
          <button
            type="button"
            onClick={() => setOpenCreateModal(true)}
            className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg transition hover:bg-indigo-700 shadow mt-2 sm:mt-0"
          >
            + Add Client
          </button>
        </div>
      </div>

      {/* DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Clients</p>
          <h2 className="text-3xl font-bold">{clients.length}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Active Clients</p>
          <h2 className="text-3xl font-bold text-green-600">
            {clients.filter(c => c.status === "Active").length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Business</p>
          <h2 className="text-3xl font-bold">
            ₹
            {totalBusiness.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Pending Due</p>
          <h2 className="text-3xl font-bold text-red-600">
            ₹
            {totalDue.toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">GST</th>
              <th className="p-3 text-left">Business</th>
              <th className="p-3 text-left">Due</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3 font-medium">{item.clientName}</td>
                <td className="p-3">{item.companyName}</td>
                <td className="p-3">{item.mobileNumber}</td>
                <td className="p-3">{item.gstNumber || "-"}</td>
                <td className="p-3">
                  ₹{item.totalBusiness}
                </td>
                <td className="p-3 text-red-600">
                  ₹{item.pendingAmount}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2 justify-center">
                    {/* VIEW */}
                    <button
                      onClick={() => {
                        setSelectedClient(item);
                        setOpenProfile(true);
                      }}
                      className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                    >
                      View
                    </button>

                    {/* EDIT */}
                    <button
                      onClick={() => {
                        setEditClient(item);
                        setOpenEditModal(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PROFILE MODAL */}
      {openProfile && (
        <ClientProfileModal
          client={selectedClient}
          onClose={() => setOpenProfile(false)}
        />
      )}

      {/* ADD CLIENT MODAL */}
      {openCreateModal && (
        <ClientCreateModal
          onClose={() => setOpenCreateModal(false)}
          refreshClients={refreshClients}
        />
      )}

      {/* EDIT MODAL */}
      {openEditModal && (
        <ClientFormModal
          client={editClient}
          onClose={() => setOpenEditModal(false)}
          refreshClients={refreshClients}
        />
      )}
    </div>
  );
};

export default Client;