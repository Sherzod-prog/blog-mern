import { fetchPostData } from "@/http";
import { IAccount, IsignUpForm } from "@/types";
import { create } from "zustand";

interface AuthState {
  account: IAccount | null;
  setAccount: (account: IAccount | null) => void;
  login: (values: IsignUpForm) => Promise<void>;
}

// Auth do'konini yaratish
export const useAuthStore = create<AuthState>((set) => ({
  account: null,

  setAccount: (account) => set({ account }),

  login: async (values) => {
    try {
      const data = await fetchPostData("auth/login", values);
      localStorage.setItem("token", data.token);
      set({ account: data.user });
    } catch (error) {
      console.error("Error login:", error);
    }
  },
}));
