import { Container, Graphics } from "pixi.js";


function drawPolygone(size,color,side,arena){
  let r = size;
  let width = 5;

  const graphic = new Graphics();
  graphic.lineStyle(width,color-0x222222);
  graphic.moveTo(arena[0][0], arena[0][1]);
  for(let i=0; i<side;i++){
    graphic.lineTo(arena[i][0], arena[i][1]);
    graphic.moveTo(arena[i][0], arena[i][1]);
  }
  graphic.lineTo(arena[0][0], arena[0][1]);

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

function drawBarPlayer(numPlayer,nbPlayers,color,arena,barwidth){
  let centerX = ( arena[numPlayer][0] + arena[(numPlayer+1)%nbPlayers][0] )/2;

  let centerY = ( arena[numPlayer][1] + arena[(numPlayer+1)%nbPlayers][1] )/2;
  let alpha = getAlpha(arena[numPlayer][0],
    arena[(numPlayer+1)%nbPlayers][0],
    arena[numPlayer][1],
    arena[(numPlayer+1)%nbPlayers][1]);

  let width = 10;

  const graphic = new Graphics();
  //graphic.rotation = alpha;

  graphic.beginFill(color);
  graphic.drawRect(-barwidth/2, 0, barwidth, width)
  graphic.endFill();


  graphic.rotation = alpha;
  graphic.position.x = centerX;
  graphic.position.y = centerY;

  return graphic;
}


var barPlayer = null;
var balles = null;

function Board(color,nbPlayers,numPlayer,a,barwidth,nbBalle) {
  const board = new Container();
  const arena = a;
  const plateau2 = drawPolygone(400,color,nbPlayers,arena);
  board.addChild(plateau2);

  barPlayer = new Array(nbPlayers);
  let colorBar = null;

  for(let i=0; i<nbPlayers;i++){
    if(numPlayer == i)
      colorBar = 0xe91e63;
    else
      colorBar = color;
    barPlayer[i] = drawBarPlayer(i,nbPlayers,colorBar,arena,barwidth);
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
    balles[i].pivot.set(-offset[0],-offset[1]);
  }
}


export {Board,MouvePlayer,MouveBalle};
