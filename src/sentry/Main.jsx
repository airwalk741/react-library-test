import React, { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    throw Error("qwer");
  }, []);

  return (
    <div>
      <h1>Main</h1>
    </div>
  );
}
