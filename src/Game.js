import { Container, Graphics, Text } from "pixi.js";
import {Board,MouvePlayer} from './Board.js';
import keyboard from './keyboard.js';


let rightPressing = false;
let leftPressing = false;
let SpeedPlayer = 5;
let socket = null;

class game {

  constructor(s){
    socket = s;
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

    let nbPlayer = 10;
    let board = Board(0xe91e63,nbPlayer);
    board.position.set(screen.width / 2, (screen.height * 43) / 100);
    root.addChild(board);


    let keyLeft = keyboard("ArrowLeft");
    let keyRight = keyboard("ArrowRight");

    keyRight.press = () => {rightPressing = true;};
    keyRight.release = () => {rightPressing = false;};
    keyLeft.press = () => {leftPressing = true;};
    keyLeft.release = () => {leftPressing = false;};

    ticker.add(delta => this.gameLoop(delta));

    

  }

  gameLoop(delta){
    //60 fps
    //console.log(timestamp);


    if(rightPressing){
      //MouvePlayer(0,SpeedPlayer);
      //console.log("send MovePlayer")
      socket.emit('MovePlayer', { player: 0,move:SpeedPlayer });

    }
    if(leftPressing){
      //MouvePlayer(0,-SpeedPlayer);
      socket.emit('MovePlayer', { player: 0,move:-SpeedPlayer });
    }

  }
  UpdatePosition(positionPlayer){

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


