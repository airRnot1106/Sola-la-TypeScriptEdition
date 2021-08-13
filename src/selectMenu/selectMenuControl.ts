import p5 from 'p5';
import { Howl, Howler } from 'howler';
import { ConfigControl, PlayingControl, AtalaControl } from '../index';
import { game, selectMenu } from '../index';
import IKeyControl from 'iKeyControl';
import { clickSE } from '../index';

const clickSound: Howl = new Howl({
  src: [clickSE],
});

/**
 * SelectMenuControlクラス。曲選択画面のキー入力処理を行う
 *
 * @export
 * @class SelectMenuControl
 * @implements {IKeyControl}
 */
export default class SelectMenuControl implements IKeyControl {
  private commandState;
  constructor() {
    this.commandState = 0;
  }

  /**
   * 引数のkeyCodeから、どの入力かを判断する
   *
   * @param {p5} p
   * @param {number} keyCode
   * @memberof SelectMenuControl
   */
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
      default:
        this.acceptCommand(p, keyCode);
    }
  }

  /**
   * 左入力。一つ左の曲に移動する
   *
   * @param {p5} p
   * @return {*}
   * @memberof SelectMenuControl
   */
  left(p: p5) {
    clickSound.play();
    if (!selectMenu.isSelectable('left')) {
      return;
    }
    selectMenu.unsetAllSelected();
    selectMenu.selectingMusic -= 1;
    selectMenu.setSelected();
  }

  /**
   * 右入力。一つ右の曲に移動する
   *
   * @param {p5} p
   * @return {*}
   * @memberof SelectMenuControl
   */
  right(p: p5) {
    clickSound.play();
    if (!selectMenu.isSelectable('right')) {
      return;
    }
    selectMenu.unsetAllSelected();
    selectMenu.selectingMusic += 1;
    selectMenu.setSelected();
  }

  /**
   * コンフィグ。Configに遷移する
   *
   * @param {p5} p
   * @memberof SelectMenuControl
   */
  config(p: p5) {
    clickSound.play();
    selectMenu.isSetting = true;
    game.keyControl = new ConfigControl();
  }

  /**
   * 決定入力。選択中の曲データをgameに渡し、Playingに遷移する
   *
   * @param {p5} p
   * @memberof SelectMenuControl
   */
  space(p: p5) {
    clickSound.play();
    game.playingMusic =
      selectMenu.selectMenuMusic[selectMenu.selectingMusic].musicData;
    game.state = 2;
    game.rescreen(p);
    game.keyControl = new PlayingControl();
  }
  private acceptCommand(p: p5, keyCode: number) {
    switch (this.commandState) {
      case 0:
        if (keyCode === 16) {
          this.commandState = 1;
        } else {
          this.commandState = 0;
        }
        break;
      case 1:
        if (keyCode === 65) {
          this.commandState = 2;
        } else {
          this.commandState = 0;
        }
        break;
      case 2:
        if (keyCode === 84) {
          this.commandState = 3;
        } else {
          this.commandState = 0;
        }
        break;
      case 3:
        if (keyCode === 76) {
          this.commandState = 4;
        } else {
          this.commandState = 0;
        }
        break;
    }
    if (this.commandState === 4) {
      clickSound.play();
      game.state = -1;
      game.rescreen(p);
      game.keyControl = new AtalaControl();
    }
  }
}
