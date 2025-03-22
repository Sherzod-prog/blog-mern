"use client";

import { IAdminAnalytics } from "@/types";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [data, setData] = useState<IAdminAnalytics>();
  const analiticData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/admin-analytics`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const resData = await response.json();
      setData(resData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    analiticData();
  }, []);
  console.log(data);
  return (
    <div>
      <h1>Dashboard</h1>
      <div></div>
      <h1>User: </h1>
      <h1>Posts: {data?.totalPosts}</h1>
      <h1>Followers: {data?.followers}</h1>
    </div>
  );
};

export default DashboardPage;
