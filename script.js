let weather = {
    apiKey: "68219aab5bbb48fe97a4f322fc15c400",
    fetchWeather: function (city) {
        // fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + "&units=I&key=" + this.apiKey)
        //     .then((response) => {
        //         return response.json(); }).then((data) => this.displayWeather(data));
        //let resposneError = response.status;

        fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + "&units=I&key=" + this.apiKey)
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        //     if (responseError == "204") {
        // console.log("Please reenter a valid city name or location.");
        //     } else {
        const { city_name } = data;
        const { high_temp, low_temp, pop, rh, wind_spd, wind_gust_spd } = data.data[0];
        // const { temp, humidity } = data.main;
        // const { speed } = data.wind;
        //document.querySelector(".weather.loading").innerText = "Weather in " + city_name;content: "Loading...";
        document.querySelector(".city_name").innerText = "Weather in " + city_name;
        // document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        // document.querySelector(".description").innerText = description;
        document.querySelector(".high").innerText = high_temp + "°F";
        document.querySelector(".low").innerText = low_temp + "°F";
        document.querySelector(".pop").innerText = "Chance of precipitation: " + pop + " %";
        document.querySelector(".rh").innerText = "Humidity: " + rh + "%";
        document.querySelector(".wind").innerText = `Wind speed: ${wind_spd} km/h`;
        document.querySelector(".gust").innerText = `Wind gusts up to: ${wind_gust_spd} km/h`;
        // document.querySelector(".weather").classList.remove("loading");
        // document.body.style.backgroundImage = "2021 Trip Map Rough Draft.png";
        //}
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
////////// Two event listeners for a search button click and entering the data with the enter key
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});
document
    .querySelector(".search-bar").addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
////////// start with Denver as your default starting point
weather.fetchWeather("Denver");