import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function WaiterDashboard() {
  const [tables, setTables] = useState([]); // Initialized as empty array
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);

 useEffect(() => {
  const fetchTables = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/tables/table", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json(); // Changed variable name to 'result' for clarity

      // Target result.data because your API wraps the array in a 'data' property
      if (res.ok && result.success && Array.isArray(result.data)) {
        setTables(result.data); 
      } else {
        console.error("Auth/Server Error:", result.message);
        setTables([]); 
      }
    } catch (error) {
      console.error("Network Error:", error);
      setTables([]); 
    } finally {
      setLoading(false);
    }
  };

  fetchTables();
}, []);

  // Grouping tables safely
 const groupedTables = {
  Hall: Array.isArray(tables) ? tables.filter((t) => t.area?.toLowerCase() === "hall") : [],
  Garden: Array.isArray(tables) ? tables.filter((t) => t.area?.toLowerCase() === "garden") : [],
  Inside: Array.isArray(tables) ? tables.filter((t) => t.area?.toLowerCase() === "inside") : [],
};

 
// ... inside renderTables function ...

const renderTables = (areaName, prefix) => {
  const areaData = groupedTables[areaName] || [];
  
  if (areaData.length === 0) return null;

  return (
    <section className="bg-white p-6 border-b border-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-[2px] bg-orange-500"></span>
            {areaName}
          </h2>
          <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded">
            {areaData.length} TABLES TOTAL
          </span>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {areaData.map((table) => {
            // Check if the table is occupied
            const isOccupied = table.status === "occupied";

            return (
              <Link
                key={table._id}
                to={`/waiter/orderform/${table._id}/${table.tableName}`}
                className={`group relative py-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 no-underline
                  ${isOccupied
                    ? "border-orange-200 bg-orange-50 opacity-90 shadow-sm" // Style for PACKED
                    : "border-stone-100 bg-white hover:border-stone-300 hover:bg-stone-50" // Style for AVAILABLE
                  }`}
              >
                {/* Table Name */}
                <span className={`text-2xl font-black ${isOccupied ? "text-orange-700" : "text-stone-800"}`}>
                  {table.tableName}
                </span>

                {/* Dynamic Status Label */}
                <span className={`text-[9px] font-bold uppercase tracking-tighter 
                  ${isOccupied ? "text-orange-500" : "text-stone-400"}`}>
                  {isOccupied ? "• Packed" : "Available"}
                </span>
                
                {/* Visual Indicator for Occupied */}
                {isOccupied && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                )}
                
                {/* Tooltip/Hover effect for clear status */}
                {!isOccupied && (
                  <div className="absolute -bottom-1 w-6 h-1 bg-green-400 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-400 font-bold animate-pulse tracking-widest text-xs">LOADING TABLES...</p>
      </div>
    );
  }

  return (
    <div className=" bg-stone-50 flex flex-col font-sans overflow-y-auto">
      {renderTables("Hall", "T")}
      {renderTables("Garden", "G")}
      {renderTables("Inside", "IN")}

      {tables.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-stone-400">
          <p className="italic">No tables found or access denied.</p>
        </div>
      )}
    </div>
  );
}

export default WaiterDashboard;
































// import React, { useState, useEffect } from "react";

// function WaiterDashboard() {
// const [tables, setTables] = useState([]);
// const [loading, setLoading] = useState(true);
// const [selectedTable, setSelectedTable] = useState(null);

// //fetch all the tables
// useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Assuming you store JWT in localStorage
//         const response = await fetch("http://localhost:5000/api/tables/table", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setTables(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching tables:", error);
//         setLoading(false);
//       }
//     };

//     fetchTables();
//   }, []);





//   return (
//     <div className="min-h-screen bg-stone-50 flex flex-col font-sans overflow-hidden">
   

//       {/* --- TABLE SELECTION SECTION --- */}
// <section className="bg-white  border-stone-200 p-6">
//   <div className="max-w-7xl mx-auto">
//     <div className="flex items-center justify-between mb-6">
//       <h2 className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
//         <span className="w-4 h-[2px] bg-orange-500"></span>
//         Hall
//       </h2>
//       <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded">
//         9 TABLES TOTAL
//       </span>
//     </div>

//     <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
//       {[1, 2, 3, 4, 5, 6,7,8,9].map((num) => (
//         <button
//           key={num}
//           className={`group relative py-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1
//             ${num === 1 
//               ? "border-orange-500 bg-orange-50 shadow-md shadow-orange-100" 
//               : "border-stone-100 bg-white hover:border-stone-300 hover:bg-stone-50"
//             }`}
//         >
//           {/* Table Number */}
//           <span className={`text-2xl font-black ${num === 1 ? "text-orange-600" : "text-stone-800"}`}>
//             T{num}
//           </span>
          
//           {/* Status Label */}
//           <span className={`text-[9px] font-bold uppercase tracking-tighter ${num === 1 ? "text-orange-400" : "text-stone-400"}`}>
//             {num === 1 ? "Occupied" : "Free"}
//           </span>

//           {/* Selection indicator dot */}
//           {num === 1 && (
//             <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
//           )}
//         </button>
//       ))}
//     </div>
//   </div>
// </section>
// <section className="bg-white  p-6">
//   <div className="max-w-7xl mx-auto">
//     <div className="flex items-center justify-between mb-6">
//       <h2 className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
//         <span className="w-4 h-[2px] bg-orange-500"></span>
//         Garden
//       </h2>
//       <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded">
//         4 TABLES TOTAL
//       </span>
//     </div>

//     <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
//       {[1, 2, 3, 4].map((num) => (
//         <button
//           key={num}
//           className={`group relative py-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1
//             ${num === 1 
//               ? "border-orange-500 bg-orange-50 shadow-md shadow-orange-100" 
//               : "border-stone-100 bg-white hover:border-stone-300 hover:bg-stone-50"
//             }`}
//         >
//           {/* Table Number */}
//           <span className={`text-2xl font-black ${num === 1 ? "text-orange-600" : "text-stone-800"}`}>
//             G{num}
//           </span>
          
//           {/* Status Label */}
//           <span className={`text-[9px] font-bold uppercase tracking-tighter ${num === 1 ? "text-orange-400" : "text-stone-400"}`}>
//             {num === 1 ? "Selected" : "Available"}
//           </span>

//           {/* Selection indicator dot */}
//           {num === 1 && (
//             <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
//           )}
//         </button>
//       ))}
//     </div>
//   </div>
// </section>

// {/* inside section */}
// <section className="bg-white  p-6">
//   <div className="max-w-7xl mx-auto">
//     <div className="flex items-center justify-between mb-6">
//       <h2 className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
//         <span className="w-4 h-[2px] bg-orange-500"></span>
//         Inside
//       </h2>
//       <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded">
//         4 TABLES TOTAL
//       </span>
//     </div>

//     <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
//       {[1, 2, 3, 4].map((num) => (
//         <button
//           key={num}
//           className={`group relative py-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1
//             ${num === 1 
//               ? "border-orange-500 bg-orange-50 shadow-md shadow-orange-100" 
//               : "border-stone-100 bg-white hover:border-stone-300 hover:bg-stone-50"
//             }`}
//         >
//           {/* Table Number */}
//           <span className={`text-2xl font-black ${num === 1 ? "text-orange-600" : "text-stone-800"}`}>
//             IN{num}
//           </span>
          
//           {/* Status Label */}
//           <span className={`text-[9px] font-bold uppercase tracking-tighter ${num === 1 ? "text-orange-400" : "text-stone-400"}`}>
//             {num === 1 ? "Selected" : "Available"}
//           </span>

//           {/* Selection indicator dot */}
//           {num === 1 && (
//             <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
//           )}
//         </button>
//       ))}
//     </div>
//   </div>
// </section>




//     </div>
    
//   );
// }
// export default WaiterDashboard;



















