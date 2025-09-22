import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import tokenGenerate from '../utils/token.js';
import { sendOTPMail } from '../utils/mail.js';

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;

    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already exists"
      })
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be atleast 6 characters"
      })
    }
    if (!phoneNumber || phoneNumber.length < 10) {
      return res.status(400).json({ message: "Phone number must be at least 10 digits" });
    }

    const hashedpwd = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      password: hashedpwd,
      phoneNumber,
      role
    })

    const token = await tokenGenerate(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    return res.status(201).json({
      message: "User created successfully",
      user
    })
  } catch (error) {
    console.log("Error in signUp :", error)
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password"
      })
    }

    const token = await tokenGenerate(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    return res.status(200).json({
      message: "User signedIn successfully",
      user
    })
  } catch (error) {
    console.log("Error in signIn :", error);
  }
}

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Sign out successfully"
    })
  } catch (error) {
    console.log("Error in signOut :", error)
  }
}

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist"
      })
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    user.save();
    await sendOTPMail(email, otp);

    return res.status(200).json({
      message: "OTP sent successfully"
    })
  } catch (error) {
    console.log("Error in sending OTP :", error)
  }
}

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({
      message: "OTP verified successfully"
    })
  } catch (error) {
    console.log("Error  in verify OTP :", error);
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({
        message: "Otp verification required"
      })
    }

    const hashedpwd = await bcrypt.hash(newPassword, 10);
    user.password = hashedpwd;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({
      message: "Password reset successfully"
    })
  } catch (error) {
    console.log("Error in reseting password :", error)
  }
}