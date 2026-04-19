import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.jpg';



function Reception() {

    const location = useLocation();

    const menu = [
      { name: "Dashboard", path: "/reception"},
      { name: "Orders", path: "/reception/orders"},
       { name: "Payments", path: "/reception/payments"}

    ];



  return (
   <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR - Fixed with sticky */}
      <aside className="w-64 bg-white shadow-md p-5 h-screen sticky top-0 overflow-y-auto">
        <div className="flex flex-col items-center mb-12 mt-10">
          <img 
            src={Logo} 
            alt="ChiyaPasal Logo" 
            className="w-20 h-20 object-contain mb-3 rounded-full bg-orange-50 p-2 border border-orange-100" 
          />
          <h1 className="text-xl font-black text-stone-800 tracking-tighter">
            Chiya<span className="text-orange-600">Pasal</span>
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Reception Portal</span>
        </div>
  
        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded-lg font-medium transition
                  ${
                    location.pathname === item.path
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
  
      {/* RIGHT CONTENT - This part will scroll */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Reception;