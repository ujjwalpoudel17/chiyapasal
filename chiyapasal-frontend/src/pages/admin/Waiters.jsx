import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Waiters() {
  const [waiters, setWaiters] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
fetchWaiters();
},[]);

const fetchWaiters = async () => {
  try{
    const res = await fetch("http://localhost:5000/api/auth/waiters",{
      method: "GET",
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    });
const data = await res.json();
if(data.success){
  setWaiters(data.waiters);
}
  }catch(error){
    console.error("Error fetching waiters", error);
  }
  finally{
    setLoading(false);
  }
};




  return (
    <div>

      {/* ADD BUTTON */}
      <div className="flex justify-end">
        <Link to="/admin/add-waiters">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
            + Add Waiter
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <table className="w-full table-fixed mt-10">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">S.N</th>
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">Name</th>
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">Email</th>
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">Action</th>
          </tr>
        </thead>

        <tbody className="bg-white">

          {loading ? (
            <tr>
              <td colSpan="4" className="py-4 px-6 border-b text-center text-gray-500">
                Loading waiters...
              </td>
            </tr>
          ) : waiters?.length > 0 ? (
            waiters.map((waiter,index) => (
              <tr key={waiter._id}>
                <td className="py-4 px-6 border-b text-center">{index + 1}</td>
                <td className="py-4 px-6 border-b text-center">{waiter.name}</td>
                <td className="py-4 px-6 border-b text-center">{waiter.email}</td>
                <td className="py-4 px-6 border-b text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-xl mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-xl">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 px-6 border-b text-center text-gray-500">
                No waiters found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default Waiters;