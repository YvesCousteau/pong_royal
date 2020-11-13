import './App.css';

import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import Canvas from "./Canvas";
import Game from "./Game";

const ENDPOINT = "http://vct.xyz:4001";


const config = {
  width: 1920,
  height: 1080,
  antialias: true,
};

function App() {

  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <div >
        <h3 class="title">Info du server (socket.io): <time dateTime={response}>{response}</time></h3>
        <Canvas init={Game} {...config}>
        </Canvas>

    </div>
  );
}

export default App;
