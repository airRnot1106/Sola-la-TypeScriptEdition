import p5 from 'p5';
import { Vec2 } from '../index';

/**
 * JudgmentFrameクラス。判定枠の描写を行う
 *
 * @export
 * @class JudgmentFrame
 */
export default class JudgmentFrame {
  private vec;
  private isPressed;
  constructor(_vec: Vec2) {
    this.vec = _vec;
    this.isPressed = false;
  }

  /**
   * 描写を行うメソッド
   *
   * @param {p5} p
   * @memberof JudgmentFrame
   */
  draw(p: p5) {
    p.push();
    p.noFill();
    p.stroke('#ffffff');
    p.strokeWeight(1);
    p.circle(this.vec.x, this.vec.y, this.isPressed ? 48 : 45);
    p.circle(this.vec.x, this.vec.y, this.isPressed ? 36 : 35);
    p.fill(this.isPressed ? '#ffec6a' : '#797979');
    p.noStroke();
    p.circle(this.vec.x, this.vec.y, 30);
    p.pop();
  }

  /**
   * 押下状態にする
   *
   * @memberof JudgmentFrame
   */
  press() {
    this.isPressed = true;
    setTimeout(() => {
      this.isPressed = false;
    }, 40);
  }
}
