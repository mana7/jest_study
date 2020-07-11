function initializeCityDatabase_P() {
  console.log("initializeCityDatabase_p")
  const city = [
    "Vienna",
    "Tokyo",
    "San Juan",
    "Los",
  ];
  return new Promise((resolve, reject) => {
    resolve(city);
  }); 
};

function isCity(cityname, city) {
  console.log('isCity:',city);
  let result = city.filter(function(item, index) {
    if (item.indexOf(cityname) >= 0) {
      return true;
    };
  });
  return result;
};

function clearCityDatabase_P(city) {
  console.log("clearCityDatabase:", city)
  return new Promise((resolve, reject) => {
    resolve(city.splice(0));
  });
};

module.exports = {
  method1: initializeCityDatabase_P,
  method2: isCity,
  method3: clearCityDatabase_P
};