import * as React from "react";

/**
 * 型引数 `T` は、共有したい状態の値の型です。
 *
 * `createSharedState` は 1 つの初期値（もしくは遅延初期化関数）を受け取り、
 * その状態を複数コンポーネントから読み書きできるオブジェクトを返します。
 */
declare function createSharedState<T>(
  /** 初期値または「遅延初期化」関数 */
  initialValue: T | (() => T)
): SharedState<T>;

interface SharedState<T> {
  /**
   * 状態を更新します。
   *
   * @param newValue 直接新しい値を渡すか、`prev => newValue` という形の
   *                 関数で渡すことができます。後者は React の
   *                 `setState` と同等です。
   */
  setValue: (newValue: T | ((prev: T) => T)) => void;

  /** 現在の状態を取得します。 */
  getValue: () => T;

  /**
   * React フックです。コンポーネント内部で呼び出すことで、
   * 状態とその更新関数を取得できます。
   *
   * ```tsx
   * const [value, setValue] = shared.use();
   * ```
   *
   * @returns `[value, setValue]` のタプル。
   *          `setValue` の型は `React.Dispatch<React.SetStateAction<T>>`
   *          です（`T` または `(prev:T)=>T` が渡せます）。
   */
  use(): [
    T,
    React.Dispatch<React.SetStateAction<T>>
  ];

  /** `use` の value 部分だけを取得するショートカットです。 */
  useValue(): T;
}

/* デフォルトエクスポート */
export default createSharedState;
