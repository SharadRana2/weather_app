const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  const cityDetails = data.details;
  const weather = data.weatherinfo;

  //updating the HTML
  details.innerHTML = `
      <h5 class="my-3">${cityDetails.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
      </div>
    `;
  //adding icons and img
  let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime === true) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }
  time.setAttribute("src", timeSrc);

  //removing d-none bootstrap class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateWeather = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);
  //returning data as object
  return {
    details: cityDetails,
    weatherinfo: weather,
  };
};

cityForm.addEventListener("submit", (event) => {
  //prevent default
  event.preventDefault();
  const city = cityForm.city.value.trim();

  updateWeather(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });

  //setting local storage
  localStorage.setItem("city", city);
  //reseting form
  cityForm.reset();
});

if(localStorage.getItem('city')){
  updateWeather(localStorage.getItem('city'))
  .then((data) => {
    updateUI(data);
  })
  .catch((err) => {
    console.log(err);
  });

}
