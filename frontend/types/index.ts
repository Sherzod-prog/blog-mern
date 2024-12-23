import { ReactNode } from "react";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  image: string;
}
export interface IAccount {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  accountType: string;
  password: string;
  provider: string;
  followers: [];
  createdAt: Date;
  updatedAt: Date;
  image: string;
}

export interface ChildProps {
  children: ReactNode;
}

// export interface AxiosResponse {
//   success: boolean;
//   message?: string;
// }

// export interface AccountResponse extends AxiosResponse {
//   data: IAccount[] | IAccount;
// }
export interface INavbarItems {
  id: number;
  label: string;
  href: string;
}
export interface IPost {
  _id: string;
  title: string;
  description: string;
  author: string;
  image: string;
  category: string;
  createdAt: string;
  views: string;
}
export interface IAdminAnalytics {
  followers: number;
  follwersStats: [];
  last5Posts: [];
  totalFollowers: IAccount;
  totalPosts: number;
  totalViews: number;
  totalWriters: number;
  viewStats: IView[];
}
export interface ICategory {
  id: number;
  label: string;
}
export interface IComment {
  _id: string;
  comment: string;
  author: string;
  post: string;
  createdAt: string;
}
export interface IView {
  _id: string;
  view: string;
  post: string;
  createdAt: string;
}
export interface IPostResponse {
  success: boolean;
  message?: string;
  data: IPost[];
}

export interface ICommentResponse {
  success: boolean;
  message?: string;
  data: IComment[];
}
export interface IViewResponse {
  success: boolean;
  message?: string;
  data: IView[];
}
export interface IsignUpForm {
  email: string;
  password: string;
}

export interface IsignInForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
  accountType: string;
}
