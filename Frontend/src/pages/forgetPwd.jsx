import axios from "axios";
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";

function ForgetPwd() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp,setOtp] = useState("")
  const navigate = useNavigate()
  const [newPassword,setNewPassword] = useState("");
  const [cnfPassword,setCnfPassword] = useState("");

const handleSendOtp= async()=>{
    try{
        const result = await axios.post(`${serverUrl}/api/auth/send-otp`,{email},{withCredentials:true});
        console.log("result :",result);
        setStep(2);
    } catch(error){
        console.log("Error in send otp :",error)
    }
}

const handleVerifyOtp= async()=>{
    try{
        const result = await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},{withCredentials:true});
        console.log("Result : ",result);
        setStep(3);
    } catch(error){
        console.log("Error in verifying otp :",error)
    }
}

const handleResetPassword= async()=>{
    if (newPassword !== cnfPassword) {
    console.warn("Passwords do not match");
    return;
  }
    try{
        console.log("Sending reset-password request:", {
      email,
      newPassword,
    });
        const result = await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},{withCredentials:true});
        console.log("Result : ",result)
        navigate("/signin")
    } catch(error){
        console.log("Error in verifying otp :",error)
    }
}

  return (
    <div className="flex items-center w-full justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowRoundBack size={30} className="text-[#ff4d28] cursor-pointer" 
          onClick={()=> navigate("/signin")}/>
          <h1 className="text-2xl font-bold text-center text-[#ff4d28]">
            Forget Password
          </h1>
        </div>
        {step == 1 && (
          <div>
            {/* email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className={`w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500`}
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`
              }
              onClick={handleSendOtp}
            >
              Send Otp
            </button>
          </div>
        )}
        {step == 2 && (
            <div>
            {/* enter otp */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter OTP
              </label>
              <input
                type="email"
                className={`w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500`}
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <button
              className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleVerifyOtp}
            >
              Verify Otp
            </button>
          </div>
        )}
        {step == 3 && (
            <div>
            {/* enter new password */}
            <div className="mb-6">
              <label
                htmlFor="newPwd"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="newPwd"
                className={`w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500`}
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
             {/* confirm password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPwd"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="newPwd"
                className={`w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500`}
                placeholder="Confirm Password"
                onChange={(e) => setCnfPassword(e.target.value)}
                value={cnfPassword}
              />
            </div>
            <button
              className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleResetPassword}
            >
              Reset Password 
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgetPwd;
