const bcrypt = require("bcrypt");
import prisma from "../prisma";
import { Request, Response } from "express";

const handleRegister = async (req: Request, res: Response) => {
  const email = req?.body?.email;
  const pwd = req?.body?.pwd;
  if (!email || !pwd)
    return res.status(400).json({ message: "Email and password are required" });
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    await prisma.admin.create({
      data: {
        email: email,
        pwd: hashedPwd,
      },
    });
    res.status(200).json({ message: "New user created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handleRegister;
