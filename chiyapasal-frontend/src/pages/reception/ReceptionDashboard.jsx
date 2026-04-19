// import React, { use } from "react";
// import { useNavigate } from "react-router-dom";

// function ReceptionDashboard() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));


// const [tables, setTables] = useState([]);
// const [loading, setLoading] = useState(true);

// //fetch the tables from the backend
// useEffect(() => {
//   const fetchTables = async () => {
//     try{
//       const token = localStorage.getItem("token");
//       const response = await fetch ("http://localhost:8080/api/tables/table", {
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       });
//       const result = await response.json();
//      if(result.success){
//       setTables(result.data);
//      }
//     } catch (error) {
//       console.error("Error fetching tables:", error);
//     } finally {
//       setLoading(false);
//     }
//   }
//   fetchTables();
// }, []);

// const handleLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   navigate("/", { replace: true });
// };
// //for occupying a table
// const occupiedCount = tables.filter(t => t.status === "occupied").length;
// const totalTables = tables.length;

// //to render the table components
// const renderAreaSection = (areaName) => {
//     const areaData = tables.filter(t => t.area?.toLowerCase() === areaName.toLowerCase());
//     if (areaData.length === 0) return null;




//   return (
//     <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-orange-100">
      
//       {/* --- TOP NAVIGATION (Minimalist) --- */}
//       <nav className="px-8 py-6 flex justify-between items-center border-b border-stone-100">
//         <div className="flex items-center gap-8">
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//             <span className="font-black tracking-tighter text-lg">CP.</span>
//           </div>
          
//           <div className="hidden md:flex gap-6 text-[11px] font-bold uppercase tracking-widest text-stone-400">
//             <span className="hover:text-orange-500 transition-colors cursor-pointer">Reception Dashboard</span> 
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <span onClick={handleLogout} className="text-[10px] font-black uppercase cursor-pointer">
//             Hi {user?.name || "Ujjwal"} / <span className="text-[10px] font-black text-red-500 uppercase ">Logout</span>
//           </span>
//         </div>
//       </nav>

//       <main className="max-w-6xl mx-auto px-8 py-12">
        
//         {/* --- WELCOME HEADER --- */}
//         <header className="mb-16">
//           <h1 className="text-4xl font-light tracking-tight text-stone-900">
//             Good morning, <span className="font-black">Hi {user?.name}</span>.
//           </h1>
//         </header>

//         {/* --- STRIP STATS (Ultra Minimal) --- */}
//         <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-y border-stone-100 py-10">
//           <div>
//             <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Occupied</p>
//             <p className="text-2xl font-black text-orange-600">03 <span className="text-black">/ 18</span></p>
//           </div>
//           <div>
//             <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Pending Bills</p>
//             <p className="text-2xl font-black text-red-500">01</p>
//           </div>
//           <div>
//             <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Active Waiters</p>
//             <p className="text-2xl font-black">02</p>
//           </div>
//         </section>




//            {/* --- TABLE SELECTION SECTION --- */}
// <section className="bg-white  border-stone-200 p-6">
//   <div className="max-w-7xl mx-auto">
//     <div className="flex items-center justify-between mb-6">
//       <h2 className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
//         <span className="w-4 h-[2px] bg-orange-500"></span>
//         Hall
//       </h2>
//       <span className="text-[10px] font-bold  bg-stone-100 px-2 py-1 rounded">
//         8 TABLES TOTAL
//       </span>
//     </div>

//     <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
//       {[1, 2, 3, 4, 5, 6,7,8].map((num) => (
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

// <section className="bg-white  border-stone-200 p-6">
//   <div className="max-w-7xl mx-auto">
//     <div className="flex items-center justify-between mb-6">
//       <h2 className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
//         <span className="w-4 h-[2px] bg-orange-500"></span>
//         Garden
//       </h2>
//       <span className="text-[10px] font-bold  bg-stone-100 px-2 py-1 rounded">
//         6 TABLES TOTAL
//       </span>
//     </div>

//     <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
//       {[1, 2, 3, 4, 5, 6].map((num) => (
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


// <section className="bg-white  border-stone-200 p-6">
//   <div className="max-w-7xl mx-auto">
//     <div className="flex items-center justify-between mb-6">
//       <h2 className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
//         <span className="w-4 h-[2px] bg-orange-500"></span>
//         Cafe Area
//       </h2>
//       <span className="text-[10px] font-bold bg-stone-100 px-2 py-1 rounded">
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
//             C{num}
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
 

//       </main>
//     </div>
//   );
// }

// export default ReceptionDashboard;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ReceptionDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/tables/table", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        if (result.success) setTables(result.data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTables();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  if (loading) return <div className="p-10 text-center font-black">LOADING...</div>;

  // --- THE ONLY RETURN ---
  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="px-8 py-6 flex justify-between items-center border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span className="font-black text-lg">CP.</span>
        </div>
        <span onClick={handleLogout} className="text-[10px] font-black uppercase cursor-pointer">
          Hi {user?.name} / <span className="text-red-500">Logout</span>
        </span>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <header className="mb-16">
          <h1 className="text-4xl font-light tracking-tight">
            Good morning, <span className="font-black">{user?.name}</span>.
          </h1>
        </header>

        {/* Dynamic Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-y border-stone-100 py-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Occupied</p>
            <p className="text-2xl font-black text-orange-600">
              {tables.filter(t => t.status === "occupied").length} 
              <span className="text-black"> / {tables.length}</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Active Waiters</p>
            <p className="text-2xl font-black">02</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Pending Bills </p>
            <p className="text-2xl text-red-500 font-black">02</p>
          </div>
        </section>

        {/* Dynamic Table Sections: We map through the unique areas found in your database */}
        {[...new Set(tables.map(t => t.area))].map((areaName) => (
          <section key={areaName} className="bg-white p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-4 h-[2px] bg-orange-500"></span>
                {areaName}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {tables
                .filter((t) => t.area === areaName)
                .map((table) => (
                  <button
                    key={table._id}
                    className={`group relative py-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1
                      ${table.status === "occupied"
                        ? "border-orange-500 bg-orange-50 shadow-md shadow-orange-100"
                        : "border-stone-100 bg-white hover:border-stone-300 hover:bg-stone-50"
                      }`}
                  >
                    <span className={`text-2xl font-black ${table.status === "occupied" ? "text-orange-600" : "text-stone-800"}`}>
                      {table.tableName}
                    </span>
                    <span className={`text-[9px] font-bold uppercase ${table.status === "occupied" ? "text-orange-400" : "text-stone-400"}`}>
                      {table.status === "occupied" ? "Occupied" : "Free"}
                    </span>
                    {table.status === "occupied" && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ReceptionDashboard;





          