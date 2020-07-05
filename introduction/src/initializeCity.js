
function initializeCityDatabase() {
  console.log("initializeCityDatabase")
  const city = [
    "Vienna",
    "Tokyo",
    "San Juan",
    "Los",
  ];

  return city;
};

function isCity(cityname, city) {
  console.log('BBB:',city);
  let result = city.filter(function(item, index) {
    if (item.indexOf(cityname) >= 0) {
      return true;
    };
  });
  return result;
};

function clearCityDatabase(city) {
  console.log("clearCityDatabase")
  console.log('CCC:',city);
  return city.splice(0);
};

module.exports = {
  method1: initializeCityDatabase,
  method2: isCity,
  method3: clearCityDatabase
};

/*
module.exports = initializeCityDatabase;
module.exports = isCity;
*/
