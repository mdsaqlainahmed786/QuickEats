import { PlaceComponent } from "@/components/SearchPlaces";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usernameState } from "@/RecoilStates/UserDetails";
import { useRecoilValue} from "recoil";
const MapsPage = () => {
    const navigate = useNavigate();
    const username = useRecoilValue(usernameState);
    useEffect(() => {
        if (!username) {
            navigate("/sign-in");
        }
    }, [username, navigate]);
  return <PlaceComponent />;
};

export default MapsPage;
