import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Tables() {

const [tables,setTables] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{
  fetchTables();
},[]);

const fetchTables = async() => {
try{
const res = await fetch("http://localhost:5000/api/tables/table",{
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
});
const result = await res.json();
if(result.success){
  setTables(result.data);
}
  }catch(error){
    console.error("Error fetching tables", error);
  }
  finally{
    setLoading(false);
  }
};





  return (
    <div>

      {/* ADD BUTTON */}
      <div className="flex justify-end">
        <Link to="/admin/addtable">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
            + Add Table
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <table className="w-full table-fixed mt-10">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">S.N</th>
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">Table</th>
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">Area</th>
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">Action</th>
          </tr>
        </thead>

       <tbody className="bg-white">
          {loading ? (
            <tr>
              <td colSpan="4" className="py-4 px-6 border-b text-center">Loading...</td>
            </tr>
          ) : tables && tables.length > 0 ? (
            tables.map((table, index) => (
              <tr key={table._id || index}>
                <td className="py-4 px-6 border-b text-center">{index + 1}</td>
                {/* Changed table.name to table.tableName to match your schema */}
                <td className="py-4 px-6 border-b text-center">{table.tableName}</td>
                <td className="py-4 px-6 border-b text-center">{table.area}</td>
                <td className="py-4 px-6 border-b text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-xl mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-xl">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 px-6 border-b text-center">No tables found.</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default Tables;