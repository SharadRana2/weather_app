const key = "23enXK07ztLAjkDF9MjYYGgjxpWAOj4G";
// Getting city code
const getCity = async (city) => {
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

// Getting City Weather
const getWeather = async (id) => {
  const base = "https://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const newData = await response.json();
  return newData[0];
};

//getting id and linking to getWeather func
// getCity("Delhi")
//   .then((data) => {
//     return getWeather(data.Key);
//   })
//   .then((newData) => {
//     console.log(newData);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
