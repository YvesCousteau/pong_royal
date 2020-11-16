import './App.css';

import { memo } from "react";
import { Application } from "pixi.js";


import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import Canvas from "./Canvas";
import Game from "./Game";

import {ResultScreen, ModalScoreS} from "./ResultScreen";

import './bootstrap.css'

const ENDPOINT = "http://vct.xyz:4001";

const config = {
  width: 1920,
  height: 1080,
  antialias: true,
};

const socket = socketIOClient(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});
let game = null;
let numPlayer = 0;

function App() {

  const [timeoutGamestart, settimeoutGamestart] = useState(20);
  const [gameStart, setgameStart] = useState(false);
  const [showResult, setshowResult] = useState(false);
  const [gameId, setGameId] = useState(null);
  const [imready, setimready] = useState(false);
  const [waitingPlayer, setwaitingPlayer] = useState(0);
  const [positionPlayer, setPositionPlayer] = useState([0,0,0,0,0,0,0,0,0,0]);

  useEffect(() => {

    socket.on("FromAPI", data => {
      settimeoutGamestart(data);
    });

    socket.on("waiting player", data => {
      setwaitingPlayer(data.n);
    });

    socket.on("start game", data => {
      console.log("game start");
      setGameId(data.id);
      numPlayer = data.numPlayer;
      setPositionPlayer(data.position);
      game = new Game(socket,data.id,numPlayer,data.position.length);
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

  const printImReady = () => {
    if(imready){ 
      return (<span class="text-danger">You are ready !</span>);
    }else{
      return null;
    }
  }

  const printInfo = () => {
    if(waitingPlayer >= 3){ 
      return (<p>Game will start in {timeoutGamestart}s</p>);
    }else{
      return (<p>required minimum 3 players</p>);
    }
  }

  if (gameStart){
    return (
      <div>
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
      <div class="section-1-container section-container m-4">
        <div class="container">
            <div class="row text-center">
                <div class="col section-1 section-description">
                    <h1>PONG ROYAL</h1>
                    <div class="divider-1"><span></span></div>
                    <p>Waiting for players <b>{waitingPlayer}/10</b></p>
                    {printInfo()}

                </div>
            </div>
            <div class="div-wrapper d-flex justify-content-center align-items-center">
              <div class="row">
                  <div class="col-10 offset-1 col-lg-8 offset-lg-2 d-flex justify-content-center align-items-center">
                    <div class="input-pseudo  mr-2">
                      <input id="pseudo" type="text" class="form-control" aria-label="Pseudo" placeholder="Pseudo" aria-describedby="inputGroup-sizing"/>
                    </div>
                    <button onClick={(btn) => {if(!imready){socket.emit("player ready",{pseudo:document.getElementById("pseudo").value});setimready(true);}}} type="button" class="btn btn-info" disabled={false}>I'm ready</button>                  
                  </div>
              </div>
              <div class="row">
                <div class="col mt-2">
                  {printImReady()}
                </div>
              </div>
            </div>

            <ResultScreen show={showResult}/>
          
        </div>
      </div>
    );
  }
}

export default App;
