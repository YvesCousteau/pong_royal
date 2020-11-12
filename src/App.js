import { Container, Graphics, Text } from "pixi.js";
import Bite from './bite.js';
import {Board,MouvePlayer} from './Board.js';
import keyboard from './keyboard.js';


let rightPressing = false;
let leftPressing = false;
let SpeedPlayer = 5;

function init({ stage, screen, ticker }) {
  const root = new Container();
  stage.addChild(root);

  const background = new Graphics();
  background.beginFill(0x282c34);
  background.drawRect(0, 0, screen.width, screen.height);
  background.endFill();
  root.addChild(background);

  /*
  const bite = Bite(0xe91e63);
  bite.position.set(screen.width / 2, (screen.height * 43) / 100);
  //root.addChild(bite);
  ticker.add((delta) => {
    bite.rotation += (Math.PI / 480) * delta;
  });
  const text = new Text("Hello polygone!.", {
    fontSize: 34,
    fill: 0xffffff,
  });
  text.anchor.set(0.5, 0);
  text.position.set(screen.width / 2, (screen.height * 70) / 100);
  root.addChild(text);
  */



  let nbPlayer = 8;
  let board = Board(0xe91e63,nbPlayer);
  board.position.set(screen.width / 2, (screen.height * 43) / 100);
  root.addChild(board);


  let keyLeft = keyboard("ArrowLeft");
  let keyRight = keyboard("ArrowRight");

  keyRight.press = () => {rightPressing = true;};
  keyRight.release = () => {rightPressing = false;};
  keyLeft.press = () => {leftPressing = true;};
  keyLeft.release = () => {leftPressing = false;};

  gameLoop(0);

}

function gameLoop(timestamp){
  //60 fps
  //console.log(timestamp);

  requestAnimationFrame(function(timestamp) {
    gameLoop(timestamp);
  });


  if(rightPressing){
    MouvePlayer(0,SpeedPlayer);
  }
  if(leftPressing){
    MouvePlayer(0,-SpeedPlayer);
  }

}


export default function main(app) {
  init(app);
}


