import React from 'react';

function Payments() {
  // Mock data including discounts
  const history = [
    { id: "INV-1024", table: "02", subtotal: 1250, discount: 125, method: "Online", time: "12:45 PM" },
    { id: "INV-1023", table: "05", amount: 450, discount: 0, method: "Cash", time: "12:30 PM" },
    { id: "INV-1022", table: "01", subtotal: 890, discount: 89, method: "Online", time: "12:15 PM" },
    { id: "INV-1021", table: "09", amount: 210, discount: 0, method: "Cash", time: "11:50 AM" },
  ];

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans">
      <main className="max-w-6xl mx-auto py-12">
        
        {/* --- HEADER --- */}
        <header className="mb-12 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-2 block">
              Financial Logs
            </span>
            <h1 className="text-4xl font-black tracking-tighter text-stone-900">
              Payment <span className="font-light text-stone-400">Settlements.</span>
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">Total Discounts Given</p>
            <p className="text-xl font-black text-red-500">- NPR 214.00</p>
          </div>
        </header>

        {/* --- SUMMARY STRIP --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
           <div className="p-8 bg-stone-900 rounded-[2rem] text-white">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1">Cash Received</p>
              <p className="text-2xl font-black tracking-tighter">NPR 15,200</p>
           </div>
           <div className="p-8 bg-orange-500 rounded-[2rem] text-white">
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-200 mb-1">Online Received</p>
              <p className="text-2xl font-black tracking-tighter">NPR 9,600</p>
           </div>
           <div className="p-8 bg-stone-50 border border-stone-100 rounded-[2rem]">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Total Net Revenue</p>
              <p className="text-2xl font-black tracking-tighter">NPR 24,800</p>
           </div>
        </div>

        {/* --- TRANSACTION TABLE --- */}
        <div className="bg-white rounded-[2.5rem] border border-stone-100 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/50">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Invoice</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Table</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Method</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Discount</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-stone-400 text-right">Final Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-b border-stone-50 hover:bg-stone-50/30 transition-colors group">
                  <td className="p-6">
                    <p className="font-bold text-stone-900 text-xs">#{item.id}</p>
                    <p className="text-[9px] text-stone-400 font-medium uppercase tracking-tighter">{item.time}</p>
                  </td>
                  <td className="p-6 text-xs font-black text-stone-600">Table {item.table}</td>
                  <td className="p-6">
                    <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest 
                      ${item.method === 'Online' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                      {item.method}
                    </span>
                  </td>
                  <td className="p-6">
                    {item.discount > 0 ? (
                      <span className="text-xs font-bold text-red-500">
                        - NPR {item.discount}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-stone-300">—</span>
                    )}
                  </td>
                  <td className="p-6 text-right font-black text-stone-900 text-lg">
                    NPR {item.subtotal ? item.subtotal - item.discount : item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}

export default Payments;