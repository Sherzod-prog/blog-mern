import { create } from "zustand";
import axios from "axios";
import { PostStore } from "@/types";

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  post: null,
  comment: [],
  comments: [],
  totalPost: 0,
  numOfPages: 1,
  page: 1,
  limit: 8,
  loading: false,
  error: null,
  analiticData: null,
  popularPosts: null,
  popularWriters: null,
  fetchAnaliticData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/admin-analytics`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // const { data } = response.data;
      set({ analiticData: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch post", loading: false });
    }
  },
  fetchCreatePost: async (value) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/create-post`,
        value,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { data } = response.data;
      set({ post: data, loading: false });
    } catch (error) {
      set({ error: "Failed to create post", loading: false });
    }
  },
  fetchEditPost: async (id, value) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/update/${id}`,
        value,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { data } = response.data;
      set({ post: data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch post", loading: false });
    }
  },
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
  fetchPostById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/${id}`
      );
      const { data } = response.data;
      set({ post: data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch post", loading: false });
    }
  },
  fetchCreatComment: async (id, valeus) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/comment/${id}`,
        valeus,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;
      set({ comment: data.newComment, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch post", loading: false });
    }
  },
  fetchAllComments: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      const { data } = response.data;
      set({ comments: data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch comments", loading: false });
    }
  },
  fetchDeleteComment: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/comment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { data } = response.data;
      set({ comment: data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch comments", loading: false });
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
  fetchGetPopular: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/popular`
      );
      const { data } = response.data;
      set({
        popularPosts: data.posts,
        popularWriters: data.writers,
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch post", loading: false });
    }
  },
}));
