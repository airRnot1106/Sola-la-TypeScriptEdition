import p5 from 'p5';
import { Vec2, SelectMenu, SelectMenuMusic, musics, Config } from '../index';
import { game } from '../index';
import { SelectMenuImg } from '../index';

let selectMenuImg: p5.Image;
export let selectMenu: SelectMenu;
export let config: Config;

const selectMenuMusics = (() => {
  let array: SelectMenuMusic[] = [];
  for (let i = 0; i < musics.length; i++) {
    const defaultX = i !== 2 ? 17 : 15;
    array.push(
      new SelectMenuMusic(new Vec2(defaultX + i * 194, 142), musics[i])
    );
  }
  return array;
})();

export default (p: p5) => {
  p.preload = () => {
    try {
      selectMenuImg = p.loadImage(SelectMenuImg);
    } catch (error) {
      console.error(error);
      game.resetByError(p);
    }
  };

  p.setup = () => {
    try {
      p.createCanvas(800, 450);
      selectMenu = new SelectMenu(
        selectMenuImg,
        new Vec2(50, 50),
        selectMenuMusics
      );
      selectMenu.unsetAllSelected();
      setTimeout(() => {
        selectMenu.setSelected();
      }, 100);
      config = new Config();
    } catch (error) {
      console.error(error);
      game.resetByError(p);
    }
  };

  p.draw = () => {
    try {
      selectMenu.draw(p);
      if (selectMenu.isSetting) {
        config.draw(p);
      }
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
