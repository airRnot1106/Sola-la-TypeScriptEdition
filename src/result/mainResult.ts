import p5 from 'p5';
import { Result } from '../index';
import { game } from '../index';

export let result: Result;

export default (p: p5) => {
  p.setup = () => {
    try {
      p.createCanvas(800, 450);
      result = new Result();
    } catch (error) {
      console.error(error);
      game.resetByError(p);
    }
  };

  p.draw = () => {
    try {
      result.draw(p);
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
