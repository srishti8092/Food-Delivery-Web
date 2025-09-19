import mongoose from "mongoose"

const connectDB = async(req,res) => {
  try{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected")
  } catch (err){
    console.log(" DB connection error : ",err);
  }
}


export default connectDB;