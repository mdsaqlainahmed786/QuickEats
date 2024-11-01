import { PlaceComponent } from "@/components/SearchPlaces";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usernameState } from "@/RecoilStates/UserDetails";
import { useRecoilValue } from "recoil";
import { useGetUser } from "@/hooks/useGetUser";

const MapsPage = () => {
  const navigate = useNavigate();
  const username = useRecoilValue(usernameState);
  const { user } = useGetUser();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Wait for user data to be fetched
    if (user === null && isInitialized) {
      navigate("/sign-in");
    }

    // Mark as initialized once we get the first response
    if (!isInitialized && user !== undefined) {
      setIsInitialized(true);
    }
  }, [user, isInitialized, navigate]);

  // Show loading state while waiting for initial user data
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  // If we're initialized but have no user, the useEffect will handle navigation
  if (!user) {
    return null;
  }

  return <PlaceComponent />;
};

export default MapsPage;