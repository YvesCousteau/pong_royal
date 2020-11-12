import { Container, Graphics, Text } from "pixi.js";

function ellipse(size, color) {
  const ratio = 2.5;
  const graphic = new Graphics();
  graphic.beginFill(color);
  graphic.drawEllipse(0, 0, size / ratio, size);
  graphic.beginHole();

  const diff = size / 5;
  graphic.drawEllipse(0, 0, (size - diff) / ratio, size - diff / ratio);
  graphic.endHole();
  return graphic;
}

function circle(size, color) {
  const graphic = new Graphics();
  graphic.beginFill(color);
  graphic.drawCircle(0, 0, size);
  graphic.endFill();
  return graphic;
}

function Logo(color) {
  const logo = new Container();

  const el1 = ellipse(180, color);

  const el2 = ellipse(180, color);
  el2.rotation = Math.PI / 3;

  const el3 = ellipse(180, color);
  el3.rotation = -Math.PI / 3;

  logo.addChild(el1, el2, el3, circle(35, color));

  return logo;
}

export default Logo;
