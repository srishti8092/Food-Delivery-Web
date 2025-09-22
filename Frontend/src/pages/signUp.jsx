import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";

function SignUp() {
  const primaryClr = "#ff4d2d";
  const bgClr = "#fff9f6";
  const borderClr = "#ddd";

  const [showPwd, setShowPwd] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [password,setPassword] = useState("");

  const handleSignUp=async()=>{
    try{
      const result = await axios.post(`${serverUrl}/api/auth/signup`,{
        fullName,
        email,
        phoneNumber,
        password,
        role
      },{withCredentials:true})
      console.log("Result : ",result);
      navigate("/signin");
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
        className={`bg-white rounded-xl shadow-lg w-full max-w-lg  p-8 border-[1px]`}
        style={{ border: `1px solid ${borderClr}` }}
      >
        <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryClr }}>
          FoodHut
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious food deliveries{" "}
        </p>

        {/* fullname */}
        <div className="mb-4">
          <label
            htmlFor="full name"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500`}
            placeholder="Enter your full name"
            onChange={(e)=>setFullName(e.target.value)}
            value={fullName}
          />
        </div>

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

        {/* Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="phone Number"
            className="block text-gray-700 font-medium mb-1"
          >
            Phone Number
          </label>
          <input
            type="text"
            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500`}
            placeholder="Enter your phone Number"
            onChange={(e)=>setPhoneNumber(e.target.value)}
            value={phoneNumber}
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

        {/* Role */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2">
            {["user", "admin", "delivery partner"].map((r) => (
              <button
                className="flex-1 border rounded-lg px-3 cursor-pointer text-center font-medium transition-colors"
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? { backgroundColor: primaryClr, color: "white" }
                    : { border: `1px solid ${primaryClr}`, color: primaryClr }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`w-full font-semibold rounded-lg py-2 transition duration-200 hover:bg-[#e64323] cursor-pointer`}
          style={{ backgroundColor: primaryClr, color: "white" }}
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <button className='w-full mt-4 flex items-center cursor-pointer justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100'>
          <FcGoogle size={25} />
          <span>Sign up with Google</span>
        </button>
        <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signin")}>Already have an account ? <span className='text-[#e64323]'>Sign In</span></p>
      </div>
    </div>
  );
}

export default SignUp;
