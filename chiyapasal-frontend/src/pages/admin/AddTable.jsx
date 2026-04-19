import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function AddTable() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ tableName: '', area: '' });
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    //retrieve the JWT token 
    const token = localStorage.getItem("token");

    try{
      const res = await fetch("http://localhost:5000/api/tables/create-table", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
const data = await res.json();

if(data.success){
  alert("Table created successfully");
  navigate("/admin/Tables");
}else{
  setError(data.message || "Failed to create table");
}
    }catch(err){
      setError("Failed to create table");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-stone-900 font-sans p-6 md:p-12">
      
      {/* --- TOP NAVIGATION BREADCRUMBS --- */}
      <nav className="max-w-5xl mx-auto mb-10 flex justify-between items-center">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-stone-400">
          <span className="hover:text-stone-900 cursor-pointer transition-colors">Manager Table</span>
          <span>/</span>
          <span className="text-orange-600">Add Table</span>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest bg-stone-100 px-4 py-2 rounded-full hover:bg-stone-200 transition-all">
          ← Back 
        </button>
      </nav>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* --- LEFT COLUMN: THE FORM (7/12) --- */}
        <div className="lg:col-span-7">
          <header className="mb-12">
            <h1 className="text-5xl font-black tracking-tighter text-stone-900 mb-4">Add Table.</h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Section: Basic Info */}
            <div className="space-y-8">
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em]  group-focus-within:text-orange-500 transition-colors">Table Name</label>
                <input 
                  type="text" value={formData.tableName}
                  placeholder="e.g. Table 1" 
                  onChange={(e) => setFormData({...formData, tableName: e.target.value})}
                  className="w-full mt-2 bg-transparent border-b-2 border-stone-200 py-4 text-2xl font-black focus:outline-none focus:border-orange-500 placeholder:text-stone-200 transition-all"
                />
              </div>
            </div>

            {/* Section: Details */}
            <div className="group">
              <label className="text-[10px] font-black uppercase tracking-widest group-focus-within:text-orange-500">Area</label>
              <textarea 
                rows="3" value={formData.area}
                className="w-full mt-4 p-6 bg-white rounded-[2rem] border border-stone-100 shadow-sm focus:ring-4 focus:ring-orange-50/50 focus:outline-none text-stone-600 font-medium leading-relaxed transition-all resize-none"
                placeholder="Briefly describe the location..."
                onChange={(e) => setFormData({...formData, area: e.target.value})}
              ></textarea>
            </div>

            <div className="pt-10 flex items-center gap-8">
              <button disabled={loading} type="submit" className="flex-1 bg-stone-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-200 transition-all active:scale-95">
               {loading ? 'Processing...' : 'Publish to Tables'}
              </button>
              <button type="button" onClick={() => navigate(-1)} className="px-8 py-6 rounded-3xl border border-red-500 font-black uppercase tracking-widest text-[10px] hover:text-red-500 hover:border-red-500 hover:bg-orange-600 hover:text-white transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>

  

      </div>
    </div>
  );
}

export default AddTable;