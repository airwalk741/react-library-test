import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function UseQueryHook(callback) {
  const { data, refetch, isLoading } = useQuery(
    ["serverData"],
    () => callback({ delay: 1000 }),
    {
      suspense: true,
    }
  );

  console.log(isLoading);
  if (isLoading) {
    return <h1>로딩중이야</h1>;
  }

  return { data, refetch };
}
