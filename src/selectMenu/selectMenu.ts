import p5 from 'p5';
import {
  Vec2,
  SelectMenuMusic,
  SelectMenuControl,
  ConfigControl,
} from '../index';

/**
 * SelectMenuクラス。曲選択画面の描写を行う
 *
 * @export
 * @class SelectMenu
 */
export default class SelectMenu {
  private img;
  private vec;
  private selectMenuMusics;
  private selectingMusicNumber;
  private settingFlg;
  constructor(
    _img: p5.Image,
    _vec: Vec2,
    _selectMenuMusics: SelectMenuMusic[]
  ) {
    this.img = _img;
    this.vec = _vec;
    this.selectMenuMusics = _selectMenuMusics;
    this.selectingMusicNumber = 0;
    this.settingFlg = false;
  }
  get selectMenuMusic() {
    return this.selectMenuMusics;
  }
  get selectingMusic() {
    return this.selectingMusicNumber;
  }
  set selectingMusic(_selectingMusic: number) {
    this.selectingMusicNumber = _selectingMusic;
  }
  get isSetting() {
    return this.settingFlg;
  }
  set isSetting(flg: boolean) {
    this.settingFlg = flg;
  }

  /**
   * 描写を行うメソッド
   *
   * @param {p5} p
   * @memberof SelectMenu
   */
  draw(p: p5) {
    p.image(this.img, 0, 0);
    p.push();
    p.stroke(0);
    p.textAlign(p.CENTER);
    p.textSize(30);
    p.textFont('Helvetica');
    p.text('Select Music', p.width / 2, 60);
    p.pop();
    for (const selectMenuMusic of this.selectMenuMusics) {
      selectMenuMusic.draw(p);
    }
  }

  /**
   * 選択を左右に移動できるか判定する
   *
   * @param {('left' | 'right')} dir
   * @return {*}
   * @memberof SelectMenu
   */
  isSelectable(dir: 'left' | 'right') {
    switch (dir) {
      case 'left':
        if (this.selectingMusicNumber > 0) {
          return true;
        }
        break;
      case 'right':
        if (this.selectingMusicNumber < 3) {
          return true;
        }
        break;
    }
    return false;
  }

  /**
   * selectingMusicNumber番目の曲を選択状態にする
   *
   * @memberof SelectMenu
   */
  setSelected() {
    this.selectMenuMusics[this.selectingMusicNumber].setSelected();
  }

  /**
   * 全ての曲の選択状態を解除する
   *
   * @memberof SelectMenu
   */
  unsetAllSelected() {
    for (const selectMenuMusic of this.selectMenuMusics) {
      selectMenuMusic.unsetSelected();
    }
  }

  /**
   * settingFlgの状態に応じてConfigControlクラスかSelectMenuControlクラスを返す。曲選択とコンフィグの切り替えに使用される
   *
   * @return {*}
   * @memberof SelectMenu
   */
  toggleControl() {
    return this.settingFlg ? new ConfigControl() : new SelectMenuControl();
  }
}
