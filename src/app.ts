import p5 from 'p5';
import { Game } from './index';

export const game = new Game();

//screenの初期化
(() => {
  const screen = game.switchScreen();
  new p5(screen);
})();
