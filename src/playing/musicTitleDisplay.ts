import p5 from 'p5';
import { Vec2 } from '../index';
import { game, error } from '../index';

/**
 * MusicTitleDisplayクラス。曲名と難易度の描写を行う
 *
 * @export
 * @class MusicTitleDisplay
 */
export default class MusicTitleDisplay {
  private vec;
  private playingMusicData;
  constructor(_vec: Vec2) {
    this.vec = _vec;
    this.playingMusicData = game.playingMusic;
  }

  /**
   * 描写を行うメソッド。曲データが存在しない場合はNOT_EXISTS_MUSICエラーを返す
   *
   * @param {p5} p
   * @memberof MusicTitleDisplay
   */
  draw(p: p5) {
    if (!this.playingMusicData) {
      throw new Error(error.NOT_EXISTS_MUSIC());
    }
    p.push();
    p.fill(255);
    p.stroke(1);
    p.textAlign(p.RIGHT);
    p.textSize(16);
    p.textFont("'Press Start 2P', cursive");
    p.text(
      `${this.playingMusicData.title}\n${this.playingMusicData.levelStr}`,
      this.vec.x,
      this.vec.y
    );
    p.pop();
  }
}
