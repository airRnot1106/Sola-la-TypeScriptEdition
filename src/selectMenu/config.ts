import p5 from 'p5';
import { game } from '../index';

/**
 * Configクラス。コンフィグの描写を行う
 *
 * @export
 * @class Config
 */
export default class Config {
  private offsetValue;
  constructor() {
    this.offsetValue = 0;
  }

  /**
   * 描写を行うメソッド
   *
   * @param {p5} p
   * @memberof Config
   */
  draw(p: p5) {
    p.push();
    p.fill('#bebec8');
    p.stroke(10);
    p.rectMode(p.CENTER);
    p.strokeWeight(2);
    p.rect(p.width / 2, p.height / 2, 280, 200);
    p.fill('black');
    p.stroke(1);
    p.strokeWeight(1);
    p.textAlign(p.CENTER);
    p.textSize(40);
    p.textFont('Helvetica');
    p.text('Config', p.width / 2, 180);
    p.textSize(20);
    p.text(`Offset: ${this.offsetValue}`, p.width / 2, 270);
    p.pop();
  }

  /**
   * offsetを引数の値分増やす
   *
   * @param {number} _offset
   * @memberof Config
   */
  add(_offset: number) {
    this.offsetValue += _offset;
  }

  /**
   * offsetを引数の値分減らす
   *
   * @param {number} _offset
   * @memberof Config
   */
  sub(_offset: number) {
    this.offsetValue -= _offset;
  }

  /**
   * offsetをgameに渡す
   *
   * @memberof Config
   */
  applyOffset() {
    game.offset = this.offsetValue;
  }
}
