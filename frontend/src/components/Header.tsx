import { useGetUser } from "@/hooks/useGetUser";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Header = () => {
  const { user } = useGetUser();
  const navigate = useNavigate();
  console.log("THIS IS USER", user);
  const onLogout = async() => {
    await axios.get("http://localhost:3000/api/v1/users/logout", {
      withCredentials: true
    });
    navigate("/sign-in");
    window.location.reload();
  }
  // const res = useGetUser();
  // console.log(res);
  return (
    <>
      <div className="flex justify-center w-full bg-gray-100 border-b shadow-sm py-2">
        <div className="flex w-full max-w-[90vw] justify-between items-center">
          <Link to="/">
            <div className="cursor-pointer">
              <span className="text-3xl font-bold text-red-500">Deliver</span>
            </div>
          </Link>
          <div className="flex gap-2 items-center text-red-500">
            {user ? (
              <>
                <span>Welcome, {user.userName}</span>
                <Button onClick={onLogout} className="cursor-pointer bg-red-500 hover:bg-red-600">
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
    </>
  );
};

export default Header;
