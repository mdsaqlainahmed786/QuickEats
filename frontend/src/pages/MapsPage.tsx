import { PlaceComponent } from "@/components/SearchPlaces";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetUser } from "@/hooks/useGetUser";

const MapsPage = () => {
  const navigate = useNavigate();
  // const username = useRecoilValue(usernameState);
  const { user } = useGetUser();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (user === null && isInitialized) {
      navigate("/sign-in");
    }

    if (!isInitialized && user !== undefined) {
      setIsInitialized(true);
    }
  }, [user, isInitialized, navigate]);
  if (!isInitialized) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return null;
  }

  return <PlaceComponent />;
};

export default MapsPage;