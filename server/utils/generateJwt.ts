import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateJwt = (data: String | Object) => {
  const secret = process.env.JWT_SECRET || "";

  return jwt.sign(data, secret, {
    expiresIn: "3d",
  });
};
