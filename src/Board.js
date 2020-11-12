import { Container, Graphics } from "pixi.js";


function drawPolygone(size,color,side,x,y){
  let r = size;
  let width = 5;

  for(let i=0; i<side;i++){
    x[i] = r * Math.cos(2*Math.PI*(i+1)/side)
    y[i] = r * Math.sin(2*Math.PI*(i+1)/side)
  }

  const graphic = new Graphics();
  graphic.lineStyle(width,color);
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
  if (xb >= 0){
    return Math.acos((xb-xa)/(Math.sqrt(Math.pow((xb-xa),2)+Math.pow((yb-ya),2))));
  }else{
    return -Math.acos((xb-xa)/(Math.sqrt(Math.pow((xb-xa),2)+Math.pow((yb-ya),2))));
  }
}

function drawBarPlayer(numPlayer,nbPlayers,color,x,y,pos){
  let centerX = ( x[numPlayer] + x[(numPlayer+1)%nbPlayers]  )/2;
  let centerY = ( y[numPlayer] + y[(numPlayer+1)%nbPlayers]  )/2;
  let alpha = getAlpha(x[numPlayer],x[(numPlayer+1)%nbPlayers],y[numPlayer],y[(numPlayer+1)%nbPlayers]);

  console.log("player"+numPlayer+" alpha:"+alpha);

  let width = 5;
  let barWidth = 30;

  const graphic = new Graphics();
  //graphic.rotation = alpha;

  graphic.beginFill(color-0x222222);
  graphic.drawRect(0, 0, barWidth, 5)
  graphic.endFill();


  graphic.rotation = alpha;
  graphic.position.x = centerX;
  graphic.position.y = centerY;

  graphic.pivot.set(pos,0);

  return graphic;
}


function Board(color,nbPlayers) {
  const board = new Container();
  const x = new Array(nbPlayers);
  const y = new Array(nbPlayers);
  const plateau2 = drawPolygone(400,color,nbPlayers,x,y);
  board.addChild(plateau2);


  const barPlayer = new Array(nbPlayers);
  for(let i=0; i<nbPlayers;i++){
    barPlayer[i] = drawBarPlayer(i,nbPlayers,color,x,y,-50);
    barPlayer[i].interactive = true;
    barPlayer[i].buttonMode = true;
    barPlayer[i].on('pointerdown', function(e) { console.log("click la bar player"+i) });
    board.addChild(barPlayer[i]);
  }

  //boule2.pivot.set(180, 0);

  board.rotation = Math.PI/nbPlayers;

  return board;
}

export default Board;
