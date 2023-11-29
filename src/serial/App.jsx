import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const writer = useRef();
  const keepReading = useRef();
  const reader = useRef();

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Edge") > -1) {
      console.log("ts");
    }
  }, []);

  const handleSerial = async () => {
    try {
      const port = await navigator.serial.requestPort();

      await port.open({ baudRate: 9600 });
      keepReading.current = true;

      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);

      writer.current = port.writable.getWriter();
      const text = `gpio iodir C0\r`;
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      await writer.current.write(data);
      // 직렬 장치로부터 오는 데이터를 듣는다.

      console.log("test");
      const sixpin = `gpio set 6\r`;
      const sixEncoder = new TextEncoder();
      const sixdata = sixEncoder.encode(sixpin);
      await writer.current.write(sixdata);

      console.log("test");

      setInterval(async () => {
        const text = `gpio read 6\r`;
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        await writer.current.write(data);
      }, 10);

      // while (keepReading.current) {
      //   try {
      //     const { value, done } = await reader.current.read();
      //     if (done) {
      //       // reader.current.releaseLock();
      //       break;
      //     }
      //     // value는 문자열이다.
      //     console.log(value);
      //     if (value.includes("read")) {
      //       const data = value.replaceAll("\n", "").split("\r");
      //       const decimalNumber = parseInt(data[1], 16);
      //       // 10진수를 2진수로 변환
      //       const binaryString = decimalNumber.toString(2);
      //       console.log(binaryString);
      //     }
      //   } catch (e) {
      //     console.log(e);
      //     break;
      //   }
      // }

      while (keepReading.current) {
        try {
          // 데이터 스트림을 읽기 위한 리더 객체 생성
          // const reader = port.readable.getReader();
          reader.current = textDecoder.readable.getReader();

          try {
            // 데이터를 계속 읽음
            while (true) {
              const { value, done } = await reader.current.read();
              if (done) {
                // 스트림이 종료되었다면, 루프를 빠져나감
                break;
              }
              if (value) {
                // 여기서 value 처리 로직을 수행
                console.log(value);
              }
            }
          } catch (error) {
            console.error("Read error: " + error);
          } finally {
            // 리더를 해제하여 버퍼를 클리어
            reader.current.releaseLock();
          }
        } catch (error) {
          console.error("Serial reading error: " + error);
          // 오류가 발생한 경우 연결을 해제하거나 재연결 로직을 수행
          break;
        }
      }

      // 스트림 종료
      if (reader.current) {
        reader.current.cancel();
      }

      await readableStreamClosed.catch(() => {
        /* 에러를 무시한다 */
      });

      if (writer.current) {
        writer.current.releaseLock();
      }

      await port.close();
      console.log("종료");
      // setPortList((pre) => [...pre, port]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleup = async (index, updown) => {
    // 문자열을 Uint8Array로 변환
    function decimalTo4DigitHex(decimal) {
      if (decimal >= 0 && decimal <= 65535) {
        // 범위 검사
        var hex = decimal.toString(16); // 10진수를 16진수로 변환
        while (hex.length < 2) {
          hex = "0" + hex; // 4자리로 만들기 위해 앞에 0 채우기
        }
        return hex;
      } else {
        return "범위를 벗어난 값";
      }
    }

    let text;
    if (updown === "up") {
      text = `gpio writeall ${decimalTo4DigitHex(Number(index))}\r`;
    } else {
      text = `gpio clear ${index}\r`;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    await writer.current.write(data);

    setTimeout(async () => {
      const text = `gpio readall\r`;

      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      await writer.current.write(data);
    }, [1000]);
  };

  const handleSerialClose = async () => {
    keepReading.current = false;
    reader.current.cancel();
  };

  return (
    <div>
      <button onClick={handleSerial}>get serial</button>
      <button onClick={handleSerialClose}>close serial</button>

      {new Array(20).fill(undefined).map((item, index) => {
        return (
          <div key={index}>
            <span style={{ marginRight: "10px" }}>{index}</span>
            <button onClick={() => handleup(index, "up")}>up</button>
            {/* <button onClick={() => handleup(index, "down")}>down</button> */}
          </div>
        );
      })}
    </div>
  );
}
