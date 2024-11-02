//import { LocationDrawer } from "@/components/LocationDrawer";
import Header from "./components/Header";
//import { PlaceComponent } from "./components/SearchPlaces";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import MapsPage from "./pages/MapsPage";
import VerifyOtp from "./pages/VerifyOtp";
function App() {
  return (
    <>
      {/* <PlaceComponent /> */}
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/maps" element={<MapsPage />} />
          <Route path="/verify-otp" element={<VerifyOtp/>} />
        </Routes>
      </BrowserRouter>
      {/* <LocationDrawer /> */}
    </>
  );
}

export default App;
