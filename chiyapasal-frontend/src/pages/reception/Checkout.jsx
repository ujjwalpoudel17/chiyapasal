import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Checkout() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchOrderDetails = async () => {
     try{
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/orders`, {
        headers: { "Authorization" : `Bearer ${token}`}
      }); 

      const data = await res.json();

      if(data.success) {
        const specificOrder = data.orders.find(o=> o._id === orderId);
        setOrder(specificOrder);
      }
     } catch (error) {
      console.error("Error fetching order:",error);
     }finally{
      setLoading(false);
     }
  };
  fetchOrderDetails();
}, [orderId]);

// const handleCashPayment = async () => {
//   try {
//     const token = localStorage.getItem('token');
//   const res = await fetch(`http://localhost:5000/api/orders/${orderId}/pay`, {
//   method: 'PATCH',
//   headers: { 
//     "Content-Type": "application/json", // Crucial for PATCH/POST
//     "Authorization": `Bearer ${token}` 
//   }
// });

//     const data = await res.json();

//     if(data.success){
//       // We pass the current 'order' data to the receipt page so it doesn't have to fetch again
//       navigate('/reception/receipt', { state: { order } });
//     }
//   } catch(error) {
//      alert("Payment Failed: check if server is running");
//   }
// };

const handleCashPayment = () => {
  // Just a simple move to the next step
  navigate('/reception/receipt', { state: { order } });
};


if (loading) return <div className="p-20 text-center font-black uppercase tracking-widest">Loading Bill...</div>;
  if (!order) return <div className="p-20 text-center font-black text-red-500">Order Not Found</div>;

 

  return (
    <div className="min-h-screen bg-white p-6 font-sans text-stone-900">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 mt-30">
        
        {/* --- LEFT: ORDER SUMMARY --- */}
        <div className="flex-1">
          <header className="mb-10">
            <button 
              onClick={() => navigate(-1)}
              className="text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-orange-600 transition-colors mb-4 flex items-center gap-2"
            >
              ← Back to Orders
            </button>
            <h1 className="text-5xl font-black tracking-tighter uppercase">
              Checkout<span className="text-orange-600">.</span>
            </h1>
            <p className="text-stone-400 font-bold text-xs mt-2 uppercase tracking-widest">
              Order Ref: #{orderId?.slice(-6) } — {order.table?.tableName || "Unknown Table"}
            </p>
          </header>

          <div className="space-y-0 border-t border-stone-100">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-6 border-b border-stone-100">
                <div className="flex gap-4 items-center">
                  <span className="bg-stone-100 text-stone-900 w-8 h-8 flex items-center justify-center text-[10px] font-black">
                    {item.quantity}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-tight">{item.menuItem?.itemName || "Deleted Item"}</h3>
                    <p className="text-[10px] text-stone-400 font-bold tracking-widest">UNIT PRICE: NPR {item.menuItem?.price || 0}</p>
                  </div>
                </div>
                <p className="font-black text-sm">NPR {(item.menuItem?.price || 0) * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: PAYMENT PANEL --- */}
        <div className="w-full md:w-[380px]">
          <div className="bg-stone-50 p-8 border border-stone-100">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-stone-200 pb-4">
              Payment Summary
            </h2>
            
            <div className="space-y-4 mb-10">
              <div className="flex justify-between text-sm font-bold text-stone-500">
                <span>SUBTOTAL</span>
                <span>NPR {order.totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-500">
                <span>TAX (0%)</span>
                <span>NPR 0.00</span>
              </div>
              <div className="flex justify-between items-end pt-6">
                <span className="text-xs font-black uppercase tracking-widest">Amount Due</span>
                <span className="text-4xl font-black text-stone-900 tracking-tighter">
                  NPR {order.totalAmount}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button onClick={handleCashPayment} className="w-full bg-stone-900 text-white py-5 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-600 transition-all">
                Cash Payment
              </button>
              <button className="w-full bg-white border border-stone-200 text-stone-900 py-5 font-black text-[10px] uppercase tracking-[0.2em] hover:border-stone-900 transition-all">
                Digital Wallet 
              </button>
            </div>

            <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest text-center mt-8">
              Processing this will free {order.table?.tableName}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;




// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// function Checkout() {
//   const { orderId } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isPaid, setIsPaid] = useState(false); // New state to toggle views

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`http://localhost:5000/api/orders`, {
//           headers: { "Authorization": `Bearer ${token}` }
//         });
//         const data = await res.json();
//         if (data.success) {
//           const specificOrder = data.orders.find(o => String(o._id) === String(orderId));
//           setOrder(specificOrder);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrderDetails();
//   }, [orderId]);

//   const handleCashPayment = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:5000/api/orders/${orderId}/pay`, {
//         method: 'PATCH',
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       const data = await res.json();
//       if (data.success) {
//         setIsPaid(true); // Switch to Receipt View
//       }
//     } catch (error) {
//       alert("Payment Failed");
//     }
//   };

//   if (loading) return <div className="p-20 text-center font-black">LOADING...</div>;
//   if (!order) return <div className="p-20 text-center font-black text-red-500">ORDER NOT FOUND</div>;

//   // --- VIEW 1: THE RECEIPT (Shown after Payment) ---
//  if (isPaid) {
//   return (
//     <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 font-sans">
//       {/* RECEIPT CARD */}
//       <div 
//         id="printable-receipt" 
//         className="max-w-md w-full bg-white shadow-2xl shadow-stone-200/50 rounded-[2rem] p-10 relative overflow-hidden"
//       >
//         {/* TOP ACCENT BAR */}
//         <div className="absolute top-0 left-0 w-full h-2 bg-orange-600"></div>

//         {/* SUCCESS ICON & HEADER */}
//         <div className="text-center mb-10">
//           <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
//              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//              </svg>
//           </div>
//           <h1 className="text-2xl font-black tracking-tighter uppercase">Payment Success</h1>
//           <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mt-1">Thank you for dining with us</p>
//         </div>

//         {/* DETAILS TABLE */}
//         <div className="space-y-6 mb-10">
//           <div className="flex justify-between border-b border-stone-50 pb-4">
//             <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Order Details</span>
//             <span className="text-[10px] font-black text-stone-900 uppercase tracking-widest">#{orderId.slice(-6)}</span>
//           </div>

//           <div className="space-y-4">
//             {order.items.map((item, i) => (
//               <div key={i} className="flex justify-between items-center text-sm">
//                 <div className="flex flex-col">
//                   <span className="font-bold text-stone-800">{item.menuItem?.itemName}</span>
//                   <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Qty: {item.quantity}</span>
//                 </div>
//                 <span className="font-black text-stone-900">NPR {item.quantity * item.menuItem?.price}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* TOTAL BOX */}
//         <div className="bg-stone-50 rounded-3xl p-6 mb-10 border border-stone-100">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-xs font-bold text-stone-500 uppercase">Total Amount</span>
//             <span className="text-2xl font-black text-stone-900 tracking-tighter">NPR {order.totalAmount}</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Table</span>
//             <span className="text-xs font-black text-orange-600 uppercase tracking-widest">{order.table?.tableName}</span>
//           </div>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex flex-col gap-3 no-print">
//           <button 
//             onClick={() => window.print()} 
//             className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-stone-200"
//           >
//             Download / Print Receipt
//           </button>
//           <button 
//             onClick={() => navigate('/reception/orders')} 
//             className="w-full bg-transparent text-stone-400 py-2 font-black text-[9px] uppercase tracking-widest hover:text-stone-900 transition-colors"
//           >
//             Close & Exit
//           </button>
//         </div>

//         {/* LOGO/BRANDING FOOTER */}
//         <div className="mt-10 pt-6 border-t border-dashed border-stone-200 text-center">
//             <p className="text-[8px] font-black text-stone-300 uppercase tracking-[0.4em]">HMS TERMINAL V2.0</p>
//         </div>
//       </div>
//     </div>
//   );
// }

//   // --- VIEW 2: THE CHECKOUT (Initial View) ---
//   return (
//     <div className="min-h-screen bg-white p-6 font-sans text-stone-900">
//       <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 mt-20">
//         <div className="flex-1">
//           <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">Checkout<span className="text-orange-600">.</span></h1>
//           <p className="text-stone-400 font-bold text-xs uppercase tracking-widest mb-10">Ref: #{orderId.slice(-6)} — {order.table?.tableName}</p>
//           <div className="border-t border-stone-100">
//             {order.items.map((item, index) => (
//               <div key={index} className="flex justify-between py-6 border-b border-stone-100">
//                 <span className="font-bold text-sm uppercase">{item.quantity}x {item.menuItem?.itemName}</span>
//                 <span className="font-black">NPR {item.quantity * item.menuItem?.price}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="w-full md:w-[380px]">
//           <div className="bg-stone-50 p-8 border border-stone-100">
//             <h2 className="text-xs font-black uppercase tracking-widest mb-8 border-b border-stone-200 pb-4">Payment Summary</h2>
//             <div className="flex justify-between items-end mb-10">
//                 <span className="text-xs font-black uppercase">Total Due</span>
//                 <span className="text-4xl font-black text-stone-900">NPR {order.totalAmount}</span>
//             </div>
//             <button onClick={handleCashPayment} className="w-full bg-stone-900 text-white py-5 font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all">
//               Cash Payment
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;