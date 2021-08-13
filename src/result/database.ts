import { game, error } from '../index';

/**
 * Databaseクラス。スプレッドシートとの送受信を行う
 *
 * @export
 * @class Database
 */
export default class Database {
  private url;
  private readonly ACCESS_TOKEN;
  constructor() {
    this.url =
      'https://script.google.com/macros/s/AKfycbwb57_iUS7ZqHrIwN5RqEIVHWzsUgJ7-sPL5wRqm6qUotAEYUvc8YxGoQ3apVg6myky/exec';
    this.ACCESS_TOKEN = 'YWlyUm5vdDExMDY';
  }

  /**
   * スコアをスプレッドシートに送信する。曲データが存在しない場合はNOT_EXISTS_MUSICエラーを返す
   *
   * @return {*}
   * @memberof Database
   */
  postScoreData() {
    return new Promise((resolve, reject) => {
      if (!game.playingMusic) {
        throw new Error(error.NOT_EXISTS_MUSIC());
      }
      const storeData = {
        token: this.ACCESS_TOKEN,
        title: game.playingMusic.title,
        level: game.playingMusic.levelStr,
        totalScore: game.lastScore.totalScore,
        maxCombo: game.lastScore.maxCombo,
        perfect: game.lastScore.perfectTimes,
        great: game.lastScore.greatTimes,
        nice: game.lastScore.niceTimes,
        miss: game.lastScore.missTimes,
        roll: game.lastScore.totalRollTimes,
      };
      fetch(this.url, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(storeData),
      })
        .then(() => {
          return resolve(1);
        })
        .catch((e) => {
          console.error(e);
          return reject(null);
        });
    });
  }

  /**
   * スプレッドシートからランキングデータを受信する。曲データが存在しない場合はNOT_EXISTS_MUSICエラーを返す
   *
   * @return {*}
   * @memberof Database
   */
  getRankingData() {
    return new Promise((resolve, reject) => {
      if (!game.playingMusic) {
        throw new Error(error.NOT_EXISTS_MUSIC());
      }
      const params = {
        title: game.playingMusic.title,
        level: game.playingMusic.levelStr,
      };
      const queryParams = new URLSearchParams(params);
      fetch(this.url + '?' + queryParams)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error();
          }
        })
        .then((json) => {
          return resolve(json);
        })
        .catch((e) => {
          console.error(e);
          return reject(null);
        });
    });
  }
}
