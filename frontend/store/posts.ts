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

  fetchAllPosts: async (page = 1, limit = 10, cat) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/`,
        {
          params: { page, limit, cat },
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
  fetchUserPosts: async (page, limit) => {
    set({ loading: true, error: null });
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/admin-content`,
        {},
        {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${token}`,
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
  fetchUserFollowers: async (page, limit) => {
    set({ loading: true, error: null });
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/admin-followers`,
        {},
        {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${token}`,
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
  deletePost: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
}));
