import p5 from 'p5';

/**
 * IKeyControlConfigインターフェース。コンフィグで使用される追加入力を処理をする
 *
 * @export
 * @interface IKeyControlConfig
 */
export default interface IKeyControlConfig {
  /**
   * IKeyControlのexcuteを参照
   *
   * @param {p5} p
   * @param {number} keyCode
   * @memberof IKeyControlConfig
   */
  excute(p: p5, keyCode: number): void;

  /**
   * 上矢印入力
   *
   * @param {p5} p
   * @memberof IKeyControlConfig
   */
  up(p: p5): void;

  /**
   * 下矢印入力
   *
   * @param {p5} p
   * @memberof IKeyControlConfig
   */
  down(p: p5): void;
}
