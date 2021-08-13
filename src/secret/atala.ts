import p5 from 'p5';
import { Vec2 } from '../index';

export default class Atala {
  private vec;
  private isSelected;
  private timeoutId;
  constructor(_vec: Vec2) {
    this.vec = _vec;
    this.isSelected = false;
    this.timeoutId = window.setTimeout(() => {
      this.isSelected = true;
    }, 300);
  }
  draw(p: p5) {
    const borderColor = this.isSelected ? 'yellow' : 'white';
    p.background(0);
    p.push();
    p.noFill();
    p.stroke(borderColor);
    p.rectMode(p.CENTER);
    p.strokeWeight(5);
    p.rect(400, 225, 150, 350);
    p.fill('white');
    p.noStroke();
    p.textAlign(p.LEFT);
    p.textSize(28);
    p.textFont("'Press Start 2P', cursive");
    p.text('A\nt\na\nl\na', 430, 95);
    p.textSize(20);
    p.text('?\n?\n?', 355, 300);
    p.pop();
  }
}
