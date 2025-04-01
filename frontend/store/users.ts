import { UserState } from "@/types";
import axios from "axios";
import { create } from "zustand";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  follow: null,

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
  followerUser: async (id) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URI}/users/follower/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      set({ follow: data.data });
    } catch (error) {
      console.log(error);
    }
  },
}));
