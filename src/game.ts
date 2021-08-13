import p5 from 'p5';
import IKeyControl from './iKeyControl';
import { TitleControl } from './index';
import {
  titleScreen,
  selectMenuScreen,
  playingScreen,
  resultScreen,
  atalaScreen,
} from './index';
import { error } from './index';
import { Music } from 'musicData';
import { ScoreData } from 'playing/score';

/**
 * Gameクラス。各screen上で持ち越す値を管理する
 *
 * @export
 * @class Game
 */
export default class Game {
  private gameState;
  private keyControlState: IKeyControl;
  private offsetValue;
  private playingMusicData: Music | undefined;
  private lastScoreData: ScoreData;
  constructor() {
    this.gameState = 0;
    this.keyControlState = new TitleControl();
    this.offsetValue = 0;
    this.lastScoreData = {
      totalScore: 0,
      maxCombo: 0,
      perfectTimes: 0,
      greatTimes: 0,
      niceTimes: 0,
      missTimes: 0,
      totalRollTimes: 0,
    };
  }
  get state() {
    return this.gameState;
  }
  set state(_state: number) {
    this.gameState = _state;
  }
  get keyControl() {
    return this.keyControlState;
  }
  set keyControl(_keyControl: IKeyControl) {
    this.keyControlState = _keyControl;
  }
  get offset() {
    return this.offsetValue;
  }
  set offset(_offset: number) {
    this.offsetValue = _offset;
  }
  get playingMusic(): Music | undefined {
    return this.playingMusicData;
  }
  set playingMusic(_playingMusic: Music | undefined) {
    this.playingMusicData = _playingMusic;
  }
  get lastScore() {
    return this.lastScoreData;
  }
  set lastScore(_lastScore: ScoreData) {
    this.lastScoreData = _lastScore;
  }

  /**
   * gameStateに応じたscreenを返す。screenを切り替えるために使用される。
   * 対応したscreenが存在しない場合はSPECIFY_INVALID_PARAMエラーを返す
   * @return {*}
   * @memberof Game
   */
  switchScreen() {
    switch (this.gameState) {
      case 0:
        return titleScreen;
      case 1:
        return selectMenuScreen;
      case 2:
        return playingScreen;
      case 3:
        return resultScreen;
      case -1:
        return atalaScreen;
      default:
        throw new Error(error.SPECIFY_INVALID_PARAM());
    }
  }

  /**
   * screenを再描写する。screen切り替え時に使用される
   *
   * @param {p5} p
   * @memberof Game
   */
  rescreen(p: p5) {
    p.remove();
    const screen = this.switchScreen();
    new p5(screen);
  }

  /**
   * エラーがthrowされた際にgameStateを0にし、タイトル画面に戻す
   *
   * @param {p5} p
   * @memberof Game
   */
  resetByError(p: p5) {
    this.gameState = 0;
    this.keyControl = new TitleControl();
    this.rescreen(p);
  }
}
