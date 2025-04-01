import { AuthState, IAccount, IsignUpForm } from "@/types";
import axios from "axios";
import { create } from "zustand";

// Auth do'konini yaratish
export const useAuthStore = create<AuthState>((set) => ({
  account: null,
  setAccount: (account) => set({ account }),

  register: async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URI}/auth/register`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error register:", error);
    }
  },
  login: async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URI}/auth/login`,
        values
      );
      localStorage.setItem("token", data.token);
      set({ account: data.user });
    } catch (error) {
      console.error("Error login:", error);
    }
  },
  verify: async (id, pin) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URI}/users/verify/${id}/${pin}`
      );
      return data;
    } catch (error) {
      console.error("Error login:", error);
    }
  },
  resendotp: async (id) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URI}/users/resend-link/${id}/`
      );
      return data;
    } catch (error) {
      console.error("Error login:", error);
    }
  },
  logout: async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URI}/auth/logout`);
    localStorage.removeItem("token");
    set({ account: null });
  },
}));
