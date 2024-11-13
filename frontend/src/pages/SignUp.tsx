
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import axios from "axios"
import { Eye, EyeOff } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Link} from "react-router-dom"
import { usernameState } from "@/RecoilStates/UserDetails"
import { useToast } from "@/hooks/use-toast"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()
  const username = useRecoilValue(usernameState)
  const { toast } = useToast()

  useEffect(() => {
    if (username) {
      navigate("/")
    }
  }, [username, navigate])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        toast({
          title: "Passwords do not match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        })
        return
      }
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/sign-up",
        {
          userName,
          email,
          password,
        },
        { withCredentials: true }
      )
      toast({
        title: "Sign up successful",
        description: "Please verify your email to continue.",
      })
      console.log(response.data)
      navigate("/verify-otp")
      window.location.reload()
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data)
      } else {
        console.log(error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF5EB]">

      <main className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-136px)]">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-[#FF4500] mb-2">Sign Up</h1>
          <p className="text-gray-600 text-center mb-6">
            Create your account to get started
          </p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <Input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign Up
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-[#FF4500] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </main>

      <footer className="text-center py-4 text-gray-600 text-sm">
        © 2024 QuickEats. All rights reserved.
      </footer>
    </div>
  )
}