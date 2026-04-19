// import React, { useState } from 'react'

// function WaiterRegisterForm() {

//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [message, setMessage] = useState("")
//   const [error, setError] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     setMessage("")
//     setError("")

//     const token = localStorage.getItem("token")

//     try {

//       const res = await fetch("http://localhost:5000/api/auth/create-staff", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           role: "waiter"
//         })
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         setError(data.message || "Failed to create waiter")
//         return
//       }

//       setMessage("Waiter created successfully")

//       setName("")
//       setEmail("")
//       setPassword("")

//     } catch (err) {
//       setError("Server error")
//     }
//   }

//   return (
//     <div className="max-w-md bg-white p-6 rounded-xl shadow">

//       <h2 className="text-xl font-bold mb-4">Register Waiter</h2>

//       {message && (
//         <div className="bg-green-100 text-green-700 p-2 mb-3 rounded">
//           {message}
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           type="text"
//           placeholder="Waiter Name"
//           className="w-full border p-2 rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           type="email"
//           placeholder="Waiter Email"
//           className="w-full border p-2 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-amber-600 text-white p-2 rounded hover:bg-amber-700"
//         >
//           Create Waiter
//         </button>

//       </form>
//     </div>
//   )
// }

// export default WaiterRegisterForm

import React, { useState } from 'react';

function WaiterRegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/auth/create-staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "waiter"
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create waiter");
        return;
      }

      setMessage("Staff member enrolled successfully.");
      setName("");
      setEmail("");
      setPassword("");

    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-stone-900 p-10 text-center">
          <h2 className="text-3xl font-black text-white tracking-tight mt-1">Waiter Registration</h2>
          <p className="text-red-400 text-xs mt-2">Add a new waiter to the ChiyaPasal service team</p>
        </div>

        <div className="p-10">
          {/* Status Messages */}
          {message && (
            <div className="bg-green-50 text-green-600 p-4 mb-8 rounded-2xl text-xs font-bold flex items-center gap-3 border border-green-100 animate-in fade-in zoom-in duration-300">
              <span className="text-lg">✔</span> {message}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 mb-8 rounded-2xl text-xs font-bold flex items-center gap-3 border border-red-100 animate-in fade-in zoom-in duration-300">
              <span className="text-lg">✖</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Waiter Name */}
            <div className="relative group">
              <label className="text-[10px] font-black uppercase tracking-widest  group-focus-within:text-orange-500 transition-colors">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-transparent border-b-2 border-stone-100 py-3 text-lg font-bold text-stone-800 focus:outline-none focus:border-orange-500 placeholder:text-stone-200 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Waiter Email */}
            <div className="relative group">
              <label className="text-[10px] font-black uppercase tracking-widest group-focus-within:text-orange-500 transition-colors">
                Email Address
              </label>
              <input
                type="email"
                placeholder="waiter@chiya.com"
                className="w-full bg-transparent border-b-2 border-stone-100 py-3 text-lg font-bold text-stone-800 focus:outline-none focus:border-orange-500 placeholder:text-stone-200 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <label className="text-[10px] font-black uppercase tracking-widest group-focus-within:text-orange-500 transition-colors">
                Initial Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent border-b-2 border-stone-100 py-3 text-lg font-bold text-stone-800 focus:outline-none focus:border-orange-500 placeholder:text-stone-200 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-[9px] text-stone-400 mt-2 italic font-medium">The staff member can change this after their first login.</p>
            </div>

            {/* Action Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-orange-600 hover:shadow-[0_15px_30px_rgba(234,88,12,0.3)] transition-all active:scale-95 disabled:bg-stone-300"
              >
                {loading ? "Registering..." : "Complete Registration"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default WaiterRegisterForm;