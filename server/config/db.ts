import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/rent";

  try {
    const conn = await mongoose.connect(mongoUrl);

    console.log(
      colors.green.underline(`MongoDB connected: ${conn.connection.host}`)
    );
  } catch (error: any) {
    console.error(colors.red.underline.bold(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
