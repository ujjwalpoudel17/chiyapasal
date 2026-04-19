import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function OrderForm() {
  const { tableName, tableId } = useParams();
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  fetchMenu();
}, []);

const fetchMenu = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/menus/menus", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    const result = await res.json();
    if (result.success) {
      setMenu(result.data);
    }
  } catch (error) {
    console.error("Error fetching menu", error);
  }
};


//for placing an order
const handlePlaceOrder = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        table: tableId,
        items: cart.map(item => ({
          menuItem: item._id,
          quantity: item.qty
        })),
        totalAmount: cart.reduce((s, i) => s + (i.price * i.qty), 0)
      })
    });
    const result = await res.json();
    if (result.success) {
      alert("Order placed successfully!");
      setCart([]);


      navigate("/waiter");
    } else {
      alert("Failed to place order");
    }
  } catch (error) {
    console.error("Error placing order", error);
    alert("An error occurred while placing the order");
  }
};




//add a menu item to the order
const addToOrder = (item) => {
  setCart((prevOrder) => {
    // 1. Check if the item is already in the order list
    // IMPORTANT: Use _id if your MongoDB uses _id
    const existingItem = prevOrder.find((orderItem) => orderItem._id === item._id);

    if (existingItem) {
      // 2. If it exists, map through and increase ONLY that item's quantity
      return prevOrder.map((orderItem) =>
        orderItem._id === item._id
          ? { ...orderItem, qty: orderItem.qty + 1 }
          : orderItem
      );
    }

    // 3. If it does NOT exist, add it as a new row with qty 1
    // We spread the original item and add a qty property
    return [...prevOrder, { ...item, qty: 1 }];
  });
};

//logic to change the quantity of an item in the order
// 2. Logic to change quantity (+ or -)
const updateQty = (id, delta) => {
  setCart((prevOrder) =>
    prevOrder.map((item) =>
      item._id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    )
  );
};


// logic to remove an item from the order
const removeFromOrder = (id) => {
  setCart((prevOrder) => prevOrder.filter((item) => item._id !== id));
};



  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen font-sans text-slate-800">

      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900">Table: {tableName}</h1>
        <div className="h-1 w-12 bg-orange-500 rounded-full mt-1"></div>
      </div>
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900">NEW ORDER</h1>
        <div className="h-1 w-12 bg-orange-500 rounded-full mt-1"></div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: MENU SELECTION */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Menu Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {menu.map(item => (
                <button 
                  key={item._id}
                  onClick={() => addToOrder(item)}
                  className="flex flex-col text-left p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-orange-400 hover:bg-white transition-all group"
                >
                  <span className="font-bold text-slate-700">{item.itemName}</span>
                  <div className="flex justify-between items-center mt-2 w-full">
                    <span className="text-sm text-orange-600 font-semibold">Rs {item.price}</span>
                    <span className="text-[10px] bg-white px-2 py-1 rounded shadow-sm text-gray-400 group-hover:text-orange-500 uppercase">Add +</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: QUANTITY LIST & TOTAL */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col h-full sticky top-4">
            
            <div className="p-6 border-b border-gray-50">
              <h2 className="text-lg font-bold flex items-center justify-between">
                Current Order
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-500">{cart.length} {cart.length === 1 ? 'Item' : 'Items'}</span>
              </h2>
            </div>

            {/* LIST OF SELECTED ITEMS */}
          {/* LIST OF SELECTED ITEMS */}
<div className="p-6 space-y-4 overflow-y-auto max-h-[400px]">
  {cart.length === 0 ? (
    <div className="text-center py-12">
      <div className="text-4xl mb-2">🍽️</div>
      <p className="text-gray-400 text-sm italic">Order is empty</p>
    </div>
  ) : (
    cart.map(item => (
      <div key={item._id} className="flex items-center justify-between bg-white border-b border-gray-50 pb-4 last:border-0">
        <div className="flex-1">
          <p className="font-bold text-slate-800 text-sm">{item.itemName}</p>
          {/* FIX: Show total for this item (Price x Qty) */}
          <p className="text-xs font-bold text-orange-600">
            Rs {item.price * item.qty} 
            <span className="text-gray-400 font-normal ml-1">({item.qty} × {item.price})</span>
          </p>
        </div>

        {/* QUANTITY CONTROLS */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button 
              /* FIX: Changed from removeFromOrder to updateQty */
              onClick={() => updateQty(item._id, -1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 font-bold"
            >
              &minus;
            </button>
            <span className="w-8 text-center text-sm font-bold bg-white">{item.qty}</span>
            <button 
              onClick={() => updateQty(item._id, 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 font-bold"
            >
              +
            </button>
          </div>
          
          <button 
            onClick={() => removeFromOrder(item._id)}
            className="text-gray-300 hover:text-red-500 transition-colors ml-2 text-xl"
          >
            &times;
          </button>
        </div>
      </div>
    ))
  )}
</div>
            {/* TOTAL & SUBMIT */}
            <div className="mt-auto p-6 bg-gray-50 rounded-b-3xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 font-medium">Grand Total</span>
                <span className="text-2xl font-black text-slate-900">
                  Rs {cart.reduce((s, i) => s + (i.price * i.qty), 0)}
                </span>
              </div>

              <button onClick={handlePlaceOrder}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-slate-200"
              >
                PLACE ORDER
              </button>
              <button 
                onClick={() => setCart([])}
                className="w-full mt-3 text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}