//ファイル実行開始時に1度だけinitializeCityDatabase() を呼び出し、
//終了時に1度だけclearCityDatabase()を呼び出す
const methods = require('./initializeCity_promise');
const initializeCityDatabase_P = methods.method1;
const isCity = methods.method2;
const clearCityDatabase_P = methods.method3;

console.log("import",  methods)
let city;

beforeAll(async() => {
  console.log("before");
  // initializeCityDatabase_P().then(value=>{
  //   console.log(value);
  //   city = value
  // });

  city = await initializeCityDatabase_P()
  console.log('beforeAll',city);
});

afterAll(async() => {
  console.log("after",city);
  await clearCityDatabase_P(city);
  console.log('afterAll:',city);
});

test('city database has Vienna', () => {
  expect(isCity('Vienna', city)).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan', city)).toBeTruthy();
});