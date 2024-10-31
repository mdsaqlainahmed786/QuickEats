//import { LocationDrawer } from "@/components/LocationDrawer";
import Header from "./components/Header";
//import { PlaceComponent } from "./components/SearchPlaces";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
function App() {
  return (
    <>
      <Header />
      {/* <PlaceComponent /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      {/* <LocationDrawer /> */}
    </>
  );
}

export default App;
