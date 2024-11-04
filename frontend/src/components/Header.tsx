import { useGetUser } from "@/hooks/useGetUser";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usernameState } from "@/RecoilStates/UserDetails";
import { useRecoilState } from "recoil";
import axios from "axios";

const Header = () => {
  const { user, isLoading } = useGetUser();
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(usernameState);

  const onLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/v1/users/logout", {
        withCredentials: true,
      });
      setUsername(null); // Updates the Recoil state
      navigate("/sign-in"); // Redirects immediately after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        setUsername(user.userName); // Set username in Recoil state if user exists
      } else {
        setUsername(null); // Clear username if no user is logged in
      }
    }
  }, [user, isLoading, setUsername]);

  return (
    <div className="flex justify-center w-full bg-gray-100 border-b shadow-sm py-2">
      <div className="flex w-full max-w-[90vw] justify-between items-center">
        <Link to="/">
          <div className="cursor-pointer">
            <span className="text-3xl font-bold text-red-500">Deliver</span>
          </div>
        </Link>
        <div className="flex gap-2 items-center text-red-500">
          {isLoading ? (
            <span>Loading...</span>
          ) : username ? (
            <>
              <span>Welcome, {username}</span>
              <Button
                onClick={onLogout}
                className="cursor-pointer bg-red-500 hover:bg-red-600"
              >
                SignOut
              </Button>
            </>
          ) : (
            <>
              <Link to="/sign-up">
                <span className="cursor-pointer">SignUp</span>
              </Link>
              <Link to="/sign-in">
                <span className="cursor-pointer">SignIn</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
