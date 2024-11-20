import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { usernameState } from "@/RecoilStates/UserDetails";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyOtp() {
  const [otp, setOtp] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useRecoilState(usernameState);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (username) {
      navigate("/dishes");
    }
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
          return;
        }
        if (username) {
          navigate("/dishes");
        } else {
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
  }, [navigate, username]);

  const handleSubmit = async () => {
    if (!otp) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the OTP sent to your email.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/verify-otp",
        { otp },
        { withCredentials: true }
      );
      setUsername(response.data.userName);
      toast({
        title: "OTP Verified",
        description: "Your OTP has been verified successfully.",
      });

      navigate("/maps");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage("Invalid OTP. Please try again.");
        if (error.response.data.error === "Session expired") {
          toast({
            title: "Session expired",
            description: "Your session has expired. Please sign up again.",
            variant: "destructive",
          });
          navigate("/sign-up");
        }
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5EB]">
      <main className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-136px)]">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-[#FF4500] mb-2">
            Verify OTP
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter the verification code sent to your email
          </p>

          <div className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="w-10 h-12 border-gray-200 bg-gray-50 focus:border-[#FF4500] focus:ring-[#FF4500]"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-10 h-12 border-gray-200 bg-gray-50 focus:border-[#FF4500] focus:ring-[#FF4500]"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-10 h-12 border-gray-200 bg-gray-50 focus:border-[#FF4500] focus:ring-[#FF4500]"
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={3}
                    className="w-10 h-12 border-gray-200 bg-gray-50 focus:border-[#FF4500] focus:ring-[#FF4500]"
                  />
                  <InputOTPSlot
                    index={4}
                    className="w-10 h-12 border-gray-200 bg-gray-50 focus:border-[#FF4500] focus:ring-[#FF4500]"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-10 h-12 border-gray-200 bg-gray-50 focus:border-[#FF4500] focus:ring-[#FF4500]"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <Button
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              disabled={otp.length < 6 || loading}
            >
              {loading ? "Submitting..." : "Verify Code"}
            </Button>

            <p className="text-sm text-center text-gray-500">
              This OTP will expire in{" "}
              <span className="text-[#FF4500]">5 minutes</span>
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-gray-600 text-sm">
        © 2024 QuickEats. All rights reserved.
      </footer>
    </div>
  );
}
