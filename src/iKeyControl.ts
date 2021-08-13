import p5 from 'p5';

/**
 * IKeyControlインターフェース。キー入力の処理を行う
 *
 * @export
 * @interface IKeyControl
 */
export default interface IKeyControl {
  /**
   * キー入力があった際にどの操作を呼び出すかを判定する。各操作メソッドは直接使用せず、必ずexcuteを通して使用する
   *
   * @param {p5} p
   * @param {number} keyCode
   * @memberof IKeyControl
   */
  excute(p: p5, keyCode: number): void;

  /**
   * 左入力
   *
   * @param {p5} p
   * @memberof IKeyControl
   */
  left(p: p5): void;

  /**
   * 右入力
   *
   * @param {p5} p
   * @memberof IKeyControl
   */
  right(p: p5): void;

  /**
   * コンフィグ。SelectMenuで使用される
   *
   * @param {p5} p
   * @memberof IKeyControl
   */
  config(p: p5): void;

  /**
   * 決定入力
   *
   * @param {p5} p
   * @memberof IKeyControl
   */
  space(p: p5): void;
}
