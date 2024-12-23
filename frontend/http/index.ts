import { toast } from "sonner";

export const fetchGetData = async (endpoint: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URI}/${endpoint}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const fetchPostData = async (endpoint: string, data: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URI}/${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const resdata = await response.json();
  toast.success(resdata.message);
  return resdata;
};
