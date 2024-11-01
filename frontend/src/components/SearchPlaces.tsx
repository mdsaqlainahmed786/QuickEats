// PlaceComponent.js
import { useState, useRef } from "react";
import { GoogleMap, Marker, StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { LocationDrawer } from "./LocationDrawer";

interface Position {
  lat: number;
  lng: number;
}

export const PlaceComponent = () => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [manualPosition, setManualPosition] = useState<Position | null>(null);
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const handlePlaceChanged = () => {
    if (inputRef.current) {
      const [place] = inputRef.current.getPlaces();
      if (place && place.geometry) {
        setManualPosition({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      {!locationPermission && <LocationDrawer onAccept={enableGeolocation} />}

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Find Your Location</h2>

        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter location manually"
            className="w-full p-2 border rounded mb-4"
          />
        </StandaloneSearchBox>

        <div className="map-container h-96 relative">
          <GoogleMap
            center={manualPosition || currentPosition || { lat: 0, lng: 0 }}
            zoom={15}
            mapContainerClassName="w-full h-full"
          >
            {(manualPosition || currentPosition) && (
              <Marker position={manualPosition ?? (currentPosition as Position)} />
            )}
          </GoogleMap>
        </div>
      </div>
    </>
  );
};
