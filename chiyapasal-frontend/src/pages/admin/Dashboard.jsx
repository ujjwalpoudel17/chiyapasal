import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-orange-100">
      
      {/* --- TOP NAVIGATION (Minimalist) --- */}
      <nav className="px-8 py-6 flex justify-between items-center border-b border-stone-100">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="font-black tracking-tighter text-lg">CP.</span>
          </div>
          
          <div className="hidden md:flex gap-6 text-[11px] font-bold uppercase tracking-widest text-stone-400">
            <span className="hover:text-orange-500 transition-colors cursor-pointer">Dashboard</span> 
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span  onClick={handleLogout} className="text-[10px] font-black uppercase ">Hi {user?.name || "Ujjwal"} / <span className="text-[10px] font-black text-red-500 uppercase cursor-pointer ">Logout</span></span>
          
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-12">
        
        {/* --- WELCOME HEADER --- */}
        <header className="mb-16">
          <h1 className="text-4xl font-light tracking-tight text-stone-900">
            Good morning, <span className="font-black">Hi {user?.name}</span>.
          </h1>
        </header>

        {/* --- STRIP STATS (Ultra Minimal) --- */}
     

        

      </main>
    </div>
  );
}

export default Dashboard;