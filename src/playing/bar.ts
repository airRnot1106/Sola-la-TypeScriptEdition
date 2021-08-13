import p5 from 'p5';
import Note from './note';
import { Vec2, Score } from '../index';
import { Length } from 'musicData';

export default class Bar extends Note {
  constructor(
    _vec: Vec2,
    _length: Length,
    _judgmentFrameVec: Vec2,
    _score: Score
  ) {
    super(_vec, _length, _judgmentFrameVec, _score);
  }
  draw(p: p5) {
    if (!this.isValid) {
      return;
    }
    p.push();
    p.stroke('#f9f9f9');
    p.line(this.vec.x, this.vec.y - 30, this.vec.x, this.vec.y + 30);
    p.pop();
  }
  judge(p: p5) {}
  die(p: p5) {}
}
