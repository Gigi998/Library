const jwt = require("jsonwebtoken");
import prisma from "../prisma";
import { Request, Response } from "express";

const refreshTokenController = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  // No cookie
  if (!cookies.jwt) return res.status(401).json({ message: "No cookies" });

  const refreshToken = cookies.jwt;

  // Find user with token
  const foundUser = await prisma.admin.findFirst({
    where: {
      refreshToken: refreshToken,
    },
  });

  if (!foundUser) return res.status(403);

  // Veify refresh token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err || foundUser.email !== decoded.email) {
        return res.status(403).json({ message: "Verification token error" });
      }
      const email = decoded.email;
      // create new acc tok
      const accessToken = jwt.sign(
        {
          email: email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20s" }
      );
      res.json({ accessToken, email });
    }
  );
};

export default refreshTokenController;
