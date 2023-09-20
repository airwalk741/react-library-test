import React, { useState } from "react";
import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie_fuc";

export default function Main() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleSubmit = async () => {
    try {
      const response = await axios({
        url: "/api/auth/v1/login",
        data: form,
        method: "POST",
      });

      const {
        data: { accessToken, loginKey, refreshToken },
      } = response;

      if (refreshToken) {
        setCookie("refreshToken", refreshToken, {
          path: "/",
          secure: "/",
          httponly: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getCookie("refreshToken"));

  return (
    <div>
      <h1>쿠키 테스트</h1>
      <input
        type='text'
        value={email}
        onChange={(e) => setForm((pre) => ({ ...pre, email: e.target.value }))}
      />
      <br />
      <input
        type='text'
        value={password}
        onChange={(e) =>
          setForm((pre) => ({ ...pre, password: e.target.value }))
        }
      />
      <button onClick={handleSubmit}>로그인</button>
    </div>
  );
}
