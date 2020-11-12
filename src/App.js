import { Container, Graphics, Text } from "pixi.js";
import Logo from './Logo.js';
import Bite from './bite.js';
import Board from './Board.js';


function init({ stage, screen, ticker }) {
  const root = new Container();
  stage.addChild(root);

  const background = new Graphics();
  background.beginFill(0x282c34);
  background.drawRect(0, 0, screen.width, screen.height);
  background.endFill();
  root.addChild(background);

/*
  const logo = Logo(0xe91e63);
  logo.position.set(screen.width / 2, (screen.height * 43) / 100);
  root.addChild(logo);
*/

  const bite = Bite(0xe91e63);
  bite.position.set(screen.width / 2, (screen.height * 43) / 100);
  root.addChild(bite);


  const board = Board(0xe91e63,8);
  board.position.set(screen.width / 2, (screen.height * 43) / 100);
  root.addChild(board);

  const text = new Text("Hello polygone!.", {
    fontSize: 34,
    fill: 0xffffff,
  });
  text.anchor.set(0.5, 0);
  text.position.set(screen.width / 2, (screen.height * 70) / 100);
  root.addChild(text);

/*
  ticker.add((delta) => {
    logo.rotation += (Math.PI / 480) * delta;
  });
  */

  ticker.add((delta) => {
    bite.rotation += (Math.PI / 480) * delta;
  });

}

export default function main(app) {
  init(app);
}


