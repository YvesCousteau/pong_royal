import { Container, Graphics } from "pixi.js";


function drawPolygone(size,color,side,x,y){
  let r = size;
  let width = 5;

  const graphic = new Graphics();
  graphic.lineStyle(width,color-0x222222);
  graphic.moveTo(x[0], y[0]);
  for(let i=0; i<side;i++){
    graphic.lineTo(x[i], y[i]);
    graphic.moveTo(x[i], y[i]);
  }
  graphic.lineTo(x[0], y[0]);

  //console.log(x);console.log(y);
  return graphic;
}

function drawBall(color,x,y){
  let width = 10;
  const graphic = new Graphics();

  graphic.beginFill(color);
  graphic.drawCircle(0, 0, width);
  graphic.endFill();

  return graphic;
}

function getAlpha(xa,xb,ya,yb){
  return Math.atan2((ya-yb),(xa-xb))+Math.PI;
}

function drawBarPlayer(numPlayer,nbPlayers,color,x,y,barwidth){
  let centerX = ( x[numPlayer] + x[(numPlayer+1)%nbPlayers]  )/2;
  let centerY = ( y[numPlayer] + y[(numPlayer+1)%nbPlayers]  )/2;
  let alpha = getAlpha(x[numPlayer],x[(numPlayer+1)%nbPlayers],y[numPlayer],y[(numPlayer+1)%nbPlayers]);

  let width = 10;

  const graphic = new Graphics();
  //graphic.rotation = alpha;

  graphic.beginFill(color);
  graphic.drawRect(0, 0, barwidth, width)
  graphic.endFill();


  graphic.rotation = alpha;
  graphic.position.x = centerX;
  graphic.position.y = centerY;

  return graphic;
}


var barPlayer = null;
var balles = null;

function Board(color,nbPlayers,numPlayer,tabx,taby,barwidth,nbBalle) {
  const board = new Container();
  const x = tabx;
  const y = taby;
  const plateau2 = drawPolygone(400,color,nbPlayers,x,y);
  board.addChild(plateau2);

  barPlayer = new Array(nbPlayers);
  let colorBar = null;

  for(let i=0; i<nbPlayers;i++){
    if(numPlayer == i)
      colorBar = 0xe91e63;
    else
      colorBar = color;
    barPlayer[i] = drawBarPlayer(i,nbPlayers,colorBar,x,y,barwidth);
    board.addChild(barPlayer[i]);
  }

  balles = new Array(nbBalle);

  for(let i=0; i<nbBalle;i++){
    balles[i] = drawBall(color,0,0);
    board.addChild(balles[i]);
  }

  //boule2.pivot.set(180, 0);
  board.rotation = - ( ((Math.PI)/(nbPlayers)) * ((numPlayer+1)*2) ) + ((Math.PI)/(nbPlayers)/2) ;

  return board;
}

function MouvePlayer(numPlayer,offset){
  if (barPlayer[numPlayer]){
    barPlayer[numPlayer].pivot.set(offset,0);
  }
}

function MouveBalle(i,offset){
  if (balles[i]){
    balles[i].pivot.set(offset.x,offset.y);
  }
}


export {Board,MouvePlayer,MouveBalle};
