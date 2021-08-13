import p5 from 'p5';
import { Howl, Howler } from 'howler';
import { PlayingControl, atalaData } from '../index';
import { game } from '../index';
import IKeyControl from 'iKeyControl';
import { clickSE } from '../index';

const clickSound: Howl = new Howl({
  src: [clickSE],
});

export default class SelectMenuControl implements IKeyControl {
  excute(p: p5, keyCode: number) {
    switch (keyCode) {
      case 70:
        this.left(p);
        break;
      case 74:
        this.right(p);
        break;
      case 67:
        this.config(p);
        break;
      case 32:
        this.space(p);
        break;
    }
  }
  left(p: p5) {}
  right(p: p5) {}
  config(p: p5) {}
  space(p: p5) {
    clickSound.play();
    game.playingMusic = atalaData[0];
    game.state = 2;
    game.rescreen(p);
    game.keyControl = new PlayingControl();
  }
}
