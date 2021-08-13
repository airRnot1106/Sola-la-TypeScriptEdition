import p5 from 'p5';
import { Vec2, Score } from '../index';
import { game, error } from '../index';
import { Length } from 'musicData';

/**
 * Noteクラス。ノーツの描写を行う
 *
 * @export
 * @abstract
 * @class Note
 */
export default abstract class Note {
  protected vec;
  protected length;
  protected judgmentFrameVec;
  protected score;
  protected isValid;
  constructor(
    _vec: Vec2,
    _length: Length,
    _judgmentFrameVec: Vec2,
    _score: Score
  ) {
    this.vec = _vec;
    this.length = _length;
    this.judgmentFrameVec = _judgmentFrameVec;
    this.score = _score;
    this.isValid = true;
  }
  get flg() {
    return this.isValid;
  }

  /**
   * judgmentFrameとの距離を返す
   *
   * @return {*}
   * @memberof Note
   */
  calcDistance() {
    return this.vec.sub(this.judgmentFrameVec).x;
  }

  /**
   * 1フレームにスクロールする距離を返す。曲データが存在しない場合はNOT_EXISTS_MUSICエラーを返す
   *
   * @protected
   * @param {p5} p
   * @return {*}
   * @memberof Note
   */
  protected calcMoveFrame(p: p5) {
    if (!game.playingMusic) {
      throw new Error(error.NOT_EXISTS_MUSIC());
    }
    let frameRate = p.frameRate();
    if (frameRate < 1) {
      frameRate = 60;
    }
    const bpm = game.playingMusic.bpm;
    const oneBarLength = game.playingMusic.oneBarLength;
    const oneMeasureFrame = (60 / bpm) * 4 * 60;
    let movingPixel = oneBarLength / oneMeasureFrame;
    movingPixel *= 60 / frameRate;
    return movingPixel;
  }

  /**
   * スクロールを行う
   *
   * @param {p5} p
   * @memberof Note
   */
  scroll(p: p5) {
    this.vec = this.vec.add(new Vec2(this.calcMoveFrame(p) * -1, 0));
  }

  /**
   * 描写を行うメソッド
   *
   * @abstract
   * @param {p5} p
   * @memberof Note
   */
  abstract draw(p: p5): void;

  /**
   * 判定を行うメソッド
   *
   * @abstract
   * @param {p5} p
   * @memberof Note
   */
  abstract judge(p: p5): void;

  /**
   * 死状態にするメソッド
   *
   * @abstract
   * @param {p5} p
   * @memberof Note
   */
  abstract die(p: p5): void;
}
