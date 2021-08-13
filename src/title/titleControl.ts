import p5 from 'p5';
import { Howl, Howler } from 'howler';
import { SelectMenuControl } from '../index';
import { game } from '../index';
import IKeyControl from '../iKeyControl';
import { clickSE } from '../index';

const clickSound: Howl = new Howl({
  src: [clickSE],
});

/**
 * TitleControlクラス。タイトル画面のキー入力処理を行う
 *
 * @export
 * @class TitleControl
 * @implements {IKeyControl}
 */
export default class TitleControl implements IKeyControl {
  /**
   * 引数のkeyCodeから、どの入力かを判断する
   *
   * @param {p5} p
   * @param {number} keyCode
   * @memberof TitleControl
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
    }
  }

  /**
   * 左入力。SelectMenuに遷移する
   *
   * @param {p5} p
   * @memberof TitleControl
   */
  left(p: p5) {
    clickSound.play();
    game.state = 1;
    game.rescreen(p);
    game.keyControl = new SelectMenuControl();
  }

  /**
   * 右入力。SelectMenuに遷移する
   *
   * @param {p5} p
   * @memberof TitleControl
   */
  right(p: p5) {
    clickSound.play();
    game.state = 1;
    game.rescreen(p);
    game.keyControl = new SelectMenuControl();
  }

  /**
   * コンフィグ。タイトル画面では機能しない
   *
   * @param {p5} p
   * @memberof TitleControl
   */
  config(p: p5) {}

  /**
   * 決定入力。SelectMenuに遷移する
   *
   * @param {p5} p
   * @memberof TitleControl
   */
  space(p: p5) {
    clickSound.play();
    game.state = 1;
    game.rescreen(p);
    game.keyControl = new SelectMenuControl();
  }
}
