/**
 * Vec2クラス。二次元ベクトルの処理を行う
 *
 * @export
 * @class Vec2
 */
export default class Vec2 {
  private xComponet: number;
  private yComponent: number;
  constructor(_x: number, _y: number) {
    this.xComponet = _x;
    this.yComponent = _y;
  }
  get x() {
    return this.xComponet;
  }
  get y() {
    return this.yComponent;
  }

  /**
   * このベクトルと、引数のベクトルbの和を計算する
   *
   * @param {Vec2} b
   * @return {*}
   * @memberof Vec2
   */
  add(b: Vec2) {
    let a = this;
    return new Vec2(a.x + b.x, a.y + b.y);
  }

  /**
   * このベクトルを実数s倍したベクトルを計算する
   *
   * @param {number} s
   * @return {*}
   * @memberof Vec2
   */
  mul(s: number) {
    let a = this;
    return new Vec2(s * a.x, s * a.y);
  }

  /**
   * このベクトルの大きさを求める
   *
   * @return {*}
   * @memberof Vec2
   */
  mag() {
    let a = this;
    return Math.sqrt(a.x ** 2 + a.y ** 2);
  }

  /**
   * このベクトルと引数のベクトルbの差を求める
   *
   * @param {Vec2} b
   * @return {*}
   * @memberof Vec2
   */
  sub(b: Vec2) {
    let a = this;
    return new Vec2(a.x - b.x, a.y - b.y);
  }

  /**
   * このベクトルを正規化したベクトルを求める
   *
   * @return {*}
   * @memberof Vec2
   */
  norm() {
    let a = this;
    return a.mul(1 / a.mag());
  }

  /**
   * このベクトルと引数のベクトルbの、ドット積（内積）を求める
   *
   * @param {Vec2} b
   * @return {*}
   * @memberof Vec2
   */
  dot(b: Vec2) {
    let a = this;
    return a.x * b.x + a.y * b.y;
  }

  /**
   * このベクトルの反射ベクトルを求める。
   * wは、法線ベクトルとする（大きさは問わない）
   *
   * @param {Vec2} w
   * @return {*}
   * @memberof Vec2
   */
  reflect(w: Vec2) {
    let v = this;
    let cosTheta = v.mul(-1).dot(w) / (v.mul(-1).mag() * w.mag());
    let n = w.norm().mul(v.mag() * cosTheta);
    let r = v.add(n.mul(2));
    return r;
  }
}
