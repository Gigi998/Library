const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import prisma from "../prisma";
import { Request, Response } from "express";

const handleLogin = async (req: Request, res: Response) => {
  const email = req?.body?.email;
  const pwd = req?.body?.pwd;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  // Find user
  const user = await prisma.admin.findFirst({
    where: {
      email: email,
    },
  });
  // Unauthorized
  if (!user) return res.sendStatus(401);
  // Check match
  const match = await bcrypt.compare(pwd, user.pwd);
  if (match) {
    const accessToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    const refreshToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Update user
    await prisma.admin.update({
      where: {
        email: email,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

export default handleLogin;
