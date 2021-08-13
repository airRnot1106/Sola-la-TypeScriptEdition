import p5 from 'p5';
import Note from './note';
import { Vec2, Score } from '../index';
import { game, error, lengthRatio } from '../index';
import { Length } from 'musicData';

/**
 * RollNoteクラス。ロールノーツの描写を行う
 *
 * @export
 * @class RollNote
 * @extends {Note}
 */
export default class RollNote extends Note {
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
   * @memberof RollNote
   */
  draw(p: p5) {
    if (!this.isValid) {
      return;
    }
    p.push();
    p.noStroke();
    p.fill('#f0b40a');
    const tailVec = this.vec.add(new Vec2(this.calcNoteLength(), 0));
    p.circle(tailVec.x, tailVec.y, 40);
    p.rectMode(p.CORNERS);
    p.rect(this.vec.x, this.vec.y - 20, tailVec.x, tailVec.y + 20);
    p.fill('#ffffff');
    p.circle(this.vec.x, this.vec.y, 40);
    p.fill('#f0b40a');
    p.circle(this.vec.x, this.vec.y, 30);
    p.pop();
  }

  /**
   * 判定を行うメソッド
   *
   * @param {p5} p
   * @return {*}
   * @memberof RollNote
   */
  judge(p: p5) {
    if (!this.isValid) {
      return;
    }
    if (this.calcDistance() > 0) {
      return;
    }
    this.score.add(p, 'roll');
  }

  /**
   * 死状態にするメソッド
   *
   * @param {p5} p
   * @memberof RollNote
   */
  die(p: p5) {
    this.score.dieRollFlg();
    this.isValid = false;
  }

  /**
   * ロールノーツの長さを返す。曲データが存在しない場合はNOT_EXISTS_MUSICエラーを返す
   *
   * @return {*}
   * @memberof RollNote
   */
  calcNoteLength() {
    if (!game.playingMusic) {
      throw new Error(error.NOT_EXISTS_MUSIC());
    }
    return (
      game.playingMusic.oneBarLength *
        (lengthRatio[this.length] / lengthRatio[1]) -
      40
    );
  }
}
