import { Container, Graphics } from "pixi.js";


function drawPolygone(size,color,side,x,y){
  let r = size;
  let width = 5;

  for(let i=0; i<side;i++){
    x[i] = r * Math.cos(2*Math.PI*(i+1)/side)
    y[i] = r * Math.sin(2*Math.PI*(i+1)/side)
  }

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

function getAlpha(xa,xb,ya,yb){
  return Math.atan2((ya-yb),(xa-xb))+Math.PI;
}

function drawBarPlayer(numPlayer,nbPlayers,color,x,y){
  let centerX = ( x[numPlayer] + x[(numPlayer+1)%nbPlayers]  )/2;
  let centerY = ( y[numPlayer] + y[(numPlayer+1)%nbPlayers]  )/2;
  let alpha = getAlpha(x[numPlayer],x[(numPlayer+1)%nbPlayers],y[numPlayer],y[(numPlayer+1)%nbPlayers]);

  let width = 10;
  let widthSide = Math.sqrt(Math.pow(x[1]-x[0],2)+Math.pow(y[1]-y[0],2));
  let barWidth = widthSide/8;

  const graphic = new Graphics();
  //graphic.rotation = alpha;

  graphic.beginFill(color);
  graphic.drawRect(0, 0, barWidth, width)
  graphic.endFill();


  graphic.rotation = alpha;
  graphic.position.x = centerX;
  graphic.position.y = centerY;

  return graphic;
}


var barPlayer = null;

function Board(color,nbPlayers,numPlayer) {
  const board = new Container();
  const x = new Array(nbPlayers);
  const y = new Array(nbPlayers);
  const plateau2 = drawPolygone(400,color,nbPlayers,x,y);
  board.addChild(plateau2);

  barPlayer = new Array(nbPlayers);
  let colorBar = null;

  for(let i=0; i<nbPlayers;i++){
    if(numPlayer == i)
      colorBar = 0xe91e63;
    else
      colorBar = color;
    barPlayer[i] = drawBarPlayer(i,nbPlayers,colorBar,x,y);
    barPlayer[i].interactive = true;
    barPlayer[i].buttonMode = true;
    barPlayer[i].on('pointerdown', function(e) { console.log("click la bar player"+i) });
    board.addChild(barPlayer[i]);
  }

  //boule2.pivot.set(180, 0);
  
  board.rotation = -((Math.PI)/(nbPlayers/2))/4;  

  return board;
}

function MouvePlayer(numPlayer,offset){
  if (barPlayer[numPlayer]){
    barPlayer[numPlayer].pivot.set(offset,0);
  }
}


export {Board,MouvePlayer};
