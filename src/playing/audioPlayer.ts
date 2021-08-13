import { Howl, Howler } from 'howler';
import { game, error } from '../index';
import { sufferingOfHalo, typoghoti, atala } from '../index';

/**
 * audioPlayerクラス。曲の再生の管理をする
 *
 * @export
 * @class AudioPlayer
 */
export default class AudioPlayer {
  private audio: Howl | undefined;
  private isPlayed;
  constructor() {
    this.audio = undefined;
    this.isPlayed = false;
  }

  /**
   * 音声ファイルが存在しない場合はNOT_FOUND_AUDIOエラーを返す
   *
   * @readonly
   * @memberof AudioPlayer
   */
  get isPlaying() {
    if (!this.audio) {
      throw new Error(error.NOT_EXISTS_AUDIO());
    }
    return this.audio.playing();
  }

  /**
   * 音声ファイルが存在しない場合はNOT_FOUND_AUDIOエラーを返す
   *
   * @readonly
   * @memberof AudioPlayer
   */
  get state() {
    if (!this.audio) {
      throw new Error(error.NOT_EXISTS_AUDIO());
    }
    return this.audio.state();
  }

  /**
   * 初期化を行う。曲データが存在しない場合はNOT_EXISTS_MUSICエラーを返す。音声ファイルが存在しない場合はNOT_FOUND_AUDIOエラーを返す
   *
   * @memberof AudioPlayer
   */
  initialize() {
    if (!game.playingMusic) {
      throw new Error(error.NOT_EXISTS_MUSIC());
    }
    switch (game.playingMusic.title) {
      case 'Suffering of_Halo':
        this.audio = new Howl({
          src: sufferingOfHalo,
        });
        break;
      case 'Typoghoti':
        this.audio = new Howl({
          src: typoghoti,
        });
        break;
      case 'Atala':
        this.audio = new Howl({
          src: atala,
        });
        break;
      default:
        throw new Error(error.NOT_FOUND_AUDIO());
    }
  }

  /**
   * 曲を再生する。音声ファイルが存在しない場合はNOT_FOUND_AUDIOエラーを返す
   *
   * @return {*}
   * @memberof AudioPlayer
   */
  play() {
    if (!this.audio) {
      throw new Error(error.NOT_EXISTS_AUDIO());
    }
    if (this.isPlayed) {
      return;
    }
    this.audio.play();
    this.isPlayed = true;
  }

  /**
   * 曲の再生を停止する。音声ファイルが存在しない場合はNOT_FOUND_AUDIOエラーを返す
   *
   * @memberof AudioPlayer
   */
  stop() {
    if (!this.audio) {
      throw new Error(error.NOT_EXISTS_AUDIO());
    }
    this.audio.stop();
  }
}
