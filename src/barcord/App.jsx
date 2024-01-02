/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

let qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
  let minEdgePercentage = 0.7; // 70%
  let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
  let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
  return {
    width: qrboxSize,
    height: qrboxSize * 0.6,
  };
};

function QrCodeScanner() {
  useEffect(() => {
    const html5Qrcode = new Html5Qrcode("reader");

    const startScanning = async () => {
      try {
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
          /* handle success */
          console.log(decodedText);
        };

        // If you want to prefer front camera
        html5Qrcode.start(
          { facingMode: "macro" },
          {
            fps: 30,
            disableFlip: false,
            aspectRatio: 1.777,
            focusMode: "macro",
            advanced: [{ zoom: 2.0 }],
            rememberLastUsedCamera: true,
            experimentalFeatures: {
              useBarCodeDetectorIfSupported: true,
            },
            willReadFrequently: true,
            qrbox: qrboxFunction,
            videoConstraints: {
              width: 1920,
              height: 1080,
              facingMode: "macro",
              qrbox: {
                width: window.screen.width < 600 ? 600 : 900,
                height: window.screen.width < 600 ? 600 : 900,
              },
            },
          },
          qrCodeSuccessCallback
        );
      } catch (err) {
        console.error("Error initializing QR Code scanner:", err);
        // 초기화 에러 처리 로직 추가
      }
    };

    startScanning();

    return () => {
      html5Qrcode
        .stop()
        .then(() => {
          console.log("QR Code scanner stopped");
        })
        .catch((err) => {
          console.error("Error stopping QR Code scanner:", err);
        });
    };
  }, []);

  return <div id='reader' />;
}

export default QrCodeScanner;
