import p5 from 'p5';
import { Howl, Howler } from 'howler';
import { playing } from '../index';
import IKeyControl from 'iKeyControl';
import { clickSE } from '../index';

const clickSound: Howl = new Howl({
  src: [clickSE],
});

/**
 * PlayingControlクラス。演奏画面のキー入力の処理を行う
 *
 * @export
 * @class PlayingControl
 * @implements {IKeyControl}
 */
export default class PlayingControl implements IKeyControl {
  /**
   * 引数のkeyCodeから、どの入力かを判断する
   *
   * @param {p5} p
   * @param {number} keyCode
   * @memberof PlayingControl
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
   * 左入力。judgeを行う
   *
   * @param {p5} p
   * @memberof PlayingControl
   */
  left(p: p5) {
    playing.judgmentFrame.press();
    playing.findNextNote()?.judge(p);
  }

  /**
   * 右入力。judgeを行う
   *
   * @param {p5} p
   * @memberof PlayingControl
   */
  right(p: p5) {
    playing.judgmentFrame.press();
    playing.findNextNote()?.judge(p);
  }

  /**
   * コンフィグ。演奏画面では機能しない
   *
   * @param {p5} p
   * @memberof PlayingControl
   */
  config(p: p5) {}

  /**
   * 決定入力。judgeを行う
   *
   * @param {p5} p
   * @memberof PlayingControl
   */
  space(p: p5) {
    playing.judgmentFrame.press();
    playing.findNextNote()?.judge(p);
  }
}
