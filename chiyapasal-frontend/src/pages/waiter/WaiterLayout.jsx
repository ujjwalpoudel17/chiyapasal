import React from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function WaiterLayout() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "Waiter";

  
  const handleLogout = () => {
    // Clear user session (this is just a placeholder, implement your actual logout logic here)
    localStorage.clear();
    
    // Redirect to login page
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans overflow-hidden">
      
      {/* --- NAVIGATION SECTION --- */}
      <nav className="bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-orange-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-lg">
            CP
          </div>
          <div>
            <h1 className="text-lg font-black text-stone-900 leading-none">ChiyaPasal</h1>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                Waiter Dashboard
              </span>
            </div>
          </div>
        </div>
       <div className="flex items-center gap-4 border-l pl-6 border-stone-100">
  {/* Name and Logout Action */}
  <div className="text-right hidden sm:block">
    <p className="text-xs font-black text-stone-900 leading-none">
     Hi {userName}
    </p>
    
    {/* Simple, clean logout text directly below the name */}
    <button onClick={handleLogout} className="mt-1 block ml-auto text-[10px] font-bold text-orange-600 hover:text-red-500 uppercase tracking-widest transition-all hover:underline decoration-2 underline-offset-4">
      Logout
    </button>
  </div>
</div>
      </nav>

       {/* ✅ DYNAMIC PART */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>



{/* --- REGULAR FOOTER SECTION --- */}
<footer className="bg-white border-t border-stone-200 pt-12 pb-8 px-6 ">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      
      {/* Brand Column */}
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm">
            CP
          </div>
          <h2 className="text-lg font-black text-stone-900 tracking-tight">ChiyaPasal</h2>
        </div>
        <p className="text-xs text-stone-500 leading-relaxed font-medium">
          The ultimate tea-station management system. Designed for speed, accuracy, and the perfect cup of chiya.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-5">Navigation</h3>
        <ul className="space-y-3">
          {['Dashboard', 'Orders', 'Menu Management', 'Inventory'].map((item) => (
            <li key={item}>
              <a href="#" className="text-xs font-bold text-stone-600 hover:text-orange-600 transition-colors">{item}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-5">Support</h3>
        <ul className="space-y-3">
          {['Help Center', 'Report a Bug', 'Contact Admin', 'System Status'].map((item) => (
            <li key={item}>
              <a href="#" className="text-xs font-bold text-stone-600 hover:text-orange-600 transition-colors">{item}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* System Info */}
      <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100">
        <h3 className="text-[10px] font-black text-stone-900 uppercase tracking-widest mb-3">System Instance</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-stone-400 font-bold">Version</span>
            <span className="text-[10px] text-stone-900 font-black">v2.4.0-stable</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-stone-400 font-bold">Last Sync</span>
            <span className="text-[10px] text-stone-900 font-black">Just now</span>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Copyright Bar */}
    <div className="pt-8 border-t border-stone-100 flex flex-col md:row justify-between items-center gap-4">
      <p className="text-[10px] font-bold text-stone-400">
        © 2024 ChiyaPasal POS System. All rights reserved.
      </p>
      <div className="flex items-center gap-6">
        <a href="#" className="text-[10px] font-bold text-stone-400 hover:text-stone-900">Privacy Policy</a>
        <a href="#" className="text-[10px] font-bold text-stone-400 hover:text-stone-900">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>

      </div>
  );
}

export default WaiterLayout;