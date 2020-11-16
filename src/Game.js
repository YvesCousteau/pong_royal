import { Container, Graphics, Text } from "pixi.js";
import {Board,MouvePlayer} from './Board.js';
import keyboard from './keyboard.js';


let rightPressing = false;
let leftPressing = false;

let socket = null;
let gameId = null;
let numPlayer = 0;
let nbPlayer = 0;

let positionPlayer = [0,0,0,0,0,0,0,0,0,0];
let limitMin = 0;
let limitMax = 0;

let widthSide = 0;
let barWidth = 0;
let SpeedPlayer = 5;

let x = null;
let y = null;

class game {

  constructor(s,idG,n,nbp){
    socket = s;
    gameId = idG;
    numPlayer = n;
    nbPlayer = nbp
    console.log("start GameId : "+gameId+ " num player: "+numPlayer);
    //this.init(game);
  }

  init({ stage, screen, ticker }) {
    const root = new Container();
    stage.addChild(root);

    /*const background = new Graphics();
    background.beginFill(0x282c34);
    background.drawRect(0, 0, screen.width, screen.height);
    background.endFill();
    root.addChild(background);
    */
    let board = Board(0x4CD2CA,nbPlayer,numPlayer);
    board.position.set(screen.width / 2, (screen.height * 43) / 100);
    root.addChild(board);

    let r = 400;
    x = new Array(nbPlayer);
    y = new Array(nbPlayer);

    for(let i=0; i<nbPlayer;i++){
      x[i] = r * Math.cos(2*Math.PI*(i+1)/nbPlayer)
      y[i] = r * Math.sin(2*Math.PI*(i+1)/nbPlayer)
    }
    widthSide = Math.sqrt(Math.pow(x[1]-x[0],2)+Math.pow(y[1]-y[0],2));
    barWidth = widthSide/8;
    SpeedPlayer = widthSide/30;

    limitMax = widthSide/2;
    limitMin = -widthSide/2+barWidth;

    let keyLeft = keyboard("ArrowLeft");
    let keyRight = keyboard("ArrowRight");

    keyRight.press = () => {rightPressing = true;};
    keyRight.release = () => {rightPressing = false;};
    keyLeft.press = () => {leftPressing = true;};
    keyLeft.release = () => {leftPressing = false;};

    ticker.add(delta => this.gameLoop(delta,numPlayer));


  }

  gameLoop(delta,numPlayer){
    //60 fps
    //console.log(numPlayer);
    //console.log(positionPlayer);

    if(rightPressing && positionPlayer[numPlayer]+SpeedPlayer <= limitMax){
      console.log("press right")
      socket.emit('MovePlayer', { player: numPlayer,move:SpeedPlayer,gameId: gameId});     
    }
    if(leftPressing && positionPlayer[numPlayer]-SpeedPlayer >= limitMin){
      socket.emit('MovePlayer', { player: numPlayer,move:-SpeedPlayer,gameId: gameId});
    }

  }
  UpdatePosition(p){
    positionPlayer = p;
    if(positionPlayer){
      for (let i = 0;i<positionPlayer.length;i++){
        MouvePlayer(i,positionPlayer[i]);
      }

    }else{
      console.log("[UpdatePosition] Empty positionPlayer");
    }
  }

  
}

export default game;
//export {UpdatePosition};


