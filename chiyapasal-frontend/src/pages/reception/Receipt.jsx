import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Receipt() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;
  const [isProcessing, setIsProcessing] = useState(false);

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <button 
        onClick={() => navigate('/reception/orders')}
        className="px-6 py-3 bg-stone-900 text-white font-black uppercase text-[10px] tracking-widest rounded-full"
      >
        Order Not Found — Return
      </button>
    </div>
  );

  const handleFinalConfirm = async () => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/orders/${order._id}/pay`, {
        method: 'PATCH',
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" 
        }
      });
      const data = await res.json();
      if (data.success) navigate('/reception/orders');
    } catch (error) {
      alert("System error: Could not clear table.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center p-6 font-sans antialiased text-stone-900">
      <div 
        id="printable-receipt" 
        className="max-w-[420px] w-full bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden relative border border-stone-100"
      >
        {/* TOP STATUS BAR */}
        <div className="bg-orange-50 px-8 py-3 flex justify-between items-center border-b border-orange-100/50">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-600">Unpaid Invoice</span>
          <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">{order.table?.tableName}</span>
        </div>

        <div className="p-10">
          {/* HEADER */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase leading-none mb-2">
                Bill<span className="text-orange-600">.</span>
              </h1>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                Ref: #{order._id.slice(-6).toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1">Date</p>
              <p className="text-xs font-bold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* ITEM LIST */}
          <div className="space-y-6 mb-12">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-start group">
                <div className="flex gap-4">
                  <span className="text-xs font-black text-stone-300 tabular-nums">{item.quantity}×</span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-tight text-stone-800 leading-none mb-1">
                      {item.menuItem?.itemName}
                    </p>
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                      NPR {item.menuItem?.price} / Unit
                    </p>
                  </div>
                </div>
                <p className="text-sm font-black text-stone-900 tabular-nums">
                  NPR {item.quantity * item.menuItem?.price}
                </p>
              </div>
            ))}
          </div>

          {/* THE TEAR LINE */}
          <div className="relative h-px w-full border-t border-dashed border-stone-200 mb-10">
            <div className="absolute -left-[52px] -top-2 w-4 h-4 rounded-full bg-[#F9F9F8] border border-stone-100"></div>
            <div className="absolute -right-[52px] -top-2 w-4 h-4 rounded-full bg-[#F9F9F8] border border-stone-100"></div>
          </div>

          {/* TOTAL SUMMARY */}
          <div className="space-y-3 mb-12">
            <div className="flex justify-between text-xs font-bold text-stone-400 uppercase tracking-widest">
              <span>Subtotal</span>
              <span className="text-stone-900">NPR {order.totalAmount}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-stone-400 uppercase tracking-widest">
              <span>Tax (0%)</span>
              <span className="text-stone-900">NPR 0.00</span>
            </div>
            <div className="pt-4 flex justify-between items-end">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-stone-900">Total Due</span>
              <span className="text-4xl font-black tracking-tighter text-stone-900 leading-none">
                NPR {order.totalAmount}
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="space-y-3 no-print">
            <button 
              onClick={handleFinalConfirm}
              disabled={isProcessing}
              className={`w-full py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl transition-all duration-300 ${
                  isProcessing 
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
                  : 'bg-stone-900 text-white hover:bg-orange-600 hover:-translate-y-1 active:scale-95'
              }`}
            >
              {isProcessing ? 'Processing Transaction...' : 'Confirm Payment & Close Order'}
            </button>
            
            <button 
              onClick={() => window.print()}
              className="w-full text-stone-400 py-2 font-black text-[9px] uppercase tracking-[0.2em] hover:text-stone-900 transition-colors"
            >
              Print Customer Copy
            </button>
          </div>

          <p className="text-center mt-10 text-[8px] font-black text-stone-300 uppercase tracking-[0.5em]">
            Powered by Chiya Pasal
          </p>
        </div>
      </div>
    </div>
  );
}

export default Receipt;