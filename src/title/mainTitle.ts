import p5 from 'p5';
import { Vec2, Title } from '../index';
import { game } from '../index';
import { TitleImg } from '../index';

let titleImg: p5.Image;
let title: Title;

export default (p: p5) => {
  p.preload = () => {
    try {
      titleImg = p.loadImage(TitleImg);
    } catch (error) {
      console.error(error);
      game.resetByError(p);
    }
  };

  p.setup = () => {
    try {
      p.createCanvas(800, 450);
      title = new Title(titleImg, new Vec2(50, 50));
    } catch (error) {
      console.error(error);
      game.resetByError(p);
    }
  };

  p.draw = () => {
    try {
      title.draw(p);
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
