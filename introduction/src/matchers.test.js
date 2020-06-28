//一番簡単な等価のmatcher

//expect(2 + 2) は "expectation" オブジェクトを返す
//.toBe(4)がmtchers部分 
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

//もしオブジェクトの値をチェックしたい場合は、"toEqual"を代わりに使う
//toEqualは、オブジェクトまたは配列のすべてのフィールドを再帰的にチェックする
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});

//matcherと反対のテスト
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

//真偽値について
//toBeNull は null のみ一致します
//toBeUndefined は undefined のみ一致します
//toBeDefined は toBeUndefined の反対です
//toBeTruthy は if ステートメントが真であるとみなすものに一致します
//toBeFalsy は if ステートメントが偽であるとみなすものに一致します

test('null', () => {
  const n = null;
  expect(n).toBeNull(); 
  expect(n).toBeDefined(); 
  expect(n).not.toBeUndefined(); 
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy(); 
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test('undefined', () => {
  const z = undefined;
  expect(z).not.toBeNull();
  expect(z).not.toBeDefined();
  expect(z).toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
//yをそもそも定義していない状態だと
//expect(y).not.toBeDefined();
//はエラーとなる


//数値の比較
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

//浮動小数点の値が同一であるかを確認するにはtoEqualの代わりにtoBeCloseTo を使用する
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //もしこのように書くと、丸め込み誤差が原因で期待通りに動作しない
  //expect(value).toBe(0.3); 
  // Expected: 0.3、Received: 0.30000000000000004　と出力される
  expect(value).toBeCloseTo(0.3); // これならば正しく動く
});

//文字列
//toMatch で、文字列に対して正規表現でマッチするか確認できる
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});

//Arrays and iterables
//toContainを利用することで、arrayやiterable(for-of構文を用いることで反復処理が可能なオブジェクト)の中に特定のアイテムがあるかをチェックできる
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});
//Setは、ES2015(ES6)から導入された、重複した値がないことを保証したコレクション。
//値が一意であることが保証されている
//順序を持たず、インデックスでアクセスできない

test('the shopping list do not has apple on it', () => {
  expect(shoppingList).not.toContain('apple');
});

//例外
//関数が呼び出されたときに例外が発生することをテストするには、 toThrow を使用する
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});