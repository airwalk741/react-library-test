import React, { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    text();
  }, []);

  const text = () => {
    throw Error("에러테스트 ");
  };

  return (
    <div>
      <h1>Main</h1>
    </div>
  );
}
