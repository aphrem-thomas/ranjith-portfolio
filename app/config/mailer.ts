"use strict";

const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL
const PASS  = process.env.PASS
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: EMAIL,
    pass: PASS
  }
});

export default transporter