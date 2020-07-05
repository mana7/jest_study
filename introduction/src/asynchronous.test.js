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

test('the promise data is peanut butter', () => {
  return fetchData2().then(data => {
    expect(data).toBe('peanut butter');
  });
});

//promiseがrejectされることを期待するケースでは .catch メソッドを使用する
//また、想定した数のアサーションが呼ばれたことを確認するため、
//expect.assertionsを必ず追加する。
//そうしないと、promiseがrejectされなかった場合にテストが失敗したと判定されない
//※reject以外はテスト失敗させたい


//expect.assertionsがないと、resolveを返却時でもテストが成功となる
/*
const fetchData3 = function() {
  return new Promise((resolve, reject) => {
   resolve()
  })
};

test('the fetch fails with an error', () => {
  return fetchData3().catch(e => expect(e).toMatch('error'));
});
*/

//expect.assertionsがあると、rejectのみ通過する。
//resolveはcatchされずexpectが1度も呼ばれないのでテスト失敗する
//さらに、"error"文字を返却しているときのみテスト成功となる

const fetchData3 = function() {
  return new Promise((resolve, reject) => {
    reject("error")
  });
};

test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData3().catch(e => expect(e).toMatch('error'));
});


//.resolves / .rejects
//expect内に.resolvesを利用することで、promiseがresolveとなることを期待する
//rejectとなった場合は、自動的にテストは失敗する

test('the data is resolve and peanut butter', () => {
  return expect(fetchData2()).resolves.toBe('peanut butter');
});

//rejectを期待し、promise成功(resolve)はテスト失敗させる場合は、
//.rejectsというマッチャーを利用する

test('the fetch fails(reject) with an error', () => {
  return expect(fetchData3()).rejects.toMatch('error');
});


//asyncとawait
//テストする関数のバメにasyncを記述する
test('[async/await]the data is peanut butter', async () => {
  const data = await fetchData2();
  expect(data).toBe('peanut butter');
});

test('[async/await]the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData3();
  } catch (e) {
    expect(e).toMatch('error');
  }
});

//.resolves / .rejectsと一緒に利用することも可能
test('[with .resolves]the data is peanut butter', async () => {
  await expect(fetchData2()).resolves.toBe('peanut butter');
});

test('[with .rejects]the fetch fails with an error', async () => {
  await expect(fetchData3()).rejects.toMatch('error');
});