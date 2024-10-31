//import { LocationDrawer } from "@/components/LocationDrawer";
import Header from "./components/Header";
import { PlaceComponent } from "./components/SearchPlaces";
import "./App.css";
import { BrowserRouter, Router, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <PlaceComponent />
      <BrowserRouter>
        <Routes>
          {/* <Router path="/" element={<PlaceComponent />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <LocationDrawer /> */}
    </>
  );
}

export default App;
