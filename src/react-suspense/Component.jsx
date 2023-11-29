import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getFetchData = async ({ delay }) => {
  // await new Promise((resolve) => setTimeout(resolve, delay));

  return axios({
    url: "http://127.0.0.1:8089",
  });
};

const fetchUserData = async () => {
  console.log("tset");
  const response = await fetch("http://127.0.0.1:8089");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function Component() {
  const { data, refetch, isLoading } = useQuery(["serverData"], fetchUserData, {
    suspense: true,
  });

  console.log(isLoading, data);
  if (isLoading) {
    return <h1>로딩중이야</h1>;
  }

  return (
    <div>
      {/* <div>{JSON.stringify(data)}</div>; */}
      <button onClick={() => refetch()}>클릭</button>
    </div>
  );
}
