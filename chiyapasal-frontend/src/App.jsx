// import { Routes, Route, BrowserRouter } from "react-router-dom";

// import Login from "./pages/auth/Login";
// import Admin from "./pages/admin/Admin";
// import WaiterDashboard from "./pages/waiter/WaiterDashboard";
// import WaiterRegisterForm from "./pages/admin/WaiterRegisterForm";
// import ReceptionDashboard from "./pages/reception/ReceptionDashboard";
// import { useState } from "react";

// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
// const [user, setUser] = useState(null);
//   return (
//     <BrowserRouter>
//    <Routes>

//   <Route path="/" element={<Login />} />

//   {/* ADMIN */}
//   <Route
//     path="/admin"
//     element={
//       <ProtectedRoute role="admin">
//         <Admin />
//       </ProtectedRoute>
//     }
//   />

//   {/* ADMIN creates waiter */}
//   <Route
//     path="/admin/create-waiter"
//     element={
//       <ProtectedRoute role="admin">
//         <WaiterRegisterForm />
//       </ProtectedRoute>
//     }
//   />

//   {/* WAITER */}
//   <Route
//     path="/waiter"
//     element={
//       <ProtectedRoute role="waiter">
//         <WaiterDashboard />
//       </ProtectedRoute>
//     }
//   />

//   {/* RECEPTION */}
//   <Route
//     path="/reception"
//     element={
//       <ProtectedRoute role="reception">
//         <ReceptionDashboard />
//       </ProtectedRoute>
//     }
//   />

// </Routes>
//       </BrowserRouter>
//   );
// }

// export default App;




import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/auth/Login";
import Admin from "./pages/admin/Admin";
import WaiterRegisterForm from "./pages/admin/WaiterRegisterForm";
import Dashboard from "./pages/admin/Dashboard";
import Tables from "./pages/admin/Tables";
import Waiters from "./pages/admin/Waiters";
import Menus from "./pages/admin/Menus";
import AddMenu from "./pages/admin/AddMenu";
import AddTable from "./pages/admin/AddTable";
import Reception from "./pages/reception/Reception";
import Orders from "./pages/reception/Orders";
import OrderForm from "./pages/waiter/OrderFrom";
import Checkout from "./pages/reception/Checkout";
import Receipt from "./pages/reception/Receipt";



import WaiterDashboard from "./pages/waiter/WaiterDashboard";
import ReceptionDashboard from "./pages/reception/ReceptionDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Payments from "./pages/reception/Payments";
import WaiterLayout from "./pages/waiter/WaiterLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        {/* ✅ ADMIN WITH SIDEBAR */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="waiters" element={<Waiters />} />
          <Route path="add-waiters" element={<WaiterRegisterForm />} />
          <Route path="tables" element={<Tables />} />
          <Route path="menus" element={<Menus />} />
          <Route path="addmenu" element={<AddMenu />} />
          <Route path="addtable" element={<AddTable />} />
          

        </Route>

        {/* WAITER */}
        <Route
          path="/waiter"
          element={
            <ProtectedRoute role="waiter">
              <WaiterLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<WaiterDashboard />} />
          <Route path="orderform/:tableId/:tableName?" element={<OrderForm />} />
        </Route>





        {/* RECEPTION */}
        <Route
          path="/reception"
          element={
            <ProtectedRoute role="reception">
              <Reception />
            </ProtectedRoute>
          }
        >
 <Route index element={<ReceptionDashboard/>} />
 <Route path="orders" element={<Orders />} />
  <Route path="payments" element={<Payments />} />
  <Route path="checkout/:orderId" element={<Checkout />} />


  <Route path="receipt" element={<Receipt />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;