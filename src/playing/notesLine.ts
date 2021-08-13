import p5 from 'p5';
import { Vec2 } from '../index';

/**
 * NotesLineクラス。ノーツが流れるラインの描写を行う
 *
 * @export
 * @class NotesLine
 */
export default class NotesLine {
  private vec;
  private scVec;
  private jFVec;
  constructor(_vec: Vec2) {
    this.vec = _vec;
    this.scVec = this.vec;
    this.jFVec = this.vec.add(new Vec2(185, 0));
  }
  get scoreVec() {
    return this.scVec;
  }
  get judgmentFrameVec() {
    return this.jFVec;
  }

  /**
   * 描写を行うメソッド
   *
   * @param {p5} p
   * @memberof NotesLine
   */
  draw(p: p5) {
    p.push();
    p.stroke(255);
    p.strokeWeight(8);
    p.line(this.vec.x, this.vec.y - 30, p.width, this.vec.y - 30);
    p.line(this.vec.x, this.vec.y + 30, p.width, this.vec.y + 30);
    p.pop();
  }
}
