import p5 from 'p5';
import { Vec2, Playing } from '../index';
import { game } from '../index';

export type BasicData = {
  musicTitleDisplayVec: Vec2;
  notesLineVec: Vec2;
};

const basicData: BasicData = {
  musicTitleDisplayVec: new Vec2(790, 25),
  notesLineVec: new Vec2(0, 90),
};

export let playing: Playing;

export default (p: p5) => {
  p.setup = () => {
    try {
      p.createCanvas(800, 450);
      p.frameRate(60);
      playing = new Playing(basicData);
    } catch (error) {
      console.error(error);
      game.resetByError(p);
    }
  };

  p.draw = () => {
    try {
      playing.draw(p);
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
