import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching live orders from an API

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await fetch('http://localhost:5000/api/orders', {
          headers: {
            "Authorization": `Bearer ${token}` // Include token in Authorization header
          }
        });
        const data = await response.json();
        setOrders(data.orders); // Assuming the API returns an object with an 'orders' array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-stone-900 font-sans">
        <p className="text-lg font-bold">Loading live orders...</p>
      </div>
    );
  }




  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans">
      <main className="max-w-6xl mx-auto py-12 px-6">

        {/* --- HEADER --- */}
        <header className="mb-12 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-2 block">
              Active KOT
            </span>
            <h1 className="text-4xl font-black tracking-tighter text-stone-900">
              Live <span className="font-light text-stone-400">Orders.</span>
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-300">Total Active</p>
            {/* --- FIX 2: Use orders.length --- */}
            <p className="text-2xl font-black">{orders.length}</p>
          </div>
        </header>

        {/* --- ORDERS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* --- FIX 3: Map through orders state --- */}
          {orders.map((order) => (
            <div
              key={order._id}
              className="group bg-white border border-stone-100 rounded-[2rem] p-8 hover:border-orange-500 transition-all duration-500 flex flex-col h-full shadow-sm"
            >
              {/* Top Row: Table & Status */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Table</p>
                  {/* --- FIX 4: Access table name via population or ID --- */}
                  <h2 className="text-4xl font-black tracking-tighter">
                    {order.table?.tableName || "N/A"}
                  </h2>
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border
                  ${order.status === "Pending"
                    ? "bg-orange-50 border-orange-100 text-orange-600"
                    : "bg-stone-900 border-stone-900 text-white"}`}>
                  {order.status}
                </span>
              </div>

              {/* Middle: Items List */}
              <div className="flex-1 mb-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-300 mb-3 text-center border-b border-stone-50 pb-2">Items List</p>
                <ul className="space-y-2">
                  {/* --- FIX 5: Map items based on your Order Schema --- */}
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm font-bold text-stone-700 flex justify-between">
                      <span>{item.menuItem?.itemName || "Item"}</span>
                      <span className="text-stone-300">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom: Total & Time */}
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Order ID</p>
                    <p className="font-bold text-stone-900 text-[10px]">#{order._id.slice(-6)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Total</p>
                    {/* --- FIX 6: Use correct field name totalAmount --- */}
                    <p className="text-xl font-black text-orange-600">Rs {order.totalAmount}</p>
                  </div>
                </div>

                <Link
                  to={`/reception/checkout/${order._id}`}
                  className="block text-center w-full bg-stone-50 group-hover:bg-orange-600 group-hover:text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300"
                >
                  Process Payment
                </Link>

                <p className="text-center mt-4 text-[9px] font-bold text-stone-300 uppercase tracking-widest">
                  Ordered {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-stone-100 rounded-[2rem]">
            <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">No active orders from waiters</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default Orders;