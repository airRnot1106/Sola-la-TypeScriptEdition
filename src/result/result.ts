import p5 from 'p5';
import { Database } from '../index';
import { game, error } from '../index';

type RankingData = {
  state: 100 | 200;
  message: any;
};

/**
 * Resultクラス。リザルト画面の描写を行う
 *
 * @export
 * @class Result
 */
export default class Result {
  private shouldShow;
  private intervalId01;
  private loadFlg;
  private intervalId02;
  private database;
  private rankingData: RankingData | undefined;
  constructor() {
    this.shouldShow = false;
    this.intervalId01 = window.setInterval(() => {
      this.toggleShouldShow();
    }, 2000);
    this.loadFlg = 0;
    this.intervalId02 = window.setInterval(() => {
      this.toggleLoadFlg();
    }, 200);
    this.database = new Database();
    this.database
      .postScoreData()
      .then(() => {
        return this.database.getRankingData();
      })
      .then((rankingData) => {
        this.rankingData = rankingData as RankingData;
      });
  }

  /**
   * 描写を行うメソッド。曲データが存在しない場合はNOT_EXISTS_MUSICエラーを返す
   *
   * @param {p5} p
   * @memberof Result
   */
  draw(p: p5) {
    if (!game.playingMusic) {
      throw new Error(error.NOT_EXISTS_MUSIC());
    }
    p.background(0);
    p.push();
    p.fill('white');
    p.stroke(1);
    p.strokeWeight(1);
    p.textAlign(p.LEFT);
    p.textSize(25);
    p.textFont("'Press Start 2P', cursive");
    p.text('Result', 10, 30);
    p.textSize(18);
    p.text(`Music Title\t: ${game.playingMusic.title}`, 20, 80);
    p.text(`Level\t\t\t\t: ${game.playingMusic.levelStr}`, 20, 100);
    p.fill('yellow');
    p.textSize(23);
    p.text(`Score\t: ${game.lastScore.totalScore}`, 20, 160);
    p.fill('white');
    p.textSize(14);
    p.text(`Max Combo\t: ${game.lastScore.maxCombo}`, 560, 200);
    p.text(`Perfect\t: ${game.lastScore.perfectTimes}`, 560, 220);
    p.text(`Great\t: ${game.lastScore.greatTimes}`, 560, 240);
    p.text(`Nice\t: ${game.lastScore.niceTimes}`, 560, 260);
    p.text(`Miss\t: ${game.lastScore.missTimes}`, 560, 280);
    p.text(`Roll\t: ${game.lastScore.totalRollTimes}`, 560, 300);
    if (game.lastScore.perfectTimes === game.playingMusic.maxCombo) {
      p.fill('#ff6666');
      p.textSize(24);
      p.text('All Perfect Combo!!!!', 20, 230);
      p.text('Congratulations!!', 20, 260);
    } else if (game.lastScore.maxCombo === game.playingMusic.maxCombo) {
      p.fill('white');
      p.textSize(22);
      p.text('Full Combo!!', 20, 230);
    }
    if (this.shouldShow) {
      p.fill('white');
      p.textAlign(p.CENTER);
      p.textSize(12);
      p.text('Press any key', 400, 430);
    }
    if (
      game.playingMusic.title === 'Typoghoti' &&
      game.playingMusic.levelStr === 'hard' &&
      game.lastScore.maxCombo === game.playingMusic.maxCombo
    ) {
      let atalaCommand = document.getElementById('secret');
      if (atalaCommand) {
        atalaCommand.textContent = '･Shift + A + T + L Key: ???';
      }
    }
    if (!this.rankingData) {
      p.fill('white');
      p.textSize(10);
      switch (this.loadFlg) {
        case 0:
          p.textAlign(p.RIGHT);
          break;
        case 1:
          p.textAlign(p.CENTER);
          break;
        case 2:
          p.textAlign(p.LEFT);
          break;
      }
      p.text('.', 30, 310);
    }
    if (this.rankingData) {
      const rankingData = this.rankingData.message.contents;
      p.fill('white');
      p.textAlign(p.LEFT);
      p.textSize(16);
      p.text('Ranking', 10, 300);
      p.textSize(14);
      p.text('Total:', 10, 330);
      p.textSize(12);
      for (let i = 0; i < Object.keys(rankingData.total).length; i++) {
        p.text(
          `${i + 1}: score: ${rankingData.total[i].score}, maxCombo: ${
            rankingData.total[i].combo
          }`,
          10,
          350 + 20 * i
        );
      }
      p.textSize(14);
      p.text('Daily:', 400, 330);
      p.textSize(12);
      for (let i = 0; i < Object.keys(rankingData.daily).length; i++) {
        p.text(
          `${i + 1}: score: ${rankingData.daily[i].score}, maxCombo: ${
            rankingData.daily[i].combo
          }`,
          400,
          350 + 20 * i
        );
      }
    }
    p.pop();
  }

  /**
   * shouldShoowを切り替える
   *
   * @private
   * @memberof Result
   */
  private toggleShouldShow() {
    this.shouldShow = this.shouldShow ? false : true;
  }

  /**
   * intervalId01をクリアする
   *
   * @memberof Result
   */
  clearShowingInterval() {
    window.clearInterval(this.intervalId01);
  }

  /**
   * loadFlgを切り替える
   *
   * @private
   * @memberof Result
   */
  private toggleLoadFlg() {
    this.loadFlg++;
    if (this.loadFlg > 2) {
      this.loadFlg = 0;
    }
  }

  /**
   * intervalId02をクリアする
   *
   * @memberof Result
   */
  clearLoadingInterval() {
    window.clearInterval(this.intervalId02);
  }
}
