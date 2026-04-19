import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddMenu() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ itemName: '', price: '', category: '', available: 'Available', ingredients: '' });
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  // ✅ ADDED: Function to handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      // ✅ CHANGED: Use FormData for file uploads instead of JSON
      const data = new FormData();
      data.append("itemName", formData.itemName);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("available", formData.available);
      data.append("ingredients", formData.ingredients);
      if (file) {
        data.append("image", file); // Must match upload.single('image') in backend
      }

      const res = await fetch("http://localhost:5000/api/menus/create-menu", {
        method: "POST",
        headers: {
          // ❗ IMPORTANT: Do NOT set Content-Type for FormData, browser does it automatically
          "Authorization": `Bearer ${token}`
        },
        body: data
      });

      const result = await res.json();

      if (result.success) {
        alert("Menu created successfully");
        navigate("/admin/menus"); 
      } else {
        setError(result.message || "Failed to create Menu");
      }

    } catch (err) {
      setError("Failed to create Menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-stone-900 font-sans p-6 md:p-12">
      {/* --- TOP NAVIGATION BREADCRUMBS --- */}
      <nav className="max-w-5xl mx-auto mb-10 flex justify-between items-center">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-stone-400">
          <span className="hover:text-stone-900 cursor-pointer transition-colors">Manager Menu</span>
          <span>/</span>
          <span className="text-orange-600">Add Menu Item</span>
        </div>
        <button onClick={() => navigate(-1)} className="text-[10px] font-black uppercase tracking-widest bg-stone-100 px-4 py-2 rounded-full hover:bg-stone-200 transition-all">
          ← Back
        </button>
      </nav>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <header className="mb-12">
            <h1 className="text-5xl font-black tracking-tighter text-stone-900 mb-4">Add to Menu.</h1>
            {error && <p className="text-red-500 text-[10px] font-black uppercase">{error}</p>}
          </header>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-8">
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">Item Name</label>
                <input
                  type="text"
                  placeholder="e.g. Himalayan Ginger Tea"
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className="w-full mt-2 bg-transparent border-b-2 border-stone-200 py-4 text-2xl font-black focus:outline-none focus:border-orange-500 placeholder:text-stone-200 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-widest group-focus-within:text-orange-500">Price</label>
                  <div className="flex items-center gap-2 mt-2 border-b-2 border-stone-200 focus-within:border-orange-500 transition-all">
                    <span className="font-bold text-stone-300">NPR</span>
                    <input
                      type="number"
                      placeholder="00.0"
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full py-4 bg-transparent text-xl font-black focus:outline-none"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-widest group-focus-within:text-orange-500">Category</label>
                  <input
                    type="text"
                    placeholder="Tea/Coffee"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full mt-2 py-4 bg-transparent border-b-2 border-stone-200 text-xl font-black focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-widest group-focus-within:text-orange-500">Available</label>
                  <select 
                    onChange={(e) => setFormData({ ...formData, available: e.target.value })}
                    className="w-full mt-2 py-4 bg-transparent border-b-2 border-stone-200 text-xl font-black focus:outline-none focus:border-orange-500 appearance-none cursor-pointer"
                  >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="group">
              <label className="text-[10px] font-black uppercase tracking-widest group-focus-within:text-orange-500">Ingredients</label>
              <textarea
                rows="3"
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                className="w-full mt-4 p-6 bg-white rounded-[2rem] border border-stone-100 shadow-sm focus:ring-4 focus:ring-orange-50/50 focus:outline-none text-stone-600 font-medium leading-relaxed transition-all resize-none"
                placeholder="Briefly describe the ingredients..."
              ></textarea>
            </div>

            <div className="group">
              <label className="text-[10px] font-black uppercase tracking-widest group-focus-within:text-orange-500">Item Image</label>
              <div className="mt-4 flex items-center gap-6">
                <label className="cursor-pointer bg-stone-100 hover:bg-stone-200 py-4 px-8 rounded-2xl font-bold text-sm transition-all border-2 border-dashed border-stone-300">
                  {file ? file.name : "Choose File"}
                  <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                </label>
                {file && <span className="text-orange-600 text-[10px] font-black uppercase">Ready to upload ✓</span>}
              </div>
            </div>

            <div className="pt-10 flex items-center gap-8">
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-stone-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish to Menu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMenu;