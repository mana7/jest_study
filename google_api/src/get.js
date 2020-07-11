// let http =require("http");
// let url = "https://apis.google.com/js/api.js";
// let options = {
//   method: "GET"
// };
// let req = http.request(url, options, (res) => {
//   res.pipe(process.stdout);
// });

// req.end();

const request = require("request");

function requestPromise(param){
  return new Promise((resolve, reject)=>{
      request(param, function (error, response, body) {
          if(error){
              reject(error);
          }else{
              //console.log(body);
              console.log("OK");
              resolve(response);
          }
      })
  })
};

module.exports = requestPromise;