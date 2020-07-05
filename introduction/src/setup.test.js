//テストの前にinitializeCityDatabase() を呼び出し、
//テストの後にはclearCityDatabase()を呼び出す
const methods = require('./initializeCity');
const initializeCityDatabase = methods.method1;
const isCity = methods.method2;
const clearCityDatabase = methods.method3;

console.log("import",  methods)
let city;

beforeEach(() => {
  console.log("before")
  city = initializeCityDatabase();
  console.log('AAA:',city);
});

afterEach(() => {
  clearCityDatabase(city);
  console.log('after clear City:',city);
});

test('city database has Vienna', () => {
  expect(isCity('Vienna', city)).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan', city)).toBeTruthy();
});