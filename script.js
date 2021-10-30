let weather = {
    apiKey: "68219aab5bbb48fe97a4f322fc15c400",
    fetchWeather: async function (city) {
        // fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + "&units=I&key=" + this.apiKey)
        //     .then((response) => {
        //         if (response.status == "204") {
        //             alert("Could not locate desired city or coordinates. Please try to enter again.");
        //             // throw new Error("No weather found.");
        //         }
        //         return response.json();
        //     })
        //     .then((data) => this.displayWeather(data)); 
        const response = await fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + "&units=I&key=" + this.apiKey);
        if (response.status == "204") {
            alert("Could not locate desired city or coordinates. Please try to enter again.");
            throw new Error("can't fetch");
        } else {
            const data = await response.json();
            this.displayWeather(data);
        }
    },


    displayWeather: function (data) {
        const { city_name } = data;
        const { high_temp, low_temp, pop, rh, wind_spd, wind_gust_spd } = data.data[0];
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