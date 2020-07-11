const request = require("request");
const requestPromise = require("./get");

describe('GetTest', () => {
  test('gettest1', async() => {
    const param1 = {
      url: "https://apis.google.com/js/api.js",
      method: "GET"
    };
    const response = await requestPromise(param1);
    console.log("res:",response.statusCode);
    expect(response.statusCode).toBe(200);
  });
});

