import {Board,MouvePlayer,MouveBalle} from './Board.js';
import { Container } from "pixi.js";
import keyboard from './keyboard.js';


let rightPressing = false;
let leftPressing = false;

let socket = null;
let gameId = null;
let numPlayer = 0;
let nbPlayer = 0;
let nbBalle = 0;
let x = [];
let y = [];
let barWidth = 0;


let positionPlayer = [0,0,0,0,0,0,0,0,0,0];
let positionBalle = [{x:0,y:0}];


class game {

  constructor(s,idG,n,nbp,tabx,taby,barwidth,nbb){
    socket = s;
    gameId = idG;
    numPlayer = n;
    nbPlayer = nbp;
    nbBalle = nbb;
    x = tabx;
    y = taby;
    barWidth = barwidth;
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

    let board = Board(0x4CD2CA,nbPlayer,numPlayer,x,y,barWidth,nbBalle);
    board.position.set(screen.width / 2, (screen.height * 43) / 100);
    root.addChild(board);

    let keyLeft = keyboard("ArrowLeft");
    let keyRight = keyboard("ArrowRight");

    keyRight.press = () => {rightPressing = true;};
    keyRight.release = () => {rightPressing = false;};
    keyLeft.press = () => {leftPressing = true;};
    keyLeft.release = () => {leftPressing = false;};

    // the equivalent of approximately 120 FPS
    ticker.speed = 0.5;
    ticker.add(delta => this.gameLoop(delta,numPlayer));



  }

  gameLoop(delta,numPlayer){
    //60 fps
    //console.log(numPlayer);
    //console.log(positionPlayer);

    if(rightPressing){
      socket.emit('MovePlayer', { player: numPlayer,move:1,gameId: gameId});     
    }
    if(leftPressing){
      socket.emit('MovePlayer', { player: numPlayer,move:-1,gameId: gameId});
    }

  }
  UpdatePositionBalle(p){

    positionBalle = p;
    if(positionBalle){
      for (let i = 0;i<positionBalle.length;i++){
        MouveBalle(i,positionBalle[i]);
      }
    }else{
      console.log("[UpdatePositionBalle] Empty positionBalle");
    }
  }

  UpdatePositionPlayer(p){
    positionPlayer = p;
    if(positionPlayer){
      for (let i = 0;i<positionPlayer.length;i++){
        MouvePlayer(i,positionPlayer[i]);
      }

    }else{
      console.log("[UpdatePositionPlayer] Empty positionPlayer");
    }
  }

  
}

export default game;
//export {UpdatePosition};


