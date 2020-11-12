import { Container, Graphics } from "pixi.js";

function chibrax(size, color) {
  const ratio = 2.5;
  const graphic = new Graphics();
  graphic.beginFill(color);
  graphic.drawEllipse(0, 0, size / ratio, size);
  graphic.beginHole();

  const diff = size / 5;
  //graphic.drawEllipse(0, 0, (size - diff) / ratio, size - diff / ratio);
  graphic.drawRect(-2, -size+5, 5, 25);
  graphic.endHole();
  return graphic;
}

function boule(size, color) {
  const graphic = new Graphics();
  graphic.beginFill(color);
  graphic.drawCircle(90,180, size);
  graphic.endFill();
  return graphic;
}

function Bite(color) {
  const bite = new Container();

  const el1 = chibrax(180, color);
  const boule1 =boule(80, color);
  const boule2 =boule(80, color);

  //boule2.rotation = Math.PI;
  boule2.pivot.set(180, 0);

  bite.addChild(el1, boule1, boule2 );
  bite.interactive = true;
  bite.buttonMode = true;
  bite.on('pointerdown', function(e) { bite.scale.x *= 1.1;bite.scale.y *= 1.1; });

  return bite;
}

export default Bite;
