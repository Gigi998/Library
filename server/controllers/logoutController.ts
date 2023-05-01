import prisma from "../prisma";
import { Request, Response } from "express";

const handleLogout = async (req: Request, res: Response) => {
  // Check cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  const user = await prisma.admin.update({
    where: {
      refreshToken: refreshToken,
    },
    data: {
      refreshToken: "",
    },
  });
  // Delete cookie if there is no user
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  //Clear the cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  });
  return res.status(201).json({ message: "User loged out" });
};

export default handleLogout;
