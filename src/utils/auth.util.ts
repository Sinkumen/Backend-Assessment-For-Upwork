import { User } from "../models";
import { Response } from "express";

// Generate token and send response
const sendTokenResponse = async (
  user: User,
  statusCode: number,
  res: Response
) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRE || "10") * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        token,
      },
    });
};

export default sendTokenResponse;
