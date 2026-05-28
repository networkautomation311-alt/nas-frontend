
const ClientProfileModal = ({
  client,
  onClose,
}) => {

  if (!client) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">
              {client.clientName}
            </h2>
            <p className="text-gray-500">
              {client.companyName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
            type="button"
          >
            Close
          </button>
        </div>

        {/* DETAILS */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-5 rounded-xl">
            <h3 className="font-bold text-lg mb-4">
              Basic Details
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Mobile:</strong>{" "}
                {client.mobileNumber || "-"}
              </p>
              <p>
                <strong>GST:</strong>{" "}
                {client.gstNumber || "-"}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {client.address || "-"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {client.status || "-"}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl">
            <h3 className="font-bold text-lg mb-4">
              Business Summary
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Total Business:</strong>{" "}
                ₹{typeof client.totalBusiness === "number" ? client.totalBusiness : "-"}
              </p>
              <p>
                <strong>Previous Due:</strong>{" "}
                ₹{typeof client.previousDue === "number" ? client.previousDue : "-"}
              </p>
              <p>
                <strong>Pending:</strong>{" "}
                ₹{typeof client.pendingAmount === "number" ? client.pendingAmount : "-"}
              </p>
              <p>
                <strong>Last Service:</strong>{" "}
                {client.lastServiceDate
                  ? new Date(client.lastServiceDate).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* NOTES */}
        <div className="bg-gray-50 p-5 rounded-xl mb-6">
          <h3 className="font-bold text-lg mb-3">
            Notes
          </h3>
          <p>
            {client.notes && client.notes.trim() ? client.notes : "No notes available"}
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
            type="button"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ClientProfileModal;