// Import all needed dependencies
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

// Import All Pages
import Account from "./pages/Account/Account";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Invoices from "./pages/Invoices/Invoices";

// Import Listen
import { listen } from "./app/Features/listener";

function App() {
  // Call Listen once the App renders
  useEffect(() => {
    listen();
  }, [])
  return (
    <div className="App">
      {/* Routing All Pages */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Cart />} />
          <Route path="/invoice/:order_id" element={<Invoices />} />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
