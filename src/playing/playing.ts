import p5 from 'p5';
import {
  Vec2,
  AudioPlayer,
  MusicTitleDisplay,
  Score,
  NotesLine,
  JudgmentFrame,
  Note,
  NormalNote,
  RollNote,
  Bar,
} from '../index';
import { game, error, lengthRatio } from '../index';
import { ResultControl } from '../index';
import { BasicData } from './mainPlaying';

/**
 * Playingクラス。演奏画面の描写を行う
 *
 * @export
 * @class Playing
 */
export default class Playing {
  private audioPlayer;
  private musicTitleDisplay;
  private notesLine;
  private score;
  private judgmentFrameData;
  private notesBarData;
  constructor(data: BasicData) {
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.initialize();
    this.musicTitleDisplay = new MusicTitleDisplay(data.musicTitleDisplayVec);
    this.notesLine = new NotesLine(data.notesLineVec);
    this.score = new Score(
      this.notesLine.scoreVec,
      this.notesLine.judgmentFrameVec
    );
    this.judgmentFrameData = new JudgmentFrame(this.notesLine.judgmentFrameVec);
    this.notesBarData = ((game) => {
      //undefinedチェック
      if (!game.playingMusic) {
        throw new Error(error.NOT_EXISTS_MUSIC());
      }
      //return用Array
      const array: Note[][] = [[], []];
      //1ノーツ目の初期位置
      const defaultVec = new Vec2(
        this.notesLine.judgmentFrameVec.x +
          game.playingMusic.oneBarLength +
          game.offset +
          -0.0002873 * game.playingMusic.oneBarLength ** 2 +
          0.4722619 * game.playingMusic.oneBarLength -
          112.9365079,
        this.notesLine.judgmentFrameVec.y
      );
      //前のノーツの位置
      let lastVec = defaultVec;
      //notesDataのpush
      (() => {
        let i = -1;
        for (let note of game.playingMusic.data) {
          i++;
          //休符チェック
          if (note[2] !== 0) {
            lastVec = lastVec.add(
              new Vec2(
                game.playingMusic.oneBarLength *
                  (lengthRatio[note[0]] / lengthRatio[1]),
                0
              )
            );
            continue;
          }
          //ノーツの種類チェック
          switch (note[1]) {
            case 0:
              array[0].push(
                new NormalNote(
                  lastVec,
                  note[0],
                  this.notesLine.judgmentFrameVec,
                  this.score
                )
              );
              break;
            case 1:
              array[0].push(
                new RollNote(
                  lastVec,
                  note[0],
                  this.notesLine.judgmentFrameVec,
                  this.score
                )
              );
              break;
            default:
              throw new Error(error.EXISTS_INVALID_NOTE_DATA(i));
          }
          lastVec = lastVec.add(
            new Vec2(
              game.playingMusic.oneBarLength *
                (lengthRatio[note[0]] / lengthRatio[1]),
              0
            )
          );
        }
      })();
      //barDataのpush
      const barCount =
        (lastVec.x - defaultVec.x) / game.playingMusic.oneBarLength;
      for (let i = 0; i < barCount; i++) {
        array[1].push(
          new Bar(
            new Vec2(
              defaultVec.x + game.playingMusic.oneBarLength * i,
              this.notesLine.judgmentFrameVec.y
            ),
            1,
            this.notesLine.judgmentFrameVec,
            this.score
          )
        );
      }
      return array;
    })(game);
  }
  get judgmentFrame() {
    return this.judgmentFrameData;
  }

  /**
   * 描写を行うメソッド
   *
   * @param {p5} p
   * @return {*}
   * @memberof Playing
   */
  draw(p: p5) {
    p.background(0);
    this.musicTitleDisplay.draw(p);
    this.notesLine.draw(p);
    this.judgmentFrameData.draw(p);
    if (this.audioPlayer.state !== 'loaded') {
      this.score.draw(p);
      return;
    }
    this.audioPlayer.play();
    for (let bar of this.notesBarData[1]) {
      bar.draw(p);
      bar.scroll(p);
    }
    for (let note of this.notesBarData[0]) {
      note.draw(p);
      note.scroll(p);
    }
    this.judgeDeathPenalty(p);
    this.score.draw(p);
    if (this.isEnded()) {
      this.score.applySocre();
      game.keyControl = new ResultControl();
      game.state = 3;
      game.rescreen(p);
    }
  }

  /**
   * 有効な次のノーツを返す
   *
   * @return {*}
   * @memberof Playing
   */
  findNextNote() {
    let nextNote;
    for (let note of this.notesBarData[0]) {
      if (!note.flg) {
        continue;
      }
      nextNote = note;
      break;
    }
    return nextNote;
  }

  /**
   * スルーしたノーツの死判定を行う
   *
   * @param {p5} p
   * @return {*}
   * @memberof Playing
   */
  judgeDeathPenalty(p: p5) {
    const nextNote = this.findNextNote();
    if (!nextNote) {
      return;
    }
    const distance = nextNote.calcDistance();
    if (nextNote instanceof NormalNote) {
      if (distance <= -40) {
        nextNote.die(p);
      }
    } else if (nextNote instanceof RollNote) {
      if (distance <= nextNote.calcNoteLength() * -1) {
        nextNote.die(p);
      }
    }
  }

  /**
   * 演奏が終了したか判定する
   *
   * @return {*}
   * @memberof Playing
   */
  isEnded() {
    if (this.findNextNote()) {
      return false;
    }
    if (this.audioPlayer.isPlaying) {
      return false;
    }
    return true;
  }
}
