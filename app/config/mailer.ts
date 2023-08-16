"use strict";

const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL
const PASS  = process.env.PASS
console.log(EMAIL,"=>",PASS)
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: EMAIL,
    pass: PASS
  }
});

export default transporter