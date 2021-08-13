import p5 from 'p5';
import { Music } from 'musicData';
import { Vec2 } from '../index';

/**
 * SelectMenuMusicクラス。曲データの表示を行う
 *
 * @export
 * @class SelectMenuMusic
 */
export default class SelectMenuMusic {
  private vec;
  private music;
  private isSelected: boolean;
  constructor(_vec: Vec2, _music: Music) {
    this.vec = _vec;
    this.music = _music;
    this.isSelected = false;
  }
  get musicData() {
    return this.music;
  }

  /**
   * 描写を行うメソッド
   *
   * @param {p5} p
   * @memberof SelectMenuMusic
   */
  draw(p: p5) {
    const borderColor = this.isSelected ? 'yellow' : 'white';
    p.noFill();
    p.stroke(borderColor);
    p.rectMode(p.CORNER);
    p.strokeWeight(5);
    p.rect(this.vec.x, this.vec.y, 160, 203);
    p.fill(0);
    p.strokeWeight(1);
    p.textAlign(p.LEFT);
    p.textSize(25);
    p.textFont('Helvetica');
    const title = this.music.title.replace(' ', '\n');
    p.text(title, this.vec.x + 25, this.vec.y + 35);
    p.text(this.music.levelStr, this.vec.x + 25, this.vec.y + 105);
    p.text(this.music.levelStar, this.vec.x + 15, this.vec.y + 170);
  }

  /**
   * 選択状態にする
   *
   * @memberof SelectMenuMusic
   */
  setSelected() {
    this.isSelected = true;
  }

  /**
   * 選択状態を解除する
   *
   * @memberof SelectMenuMusic
   */
  unsetSelected() {
    this.isSelected = false;
  }
}
