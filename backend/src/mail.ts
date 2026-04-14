import nodemailer from "nodemailer";

export const sendOTPEmail = async (email: string, otp: number) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "21p61a05o1@vbithyd.ac.in",          // 👈 replace
      pass: "xofz cimg gcvi jjhg",             // 👈 replace (NOT normal password)
    },
  });

  try {
    await transporter.sendMail({
      from: "21p61a05o1@vbithyd.ac.in",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.log("❌ Email error:", error);
    throw error;
  }
};