import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const VerifyOtp = () => {
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

          {/* OTP Input Fields */}
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
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

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-[65%] text-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2 mt-4"
            >
              Submit
            </Button>
          </div>

          {/* Resend OTP */}
          <p className="text-neutral-600 text-center text-sm mt-4">
            This OTP will expire in 5 minutes.{" "}
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
