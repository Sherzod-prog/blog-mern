import { create } from "zustand";
import { IAccount, IPost } from "@/types";

interface GlobalState {
  account: IAccount | null;
  pageLoader: boolean;
  open: boolean;
  post: IPost | null;
  setAccount: (account: IAccount | null) => void;
  setPageLoader: (loading: boolean) => void;
  setOpen: (open: boolean) => void;
  setPost: (post: IPost | null) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  account: null,
  pageLoader: true,
  open: false,
  post: null,

  setAccount: (account) => set({ account }),
  setPageLoader: (loading) => set({ pageLoader: loading }),
  setOpen: (open) => set({ open }),
  setPost: (post) => set({ post }),
}));
