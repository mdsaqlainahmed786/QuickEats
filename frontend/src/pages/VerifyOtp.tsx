import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usernameState } from "@/RecoilStates/UserDetails";

const VerifyOtp = () => {
  const [otp, setOtp] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useRecoilState(usernameState);
  const navigate = useNavigate();

  useEffect(() => {
  
  }, [username, navigate]);

  useEffect(() => {
    const fetchingUnAuthUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/unauthorized",
          { withCredentials: true }
        );

        if (response.data.message === "Enter otp") {
          setErrorMessage(null);
          return
        } 
        if (username) {
          navigate("/maps");
        } 
        else {
          navigate("/sign-up");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (
            error.response.data.error === "Session expired" ||
            error.response.data.error === "Unauthorized to enter otp"
          ) {
            navigate("/sign-up");
          } else {
            setErrorMessage("An error occurred. Please try again.");
          }
        }
      }
    };

    fetchingUnAuthUser();
  }, [navigate]);

  const handleSubmit = async () => {
    if (!otp) {
      alert("OTP is required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/verify-otp",
        { otp },
        { withCredentials: true }
      );
      console.log(response.data.userName);
      setUsername(response.data.userName);
      alert("OTP submitted successfully: " + otp);
      navigate("/maps");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage("Invalid OTP. Please try again.");
        if (error.response.data.error === "Session expired") {
          alert("Session expired. Redirecting to signup page.");
          navigate("/sign-up");
        }
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-white px-4">
        <div className="w-full max-w-md p-8 bg-red-50 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-red-500 mb-4">
            Verify OTP
          </h2>
          <p className="text-neutral-600 text-center text-sm mb-6">
            A 6-digit OTP has been sent to your registered email.
          </p>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              className="flex justify-center mb-6 space-x-2"
            >
              <InputOTPGroup className="border-red-600">
                <InputOTPSlot index={0} className="border-red-400" />
                <InputOTPSlot index={1} className="border-red-400" />
                <InputOTPSlot index={2} className="border-red-400" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} className="border-red-400" />
                <InputOTPSlot index={4} className="border-red-400" />
                <InputOTPSlot index={5} className="border-red-400" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              type="submit"
              className="w-[65%] text-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2 mt-4"
            >
              Submit
            </Button>
          </div>

          <p className="text-neutral-600 text-center text-sm mt-4">
            This OTP will expire in 5 minutes.
          </p>
        </div>
      </div>
      <footer className="w-full bg-red-600 text-white text-center py-6">
        <p>© 2024 DeliveryApp. All rights reserved.</p>
      </footer>
    </>
  );
};

export default VerifyOtp;
