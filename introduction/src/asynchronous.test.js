//非同期処理

//コールバック

//例えばデータを取得してcallback(data)を呼び出すfetchData(callback)関数があるとする

//下記のように、空の引数関数の中に記述すると、
//fetchData()が完了した時点でテストも完了してしまい、コールバックが呼ばれない
/*
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
*/

//doneという１つの引数を利用することで、
//Jestはテストを終了する前に、doneコールバックが呼ばれるまで待つ

function fetchData(f) {
  f('peanut butter') //f = callback関数
}

test('the data is peanut butter', done => {
  function callback1(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }
  
  // 同じ
  // const callback1 = (data) => {
  //   try {
  //     expect(data).toBe('peanut butter');
  //     done();
  //   } catch (error) {
  //     done(error);
  //   }
  // };

  fetchData(callback1);
  //　f('peanut butter')で
  // function callback1(data) のdataに
  // peanut butterが渡される
});

//done()が呼び出されない場合は、タイムアウトエラーでテストはfailとなる。
//expectステートメントが失敗すると、エラーがスローされ、done（）は呼び出されない。
//失敗した理由をテストログで確認したい場合、expectをtryブロックに記述し、catchブロックにエラーを渡してdoneする必要がある。
//そうしないと、expect（data）が受け取った値を示さない不明なタイムアウトエラーが発生する

//Promises

//もしpromiseが返却された場合、Jestはresolveされるまで待つ
//rejectされた場合は、自動的にテストfailとなる

//resolveで"peanut butter"を返却するpromiseを仕込んだ場合のテスト
const fetchData2 = require('./jest_promise');
// const fetchData2 = new Promise((resolve, reject) => {
//   console.log("promise start");
//   resolve('peanut butter');
// });

test('the promise data is peanut butter', () => {
  return fetchData2().then(data => {
    expect(data).toBe('peanut butter');
  });
});