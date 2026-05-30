 {/* CRUD TABLE - List of Assigned Calls */}
 <div className="bg-white rounded-2xl shadow p-6 mt-6 overflow-x-auto">
 <h2 className="text-2xl font-bold mb-4">Assigned Calls</h2>
 <table className="w-full min-w-max border-collapse">
   <thead>
     <tr className="bg-gray-100">
       <th className="p-3 text-left">Department</th>
       <th className="p-3 text-left">Call Type</th>
       <th className="p-3 text-left">Nature of Call</th>
       <th className="p-3 text-left">Instrument</th>
       <th className="p-3 text-left">Problem</th>
       <th className="p-3 text-left">Customer</th>
       <th className="p-3 text-left">End User</th>
       <th className="p-3 text-left">Designation</th>
       {/* Removed: Call Date, Call Time, AMC, Warranty, Charges */}
       <th className="p-3 text-left">Preferred Date</th>
       <th className="p-3 text-left">Preferred Time</th>
       <th className="p-3 text-left">Assign Date</th>
       <th className="p-3 text-left">Assign Time</th>
       <th className="p-3 text-left">Target Date</th>
       <th className="p-3 text-left">Target Time</th>
       <th className="p-3 text-left">Approx. Time to Close</th>
       <th className="p-3 text-left">Call No</th>
       {/* --- Attempt No Table Header added below Call No --- */}
       <th className="p-3 text-left">Attempt No</th>
       <th className="p-3 text-left">Assign To</th>
       {/* <th className="p-3 text-left">Status</th> status removed */}
       <th className="p-3 text-left">Priority</th>
       <th className="p-3 text-left">Assigned By</th>
       <th className="p-3 text-left">Remarks</th>
       <th className="p-3 text-left">Attachment</th>
       <th className="p-3 text-left">Voice/Audio</th>
       <th className="p-3 text-center">Actions</th>
     </tr>
   </thead>
   <tbody>
     {assignments.map((item) => (
       <tr key={item._id} className="border-b hover:bg-gray-50">
         <td className="p-3">
           {renderDepartment(item.department)}
         </td>
         <td className="p-3">
           {renderCallType(item.callType)}
         </td>
         <td className="p-3">
           {renderNatureOfCall(item.natureOfCall)}
         </td>
         <td className="p-3">
           {renderInstrument(item.instrument)}
         </td>
         <td className="p-3">
           {renderProblem(item.problem)}
         </td>
         <td className="p-3">
           {renderCustomer(item.customer)}
         </td>
         <td className="p-3">
           {renderEndUser(item.endUser)}
         </td>
         <td className="p-3">
           {renderDesignation(item.designation)}
         </td>
         {/* Removed: Call Date */}
         {/* Removed: Call Time */}
         {/* Removed: AMC */}
         {/* Removed: Warranty */}
         {/* Removed: Charges */}
         <td className="p-3">
           {item.preferredDate ? new Date(item.preferredDate).toLocaleDateString() : "-"}
         </td>
         <td className="p-3">
           {item.preferredTime ? formatTime24to12(item.preferredTime) : "-"}
         </td>
         <td className="p-3">
           {item.assignDate ? new Date(item.assignDate).toLocaleDateString() : "-"}
         </td>
         <td className="p-3">
           {item.assignTime ? formatTime24to12(item.assignTime) : "-"}
         </td>
         <td className="p-3">
           {item.targetDate ? new Date(item.targetDate).toLocaleDateString() : "-"}
         </td>
         <td className="p-3">
           {item.targetTime ? formatTime24to12(item.targetTime) : "-"}
         </td>
         <td className="p-3">{item.approxCloseTime || "-"}</td>
         <td className="p-3">
           {renderCallNo(item.callNo)}
         </td>
         {/* ----------- Attempt No Table Cell added below Call No ----------- */}
         <td className="p-3">
           {item.attemptNo || "-"}
         </td>
         <td className="p-3">
           {renderEmployee(item.employee)}
         </td>
         {/* <td className="p-3">
           {renderStatus(item.status)}
         </td> */}
         <td className="p-3">
           {renderPriority(item.priority)}
         </td>
         <td className="p-3">
           {/* Render technicianName if assignedBy is object, otherwise id or name */}
           {item.assignedBy
             ? (typeof item.assignedBy === "object"
                 ? item.assignedBy.technicianName || item.assignedBy.name || item.assignedBy._id
                 : (() => {
                     // Try to find assignedBy id in technicianNames
                     const tech = technicianNames?.find(
                       (t) =>
                         t._id === item.assignedBy ||
                         t.technicianName === item.assignedBy ||
                         t.name === item.assignedBy
                     );
                     return tech
                       ? tech.technicianName || tech.name || tech._id
                       : item.assignedBy;
                   })())
             : "-"
           }
         </td>
         <td className="p-3">
           {item.remarks || "-"}
         </td>
         <td className="p-3">
           {item.attachment?.url ? (
             /\.(jpg|jpeg|png|gif|webp)$/i.test(item.attachment.url) ? (
               <img
                 src={item.attachment.url}
                 alt="Attachment"
                 className="w-16 h-16 object-cover rounded"
               />
             ) : (
               <a
                 href={item.attachment.url}
                 target="_blank"
                 rel="noreferrer"
                 className="text-blue-600 underline"
               >
                 Download
               </a>
             )
           ) : (
             "-"
           )}
         </td>
         <td className="p-3">
           {item.audio?.url ? (
             <audio controls className="w-40">
               <source src={item.audio.url} />
             </audio>
           ) : (
             "-"
           )}
         </td>
         <td className="p-3 flex gap-2 justify-center">
           <button
             onClick={() => handleEdit(item)}
             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
           >
             Edit
           </button>
           <button
             onClick={() => handleDelete(item._id)}
             className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
           >
             Delete
           </button>
         </td>
       </tr>
     ))}
   </tbody>
 </table>
</div>