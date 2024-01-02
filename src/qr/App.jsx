import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function App() {
  const [data, setData] = React.useState("Not Found");

  return (
    <>
      <BarcodeScannerComponent
        width={300}
        height={300}
        onUpdate={(err, result) => {
          console.log(result);
          if (result) setData(result.text);
          else setData("Not Found");
        }}
        facingMode={"environment"}
      />
      <p>{data}</p>
    </>
  );
}

export default App;
