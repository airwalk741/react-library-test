import React, { useEffect, useRef } from "react";
import mqtt from "mqtt";

const MQTTURL = "wss://" + window.location.host + "/mqtt";
const TOPIC = "trusafer/TW230817003/88:A6:EF:70:00:89/30817A0002D/data";

export default function App() {
  let client = useRef(null);

  const imgRef = useRef(null);

  useEffect(() => {
    if (!client.current) {
      client.current = mqtt.connect(MQTTURL, {
        clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
        username: "ijoon",
        password: "9DGQhyCH6RZ4",
      });

      client.current.on("connect", () => {
        console.log("mqtt 연결 성공");
        const qos = 0;
        client.current.subscribe(TOPIC, { qos }, (err, res) => {
          if (err) {
            console.log(TOPIC, "연결 실패", err);
          } else {
            console.log(TOPIC, "연결 성공");
          }
        });

        client.current.on("message", (topic, message) => {
          if (topic === TOPIC) {
            const resMessage = JSON.parse(message);
            console.log(resMessage);
            imgRef.current.src =
              "data:image/jpeg;base64," + resMessage.img.toString("base64");
          }
        });
      });
    }
  }, []);

  return (
    <div>
      <img src={""} alt='' ref={imgRef} width={400} height={400} />
    </div>
  );
}
