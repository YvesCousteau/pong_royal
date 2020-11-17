import './App.css';

import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import Canvas from "./Canvas";
import Game from "./Game";

import {ResultScreen, ModalScore} from "./ResultScreen";

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

  const [timeoutGamestart, settimeoutGamestart] = useState(10);
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
      game = new Game(socket,data.id,numPlayer,data.position.length,data.arena,data.barWidth,data.balls.length);
      setgameStart(true);
    });

    socket.on("Update game", data => {
      setPositionPlayer(data.pos);
      game.UpdatePositionPlayer(data.pos);
      game.UpdatePositionBalle(data.balls);
      console.log(data.balls[0]);
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


  const generateGame = () => {

    socket.emit("generate game",null);
    /*
    setGameId(1);
    numPlayer = 3;
    setPositionPlayer([0,0,0,0,0]);

    let arena = new Array(5);
    for(let i=0; i<5;i++){
      arena[i] = [400 * Math.cos(2*Math.PI*(i+1)/5),400 * Math.sin(2*Math.PI*(i+1)/5)];
    }
    
    game = new Game(socket,1,numPlayer,5,arena,50,3);

    setgameStart(true);
    */
  }


  if (gameStart){
    return (
      <div>

        <ModalScore show={true}/>

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

        <div class="container-main">
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
            <button onClick={(btn) => {generateGame()}} type="button" class="btn btn-danger">GENERATE GAME</button>

          <div>
            <div class="scene">
              <div class="container">
                <div class="sun"></div>
                <div class="band s0"></div>
                <div class="band s01"></div>
                <div class="band s1"></div>
                <div class="band s11"></div>
                <div class="band s2"></div>
                <div class="band s21"></div>
                <div class="band s3"></div>
                <div class="band s31"></div>
                <div class="band s4"></div>
                <div class="band s41"></div>
                <div class="band s5"></div>
                <div class="band s51"></div>
                <div class="band s6"></div>
                <div class="band s61"></div>
                <div class="band s7"></div>
                <div class="band s71"></div>
                <div class="band s8"></div>
                <div class="band s81"></div>
                <div class="band s9"></div>
                <div class="band s91"></div>
                <div class="band s10"></div>
                <div class="band s101"></div>
                <div class="band s11_"></div>
                <div class="band s111"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
