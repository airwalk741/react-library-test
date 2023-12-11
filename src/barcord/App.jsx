import Html5QrcodePlugin from "./Html5QrcodePlugin";

const App = (props) => {
  const onNewScanResult = (decodedText, decodedResult) => {
    // handle decoded results here
    console.log(decodedText);
  };

  return (
    <div className='App'>
      <Html5QrcodePlugin
        fps={10}
        qrbox={500}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
};

export default App;
