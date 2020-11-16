import './App.css';

import { memo } from "react";
import { Application } from "pixi.js";


import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import Canvas from "./Canvas";
import Game from "./Game";

import {ResultScreen, ModalScoreS} from "./ResultScreen";

import './bootstrap.css'

const ENDPOINT = "http://localhost:4001";

const config = {
  width: 1920,
  height: 1080,
  antialias: true,
};

const socket = socketIOClient(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});
let game = null;
let numPlayer = 0;

function App() {

  const [response, setResponse] = useState("");
  const [gameStart, setgameStart] = useState(false);
  const [gameId, setGameId] = useState(null);
  const [waitingPlayer, setwaitingPlayer] = useState(0);
  const [positionPlayer, setPositionPlayer] = useState([0,0,0,0,0,0,0,0,0,0]);

  useEffect(() => {

    socket.on("FromAPI", data => {
      setResponse(data);
    });

    socket.on("waiting player", data => {
      setwaitingPlayer(data.n);
    });

    socket.on("start game", data => {
      console.log("game start");
      setGameId(data.id);
      numPlayer = data.numPlayer;
      setPositionPlayer(data.position);
      game = new Game(socket,data.id,numPlayer);
      //game.UpdatePosition(data.position);

      setgameStart(true);
    });


    socket.on("position change", data => {
      console.log("get positionPlayer");
      setPositionPlayer(data.pos);
      game.UpdatePosition(data.pos);
    });

    return () => socket.disconnect();
  }, []);

  if (gameStart){
    return (
      <div >
        <div class="modal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-warning">#</th>
                      <th scope="col" className="text-warning">Pseudo</th>
                      <th scope="col" className="text-warning">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"> <h2  className="text-warning">1</h2> </th>
                      <td className="text-info">Mark</td>
                      <td className="text-danger">73234</td>
                    </tr>
                    <tr>
                      <th scope="row"> <h2  className="text-warning">2</h2> </th>
                      <td className="text-info">Jacob</td>
                      <td className="text-danger">2342342</td>
                    </tr>
                    <tr>
                      <th scope="row"> <h2  className="text-warning">3</h2> </th>
                      <td className="text-info">Larry</td>
                      <td className="text-danger">20380458</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <h3 class="title">Time : (socket.io): <time dateTime={response}>{response}</time></h3>
        <ul class="playerpos">MovePlayer (socket.io)
        <li>p0 : {positionPlayer[0] ? positionPlayer[0] : 0}</li>
        <li>p1 : {positionPlayer[1]? positionPlayer[1] : 0}</li>
        <li>p2 : {positionPlayer[2]? positionPlayer[2] : 0}</li>
        <li>p3 : {positionPlayer[3]? positionPlayer[3] : 0}</li>
        <li>p4 : {positionPlayer[4]? positionPlayer[4] : 0}</li>
        <li>p5 : {positionPlayer[5]? positionPlayer[5] : 0}</li>
        <li>p6 : {positionPlayer[6]? positionPlayer[6] : 0}</li>
        <li>p7 : {positionPlayer[7]? positionPlayer[7] : 0}</li>
        <li>p8 : {positionPlayer[8]? positionPlayer[8] : 0}</li>
        <li>p9 : {positionPlayer[9]? positionPlayer[9] : 0}</li>
        </ul>
        <Canvas socket={socket} game={game} {...config} ></Canvas>
        {/*positionPlayer([0,0,0,0,0,0,0,0,0])*/}

      </div>
    );
  }else{
    return (
      <div >
        <h3 class="title">Time : (socket.io): <time dateTime={response}>{response}</time></h3>
        <p>Waiting for players {waitingPlayer}/10</p>
        <p>required minimum 3 players</p>
        
        <ResultScreen/>
        
      </div>
    );
  }
}

export default App;
