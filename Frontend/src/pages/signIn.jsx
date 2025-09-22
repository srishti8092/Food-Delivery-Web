import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";

function SignIn() {
  const primaryClr = "#ff4d2d";
  const bgClr = "#fff9f6";
  const borderClr = "#ddd";

  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignIn=async()=>{
    try{
      const result = await axios.post(`${serverUrl}/api/auth/signin`,{
        email,
        password
      },{withCredentials:true})
      console.log("Result : ",result);
    } catch(error){
      console.log("Error : ",error);
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgClr }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-sm p-4 border-[1px]`}
        style={{ border: `1px solid ${borderClr}` }}
      >
        <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryClr }}>
          FoodHut
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in to your account to get started with delicious food deliveries{" "}
        </p>

        {/* email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="text"
            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500`}
            placeholder="Enter your email address"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPwd ? "password" : "text"}`}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500`}
              placeholder="Enter your password"
              onChange={(e)=>setPassword(e.target.value)}
            value={password}
            />
            <button
              className="absolute right-3 cursor-pointer top-3.5 text-gray-500"
              onClick={() => setShowPwd((prev) => !prev)}
            >
              {!showPwd ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        <div className='text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer' onClick={()=>navigate("/forget-password")}>Forget Password</div>
        <button
          className={`w-full font-semibold rounded-lg py-2 transition duration-200 hover:bg-[#e64323] cursor-pointer`}
          style={{ backgroundColor: primaryClr, color: "white" }}
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <button className='w-full mt-4 flex items-center cursor-pointer justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100'>
          <FcGoogle size={25} />
          <span>Sign in with Google</span>
        </button>
        <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signup")}>want to create a new account ? <span className='text-[#e64323]'>Sign Up</span></p>
      </div>
    </div>
  );
}

export default SignIn;
