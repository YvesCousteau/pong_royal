import React, { memo } from "react";
import { Application } from "pixi.js";

export default memo(({ game, ...props }) => (
  <canvas ref={(view) => {game.init(new Application({ view, ...props }));}}></canvas>
));
