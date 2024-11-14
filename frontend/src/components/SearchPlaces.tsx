import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { LocationDrawer } from "./LocationDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Search } from "lucide-react";
import axios from "axios";

interface Position {
  lat: number;
  lng: number;
}
interface CartItem {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

export const PlaceComponent = () => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [manualPosition, setManualPosition] = useState<Position | null>(null);
  const [isEnteringManualAddress, setIsEnteringManualAddress] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
 // const total = useRecoilValue(totalPrice);
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);
  const googleMapsApiKey = import.meta.env.VITE_MAPS_KEY;
  const [locationPermission, setLocationPermission] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [enablePayment, setEnablePayment] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const { toast } = useToast();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries: ["places"],
  });

  useEffect(() => {
    if (locationPermission) {
      requestLocation();
    }
  }, [locationPermission]);
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(existingCart);
  }, []);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(total);
  }, [cart]);


  const enableGeolocation = () => {
    setLocationPermission(true);
  };

  const requestLocation = () => {
    setIsEnteringManualAddress(false);
    if (navigator.geolocation) {
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
        setAddress(data.results[0].formatted_address);
      } else {
        console.log("No address found for this location.");
      }
    } catch (error) {
      console.log("Error fetching address:", error);
    }
  };

  const confirmAddress = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/users/update-address",
        { address },
        { withCredentials: true }
      );
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      });
      setEnablePayment(true);
      console.log("Address updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating address:", error);
      toast({
        title: "Address update failed",
        description:
          "There was an error updating your address. Please try again.",
        variant: "destructive",
      });
    }
  };
  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/payments/pay",
        { total, cartItems: cart },
        { withCredentials: true }
      );

      const paymentLink = response.data.link;
      if (paymentLink) {
        window.location.href = paymentLink;
        localStorage.removeItem("cart");
      } else {
        throw new Error("Payment link not received from server.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast({
        title: "Checkout Failed",
        description:
          "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };


  const handlePlaceChanged = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces();
      if (!places || places.length === 0 || !places[0].geometry) {
        toast({
          title: "No location found",
          description: "Please enter a valid location.",
          variant: "destructive",
        });
        return;
      }
      const place = places[0];
      setManualPosition({
        lat: place.geometry!.location!.lat(),
        lng: place.geometry!.location!.lng(),
      });
      setAddress(place.formatted_address || "");
    }
  };

  if (!isLoaded) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FFF5EB]">
      {!locationPermission && <LocationDrawer onAccept={enableGeolocation} />}

      <div className="container mx-auto p-4">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#FF4500]">
              1) Find your address location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={requestLocation}
                  className="flex-1 bg-[#FF4500] text-white hover:bg-[#FF6347]"
                >
                  <MapPin className="mr-2 h-4 w-4" /> Use My Location
                </Button>
                <Button
                  onClick={() => setIsEnteringManualAddress(true)}
                  variant="outline"
                  className="flex-1 border-[#FF4500] text-[#FF4500] hover:bg-[#FFF5EB]"
                >
                  <Search className="mr-2 h-4 w-4" /> Search Address
                </Button>
              </div>

              {isEnteringManualAddress && (
                <StandaloneSearchBox
                  onLoad={(ref) => (inputRef.current = ref)}
                  onPlacesChanged={handlePlaceChanged}
                >
                  <Input
                    type="text"
                    placeholder="Enter location manually"
                    className="w-full border-[#FF4500] focus:ring-[#FF4500]"
                  />
                </StandaloneSearchBox>
              )}

              <div className="h-64 sm:h-96 w-full rounded-lg overflow-hidden border-2 border-[#FF4500]">
                <GoogleMap
                  center={
                    manualPosition || currentPosition || { lat: 0, lng: 0 }
                  }
                  zoom={15}
                  mapContainerClassName="w-full h-full"
                >
                  {(manualPosition || currentPosition) && (
                    <Marker
                      position={manualPosition ?? (currentPosition as Position)}
                    />
                  )}
                </GoogleMap>
              </div>

              {address && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-[#FF4500]">
                    Your Address:
                  </h3>
                  <p className="text-gray-700">{address}</p>
                </div>
              )}

              <Button
                disabled={!currentPosition && !manualPosition}
                onClick={confirmAddress}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                Confirm Address and Proceed
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#FF4500]">
            2) Complete your payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleCheckout}
                disabled={!enablePayment}
                className="text-gray-900 bg-orange-500 hover:bg-orange-500/90 focus:ring-4 focus:outline-none focus:ring-orange-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4 me-2 -ms-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="paypal"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
                  ></path>
                </svg>
                Check out with PayPal ${total}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
