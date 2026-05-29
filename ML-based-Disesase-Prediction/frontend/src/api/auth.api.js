import axios from "./axios";


/* =========================
   REGISTER
========================= */

export const registerUser =
  async (data) => {

    const res =
      await axios.post(

        "/auth/register",

        data
      );

    return res;
  };


/* =========================
   VERIFY OTP
========================= */

export const verifyOTP =
  async (data) => {

    const res =
      await axios.post(

        "/auth/verify-otp",

        data
      );

    return res;
  };


/* =========================
   LOGIN
========================= */

export const loginUser =
  async (data) => {

    const res =
      await axios.post(

        "/auth/login",

        data
      );

    return res;
  };


/* =========================
   GET PROFILE
========================= */

export const getUserProfile =
  async () => {

    const res =
      await axios.get(
        "/auth/me"
      );

    return res.data;
  };