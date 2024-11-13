import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Orders from "./pages/Orders";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import MapsPage from "./pages/MapsPage";
import VerifyOtp from "./pages/VerifyOtp";
import Dishes from "./pages/Dishes";
import Cart from "./pages/Cart";
import SuccessPage from "./pages/Sucess";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path='/success' element={<SuccessPage />} />
          <Route path="/add-address" element={<MapsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
