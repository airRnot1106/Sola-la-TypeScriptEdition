import p5 from 'p5';
import { Vec2 } from '../index';

/**
 * Titleクラス。タイトル画面の描写を行う
 *
 * @export
 * @class Title
 */
export default class Title {
  private img;
  private vec;
  constructor(_img: p5.Image, _vec: Vec2) {
    this.img = _img;
    this.vec = _vec;
  }

  /**
   * 描写を行うメソッド
   *
   * @param {p5} p
   * @memberof Title
   */
  draw(p: p5) {
    p.image(this.img, 0, 0);
  }
}
