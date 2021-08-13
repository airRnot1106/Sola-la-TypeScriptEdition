import p5 from 'p5';
import { Vec2 } from '../index';
import { game } from '../index';

export type ScoreData = {
  totalScore: number;
  maxCombo: number;
  perfectTimes: number;
  greatTimes: number;
  niceTimes: number;
  missTimes: number;
  totalRollTimes: number;
};

/**
 * Scoreクラス。スコアの管理を行う
 *
 * @export
 * @class Score
 */
export default class Score {
  private vec;
  private judgmentFrameVec;
  private totalScore;
  private maxCombo;
  private currentCombo;
  private perfectTimes;
  private greatTimes;
  private niceTimes;
  private missTimes;
  private totalRollTimes;
  private currentRollTimes;
  private currentQuality;
  private isHit;
  private isRolled;
  private isShowingRollTimes;
  private hitTimeoutId;
  private rollTimeoutId;
  constructor(_vec: Vec2, _judgmentFrameVec: Vec2) {
    this.vec = _vec;
    this.judgmentFrameVec = _judgmentFrameVec;
    this.totalScore = 0;
    this.maxCombo = 0;
    this.currentCombo = 0;
    this.perfectTimes = 0;
    this.greatTimes = 0;
    this.niceTimes = 0;
    this.missTimes = 0;
    this.totalRollTimes = 0;
    this.currentRollTimes = 0;
    this.currentQuality = '';
    this.isHit = false;
    this.isRolled = false;
    this.isShowingRollTimes = false;
    this.hitTimeoutId = 0;
    this.rollTimeoutId = 0;
  }

  /**
   * 描写を行うメソッド
   *
   * @param {p5} p
   * @memberof Score
   */
  draw(p: p5) {
    p.push();
    p.fill(0);
    p.stroke('#ffffff');
    p.rectMode(p.CORNER);
    p.strokeWeight(8);
    p.rect(this.vec.x, this.vec.y - 30, 134, 60);
    p.fill(255);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(10);
    p.textFont("'Press Start 2P', cursive");
    p.text(`COMBO: ${this.currentCombo}`, this.vec.x + 67, this.vec.y);
    p.text(`SCORE: ${this.totalScore}`, this.vec.x + 67, this.vec.y - 55);
    p.pop();
    if (this.isHit) {
      this.showQuality(p);
    } else if (this.isShowingRollTimes) {
      this.showRollTimes(p);
    }
  }

  /**
   * 精度を表示する
   *
   * @param {p5} p
   * @memberof Score
   */
  showQuality(p: p5) {
    p.push();
    p.fill(255);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.textSize(10);
    p.textFont("'Press Start 2P', cursive");
    p.text(
      this.currentQuality,
      this.judgmentFrameVec.x,
      this.judgmentFrameVec.y + 50
    );
    p.pop();
  }

  /**
   * 連打回数を表示する
   *
   * @param {p5} p
   * @memberof Score
   */
  showRollTimes(p: p5) {
    p.push();
    p.fill(255);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.textSize(10);
    p.textFont("'Press Start 2P', cursive");
    p.text(
      `Drum Roll: ${this.currentRollTimes}`,
      this.judgmentFrameVec.x,
      this.judgmentFrameVec.y + 50
    );
    p.pop();
  }

  /**
   * 引数の値に応じてスコアを加点する
   *
   * @param {p5} p
   * @param {('perfect' | 'great' | 'nice' | 'miss' | 'roll')} quality
   * @memberof Score
   */
  add(p: p5, quality: 'perfect' | 'great' | 'nice' | 'miss' | 'roll') {
    this.currentQuality = quality;
    switch (quality) {
      case 'perfect':
        this.totalScore += 1000;
        this.perfectTimes++;
        this.currentCombo++;
        this.isRolled = false;
        this.isShowingRollTimes = false;
        this.isHit = true;
        window.clearTimeout(this.hitTimeoutId);
        this.hitTimeoutId = window.setTimeout(() => {
          this.isHit = false;
        }, 800);
        break;
      case 'great':
        this.totalScore += 500;
        this.greatTimes++;
        this.currentCombo++;
        this.isRolled = false;
        this.isShowingRollTimes = false;
        this.isHit = true;
        window.clearTimeout(this.hitTimeoutId);
        this.hitTimeoutId = window.setTimeout(() => {
          this.isHit = false;
        }, 800);
        break;
      case 'nice':
        this.totalScore += 300;
        this.niceTimes++;
        this.currentCombo++;
        this.isRolled = false;
        this.isShowingRollTimes = false;
        this.isHit = true;
        window.clearTimeout(this.hitTimeoutId);
        this.hitTimeoutId = window.setTimeout(() => {
          this.isHit = false;
        }, 800);
        break;
      case 'miss':
        this.totalScore += 0;
        this.missTimes++;
        this.currentCombo = 0;
        this.isRolled = false;
        this.isShowingRollTimes = false;
        this.isHit = true;
        window.clearTimeout(this.hitTimeoutId);
        this.hitTimeoutId = window.setTimeout(() => {
          this.isHit = false;
        }, 800);
        break;
      case 'roll':
        this.totalScore += 500;
        this.totalRollTimes++;
        if (!this.isRolled && this.isShowingRollTimes) {
          this.resetCurrentRollTimes();
        }
        this.currentRollTimes++;
        this.isHit = false;
        this.isRolled = true;
        this.isShowingRollTimes = true;
        window.clearTimeout(this.rollTimeoutId);
        this.rollTimeoutId = window.setTimeout(() => {
          this.resetCurrentRollTimes();
          this.isShowingRollTimes = false;
        }, 800);
        break;
    }
    if (this.currentCombo > this.maxCombo) {
      this.maxCombo = this.currentCombo;
    }
  }

  /**
   * isRolledを無効にする
   *
   * @memberof Score
   */
  dieRollFlg() {
    this.isRolled = false;
  }

  /**
   * 現在の連打回数をリセットする
   *
   * @memberof Score
   */
  resetCurrentRollTimes() {
    this.currentRollTimes = 0;
  }

  /**
   * gameにスコアを渡す
   *
   * @memberof Score
   */
  applySocre() {
    const scoreData: ScoreData = {
      totalScore: this.totalScore,
      maxCombo: this.maxCombo,
      perfectTimes: this.perfectTimes,
      greatTimes: this.greatTimes,
      niceTimes: this.niceTimes,
      missTimes: this.missTimes,
      totalRollTimes: this.totalRollTimes,
    };
    game.lastScore = scoreData;
  }
}
