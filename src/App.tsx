import React from "react";
import logo from "./logo.svg";
import "./App.css";

const [A, B] = [1, 4];

const magicModuleHeader = [0x00, 0x61, 0x73, 0x6d];
const moduleVersion = [0x01, 0x00, 0x00, 0x00];
const endOfAdd =
  "00 0c 06 64 79 6c 69 6e 6b 00 00 00 00 00 01 0a 02 60 00 00 60 02 7f 7f 01 7f 03 04 03 00 01 00 06 06 01 7f 00 41 00 0b 07 41 04 13 5f 5f 77 61 73 6d 5f 61 70 70 6c 79 5f 72 65 6c 6f 63 73 00 00 03 61 64 64 00 01 0c 5f 5f 64 73 6f 5f 68 61 6e 64 6c 65 03 00 12 5f, 5f 70 6f 73 74 5f 69 6e 73 74 61 6e 74 69 61 74 65 00 02 0a 11 03 03 00 01 0b 07 00 20 00 20 01 6a 0b 03 00 01 0b";
const manualWasmBuffer = new Buffer([
  ...magicModuleHeader,
  ...moduleVersion,
  ...endOfAdd.split(" ").map(b => parseInt(b, 16))
]);

async function wasmAddTest() {
  // const response = await fetch("add.wasm");
  // const buffer = await response.arrayBuffer();
  const obj = await WebAssembly.instantiate(manualWasmBuffer);
  const { add } = obj.instance.exports;
  // @ts-ignore
  return `${A} + ${B} = ${add(A, B)}`;
}

const App: React.FC = () => {
  const [wasmAdd, setWasmAdd] = React.useState<string>();
  React.useEffect(() => {
    (async () => {
      const waTest = await wasmAddTest();
      setWasmAdd(waTest);
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {wasmAdd != null ? (
            <>
              <code>{wasmAdd}</code>
            </>
          ) : (
            <>Loading wasm...</>
          )}
        </p>
      </header>
    </div>
  );
};

export default App;
