import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Menus() {

const[menus, setMenus] = useState([]);
const [loading,setLoading] = useState([true]);

useEffect(()=>{
  fetchMenus();
},[]);

const fetchMenus = async() => {
try{
const res = await fetch("http://localhost:5000/api/menus/menus",{
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
});
const result = await res.json();
if(result.success){
  setMenus(result.data);
}
  }catch(error){
    console.error("Error fetching menus", error);
  }
  finally{
    setLoading(false);
  }
};





  return (
    <div>

      {/* ADD BUTTON */}
      <div className="flex justify-end">
        <Link to="/admin/addmenu">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
            + Add Menu Items
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <table className="w-full table-fixed mt-10">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">S.N</th>
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">Item Name</th>
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">Type</th>
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">Ingredients</th>
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">Price</th>
            <th className="w-1/5 py-4 px-6 text-center font-bold uppercase">Action</th>
          </tr>
        </thead>

  <tbody className="bg-white">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-500">
                  <div className="animate-pulse">Loading menu items...</div>
                </td>
              </tr>
            ) : menus.length > 0 ? (
              menus.map((item, index) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-center font-medium text-gray-900">{index + 1}</td>
                  <td className="py-4 px-6 text-center">
                    {item.image ? (
                      <img 
                        src={`http://localhost:5000/${item.image}`} 
                        alt={item.itemName} 
                        className="w-12 h-12 object-cover rounded-lg mx-auto border"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto flex items-center justify-center text-[10px]">No Image</div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-gray-800">{item.itemName}</td>
                  <td className="py-4 px-6 text-center">{item.category}</td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold">NPR {item.price}</td>
                 <td className="py-4 px-6 border-b text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-xl mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-xl">Delete</button>
                </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-400">
                  No menu items found. Click "+ Add Menu Items" to start.
                </td>
              </tr>
            )}
          </tbody>
      </table>

    </div>
  );
}

export default Menus;