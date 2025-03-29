import { UserState } from "@/types";
import axios from "axios";
import { create } from "zustand";

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  getUser: async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URI}/users/get-user/${id}`
      );
      set({ user: data.data });
    } catch (error) {
      console.error("Error register:", error);
    }
  },
}));
