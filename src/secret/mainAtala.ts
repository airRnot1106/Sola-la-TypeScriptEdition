import p5 from 'p5';
import { Vec2, Atala } from '../index';
import { game } from '../index';

export let atala: Atala;

export default (p: p5) => {
  p.setup = () => {
    try {
      p.createCanvas(800, 450);
      atala = new Atala(new Vec2(0, 0));
    } catch (error) {
      console.error(error);
      game.resetByError(p);
    }
  };

  p.draw = () => {
    try {
      atala.draw(p);
    } catch (error) {
      console.error(error);
      game.resetByError(p);
    }
  };

  p.keyPressed = () => {
    try {
      game.keyControl.excute(p, p.keyCode);
    } catch (error) {
      console.error(error);
      game.resetByError(p);
    }
  };
};
