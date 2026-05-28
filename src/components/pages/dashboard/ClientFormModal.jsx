import {
    useState,
  } from "react";
  
  import axios from "axios";
  
  const API =
    "http://localhost:5000/api/v1/client";
  
  const ClientFormModal = ({
    client,
    onClose,
    refreshClients,
  }) => {
  
    const [formData,
      setFormData] =
      useState({
  
        clientName:
          client?.clientName || "",
  
        mobileNumber:
          client?.mobileNumber || "",
  
        companyName:
          client?.companyName || "",
  
        gstNumber:
          client?.gstNumber || "",
  
        address:
          client?.address || "",
  
        previousDue:
          client?.previousDue || 0,
  
        notes:
          client?.notes || "",
      });
  
    const handleChange =
      (e) => {
  
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.value,
        });
      };
  
    const handleSubmit =
      async (e) => {
  
        e.preventDefault();
  
        try {
  
          await axios.put(
            `${API}/${client._id}`,
            formData
          );
  
          refreshClients();
  
          onClose();
  
        } catch (error) {
  
          console.log(error);
        }
      };
  
    return (
  
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
  
        <div className="bg-white rounded-xl w-full max-w-2xl p-6">
  
          <h2 className="text-2xl font-bold mb-6">
  
            Edit Client
  
          </h2>
  
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >
  
            <input
              type="text"
              name="clientName"
              placeholder="Client Name"
              value={
                formData.clientName
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
  
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile"
              value={
                formData.mobileNumber
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
  
            <input
              type="text"
              name="companyName"
              placeholder="Company"
              value={
                formData.companyName
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
  
            <input
              type="text"
              name="gstNumber"
              placeholder="GST Number"
              value={
                formData.gstNumber
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
  
            <input
              type="number"
              name="previousDue"
              placeholder="Previous Due"
              value={
                formData.previousDue
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
  
            <textarea
              name="address"
              placeholder="Address"
              value={
                formData.address
              }
              onChange={handleChange}
              className="border p-3 rounded-lg md:col-span-2"
            />
  
            <textarea
              name="notes"
              placeholder="Notes"
              value={
                formData.notes
              }
              onChange={handleChange}
              className="border p-3 rounded-lg md:col-span-2"
            />
  
            <div className="md:col-span-2 flex justify-end gap-3">
  
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
  
              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
              >
                Update Client
              </button>
  
            </div>
  
          </form>
  
        </div>
  
      </div>
    );
  };
  
  export default ClientFormModal;