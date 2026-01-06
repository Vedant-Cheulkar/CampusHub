import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import AddProduct from "./pages/AddProduct";
import Xerox from "./pages/Xerox";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import Forgot from "./pages/Forgot";
import OrderDetails from "./pages/OrderDetails";


if (!localStorage.getItem("user")) {
  localStorage.setItem(
    "user",
    JSON.stringify({
      email: "user@gmail.com",
      password: "123456",
      name: "Rahul Patil"
    })
  );
}


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="/home" element={<Home />} />
        <Route path="/marketplace" element={<ProtectedRoute> <Marketplace /> </ProtectedRoute>} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/xerox" element={<Xerox />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
