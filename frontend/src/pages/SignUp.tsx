import React, { useState } from 'react'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-red-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">Sign Up</h2>

        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-red-600 mb-1">Username</label>
            <Input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-red-600 mb-1">Email</label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-red-600 mb-1">Password</label>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute top-8 right-3 flex items-center cursor-pointer text-red-500"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>

          <Button className="w-full py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
