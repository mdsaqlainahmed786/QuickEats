import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { usernameState } from "../RecoilStates/UserDetails";
import axios from "axios";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const username = useRecoilValue(usernameState);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  }
  useEffect(() => {
    if (username) {
      navigate("/");
    }
  }, [username, navigate]);
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/sign-up",
        {
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      alert("User signed up successfully");
      console.log(response.data);
      navigate("/verify-otp");
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-full max-w-md p-8 bg-red-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-red-500 mb-6">
            Sign Up
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-red-600 mb-1"
              >
                Username
              </label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-red-600 mb-1"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-red-600 mb-1"
              >
                Password
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute top-8 right-3 flex items-center cursor-pointer text-red-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="confirm password"
                className="block text-sm font-medium text-red-600 mb-1"
              >
                Confirm Password
              </label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                onClick={toggleConfirmPasswordVisibility}
                className="absolute top-8 right-3 flex items-center cursor-pointer text-red-500"
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
            </div>

            <Button onClick={handleSignUp} className="w-full py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Sign Up
            </Button>
          </form>
        <span className="text-neutral-400 text-center flex justify-center py-5">Already have an account? <Link className="text-red-500 hover:underline ml-1" to="/sign-in">SignIn</Link></span>
        </div>
      </div>
      <footer className="w-full bg-red-600 text-white text-center py-6">
        <p>© 2024 DeliveryApp. All rights reserved.</p>
      </footer>
    </>
  );
};

export default SignUp;
