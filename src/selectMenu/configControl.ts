import p5 from 'p5';
import { Howl, Howler } from 'howler';
import { SelectMenuControl } from '../index';
import { game, selectMenu, config } from '../index';
import IKeyControl from '../iKeyControl';
import IKeyControlConfig from '../iKeyControlConfig';
import { clickSE } from '../index';

const clickSound: Howl = new Howl({
  src: [clickSE],
});

/**
 * ConfigControlクラス。コンフィグのキー入力処理を行う
 *
 * @export
 * @class ConfigControl
 * @implements {IKeyControl}
 * @implements {IKeyControlConfig}
 */
export default class ConfigControl implements IKeyControl, IKeyControlConfig {
  /**
   * 引数のkeyCodeから、どの入力かを判断する
   *
   * @param {p5} p
   * @param {number} keyCode
   * @memberof ConfigControl
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
      case 38:
        this.up(p);
        break;
      case 40:
        this.down(p);
        break;
    }
  }

  /**
   * 左入力。offsetを1減らす
   *
   * @param {p5} p
   * @memberof ConfigControl
   */
  left(p: p5) {
    clickSound.play();
    config.sub(1);
  }

  /**
   * 右入力。offsetを1増やす
   *
   * @param {p5} p
   * @memberof ConfigControl
   */
  right(p: p5) {
    clickSound.play();
    config.add(1);
  }

  /**
   * コンフィグ。すでにコンフィグに遷移しているので機能しない
   *
   * @param {p5} p
   * @memberof ConfigControl
   */
  config(p: p5) {}

  /**
   * 決定入力。offsetをgameに渡し、SelectMenuに遷移する
   *
   * @param {p5} p
   * @memberof ConfigControl
   */
  space(p: p5) {
    clickSound.play();
    config.applyOffset();
    selectMenu.isSetting = false;
    game.keyControl = new SelectMenuControl();
  }

  /**
   * 上矢印入力。offsetを10増やす
   *
   * @param {p5} p
   * @memberof ConfigControl
   */
  up(p: p5) {
    clickSound.play();
    config.add(10);
  }

  /**
   * 下矢印入力。offsetを10減らす
   *
   * @param {p5} p
   * @memberof ConfigControl
   */
  down(p: p5) {
    clickSound.play();
    config.sub(10);
  }
}
