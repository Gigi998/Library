const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();
import prisma from '../prisma';
import { Request, Response } from 'express';

const html = `
  <h1>Registration success</h1>
`;

const handleRegister = async (req: Request, res: Response) => {
  const email = req?.body?.email;
  const pwd = req?.body?.pwd;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: 'Email and password are required' });
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    await prisma.admin.create({
      data: {
        email: email,
        pwd: hashedPwd,
      },
    });

    // Create transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    // Create message
    let message = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Welcome to library',
      html: html,
    };
    // Send message
    await transporter
      .sendMail(message)
      .then(() => {
        res.status(201).json({ msg: 'Email is coming' });
      })
      .catch(err => res.status(500).json({ err }));

    res.status(200).json({ message: 'New user created' });
  } catch (error) {
    if (error.code === 'P2002') {
      return res
        .status(409)
        .json({ message: 'Email already in use' });
    }
    res.status(500).json({ message: error.message });
  }
};

export default handleRegister;
