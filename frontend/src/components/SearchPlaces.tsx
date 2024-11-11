import { useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { LocationDrawer } from "./LocationDrawer";
import { Button } from "./ui/button";
import axios from "axios";
interface Position {
  lat: number;
  lng: number;
}
export const PlaceComponent = () => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [manualPosition, setManualPosition] = useState<Position | null>(null);
  const [isEnteringmanualAdress, setIsEnteringManualAddress] = useState(false);
  const [isLocationPermission, setIsLocationPermission] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);
  const googleMapsApiKey = import.meta.env.VITE_MAPS_KEY;
  const [locationPermission, setLocationPermission] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries: ["places"],
  });

  const enableGeolocation = () => {
    setLocationPermission(true);
    requestLocation();
  };

  const requestLocation = () => {
    setIsEnteringManualAddress(false);
    if (navigator.geolocation || isLocationPermission) {
      setIsLocationPermission(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(pos);
          await fetchAddress(pos);
        },
        (error) => {
          console.log("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const fetchAddress = async ({ lat, lng }: Position) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted_address); // Store the formatted address
      } else {
        console.log("No address found for this location.");
      }
    } catch (error) {
      console.log("Error fetching address:", error);
    }
  };
  const confirmAddress = async () => {
    const response = await axios.put(
      "http://localhost:3000/api/v1/users/update-address",
      {
        address,
      },
      {
        withCredentials: true,
      }
    );
    alert("Address updated successfully");
    console.log("Address updated successfully:", response.data);
  };
  const handlePlaceChanged = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces();
      if (!places || places.length === 0 || !places[0].geometry) {
        alert("No such place exists. Please enter a valid location.");
        return;
      }
      const place = places[0];
      setManualPosition({
        lat: place!.geometry!.location!.lat(),
        lng: place!.geometry!.location!.lng(),
      });
      setAddress(place.formatted_address || ""); // Set the manual address if available
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      {!locationPermission && <LocationDrawer onAccept={enableGeolocation} />}

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Find your address location
        </h2>
        <div
          className={`flex w-[100%] justify-center flex-col lg:flex-row ${
            isEnteringmanualAdress ? "lg:justify-between" : ""
          }`}
        >
          <StandaloneSearchBox
            onLoad={(ref) => (inputRef.current = ref)}
            onPlacesChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter location manually"
              className={`lg:w-[1219px] w-full p-2 border ${
                isEnteringmanualAdress ? "block" : "hidden"
              } border-red-500 rounded mb-4 outline-red-500`}
            />
          </StandaloneSearchBox>
          <div className="flex justify-center space-x-2 items-center lg:mb-4">
            <Button
              onClick={requestLocation}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 lg:ml-3"
            >
              Use My Location
            </Button>
            <Button
              onClick={() => {
                setIsEnteringManualAddress(true);
              }}
              className="border-2 border-red-500 bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-100"
            >
              Search Address
            </Button>
          </div>
        </div>
        <div className="map-container h-96 relative mt-4">
          <GoogleMap
            center={manualPosition || currentPosition || { lat: 0, lng: 0 }}
            zoom={15}
            mapContainerClassName="w-full mx-auto max-w-[80vw] border border-red-500 h-full"
          >
            {(manualPosition || currentPosition) && (
              <Marker
                position={manualPosition ?? (currentPosition as Position)}
              />
            )}
          </GoogleMap>
        </div>

        {address && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Your Address:</h3>
            <p>{address}</p>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <Button
          disabled={!currentPosition && !manualPosition}
          onClick={confirmAddress}
          className="bg-red-500"
        >
          Confirm Address and Proceed
        </Button>
      </div>
    </>
  );
};
