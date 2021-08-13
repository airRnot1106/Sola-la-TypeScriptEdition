import p5 from 'p5';
import Note from './note';
import { Vec2, Score } from '../index';
import { Length } from 'musicData';

/**
 * NormalNoteクラス。ノーマルノーツの描写を行う
 *
 * @export
 * @class NormalNote
 * @extends {Note}
 */
export default class NormalNote extends Note {
  constructor(
    _vec: Vec2,
    _length: Length,
    _judgmentFrameVec: Vec2,
    _score: Score
  ) {
    super(_vec, _length, _judgmentFrameVec, _score);
  }

  /**
   * 描写を行うメソッド
   *
   * @param {p5} p
   * @return {*}
   * @memberof NormalNote
   */
  draw(p: p5) {
    if (!this.isValid) {
      return;
    }
    p.push();
    p.noStroke();
    p.fill('ffffff');
    p.circle(this.vec.x, this.vec.y, 40);
    p.fill('#f03c23');
    p.circle(this.vec.x, this.vec.y, 30);
    p.pop();
  }

  /**
   * 判定を行うメソッド
   *
   * @param {p5} p
   * @return {*}
   * @memberof NormalNote
   */
  judge(p: p5) {
    if (!this.isValid) {
      return;
    }
    const quality = this.vec.sub(this.judgmentFrameVec).mag();
    if (quality >= 40) {
      return;
    }
    if (quality < 5) {
      this.score.add(p, 'perfect');
    } else if (quality < 10) {
      this.score.add(p, 'great');
    } else if (quality < 30) {
      this.score.add(p, 'nice');
    } else {
      this.score.add(p, 'miss');
    }
    this.isValid = false;
  }

  /**
   * 死状態にするメソッド
   *
   * @param {p5} p
   * @memberof NormalNote
   */
  die(p: p5) {
    this.score.add(p, 'miss');
    this.isValid = false;
  }
}
