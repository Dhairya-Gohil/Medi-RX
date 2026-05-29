import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user:"",
    pass:""
  }
});

export const sendOtpMail = async (
  email,
  otp
) => {

  await transporter.sendMail({

    from: `"MediTriage" <${process.env.EMAIL_USER}>`,

    to: email,

    subject: "OTP Verification",

    html: `
      <div style="font-family:Arial;padding:20px">

        <h2>MediTriage Email Verification</h2>

        <p>Your OTP code is:</p>

        <h1 style="letter-spacing:5px;color:#2a9d8f">
          ${otp}
        </h1>

        <p>
          OTP valid for 5 minutes.
        </p>

      </div>
    `
  });
};