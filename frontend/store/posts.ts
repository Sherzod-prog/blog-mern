import { create } from "zustand";
import axios from "axios";
import { PostStore } from "@/types";

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  totalPost: 0,
  numOfPages: 1,
  page: 1,
  limit: 8,
  loading: false,
  error: null,

  fetchPosts: async (page = 1, limit = 8, cat = "", writerId = "") => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/`,
        {
          params: { page, limit, cat, writerId },
          headers: {
            "Cache-Control": "no-cache", // Disable caching
          },
        }
      );
      const { data, totalPost, numOfPages } = response.data;

      set({
        posts: data,
        totalPost,
        numOfPages,
        page,
        limit,
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch posts", loading: false });
    }
  },
}));
