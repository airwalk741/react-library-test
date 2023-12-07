import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SocketIOExample = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = io("ws://" + window.location.host + "/media/rtsp/video1", {
      // const socket = io("ws://192.168.13.105:8088", {
      query: { username: "admin", password: "qewr1234!" },
    }); // Socket.io 서버 주소
    // const socket = new WebSocket(`ws://192.168.13.105:80`);

    const socket2 = io("ws://192.168.13.105:80/media/rtsp/video1", {
      query: {
        username: "admin",
        password: "qewr1234!",
      },
    });
    socket2.on("connect", () => {
      console.log("Socket.io 연결 성공");
      setIsOnline(true);
    });
    console.log("test");

    // socket.addEventListener("open", (event) => {
    //   console.log("WebSocket 연결 성공");
    // });

    // socket.addEventListener("message", (event) => {
    //   console.log(`WebSocket 수신: ${event.data}`);
    // });

    // socket.addEventListener("close", (event) => {
    //   console.log("WebSocket 연결 종료");
    // });

    // socket.addEventListener("error", (event) => {
    //   console.error("WebSocket 오류 발생", event);
    // });

    socket.on("connect", () => {
      console.log("Socket.io 연결 성공");
      setIsOnline(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket.io 연결 종료");
      setIsOnline(false);
    });

    socket.on("message", (data) => {
      console.log("Socket.io에서 메시지 수신:", data);
      setMessage(data.message);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleToggle = () => {
    if (socket) {
      socket.emit("toggle", {}); // 서버에 'toggle' 이벤트 전송
    }
  };

  return (
    <div>
      <h1>Socket.io Example</h1>
      <p>Status: {isOnline ? "Online" : "Offline"}</p>
      <p>Message: {message}</p>
      <button onClick={handleToggle}>Toggle Camera</button>
    </div>
  );
};

export default SocketIOExample;
