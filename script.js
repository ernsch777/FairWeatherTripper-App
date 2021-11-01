let currentDay = 0;
let destination = [];
console.log(destination);
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
            let data = await response.json();
            this.displayWeather(data);
        }
    },


    displayWeather: function (data) {
        let { city_name } = data;
        let { high_temp, low_temp, pop, rh, wind_spd, wind_gust_spd } = data.data[0];
        //document.querySelector(".weather.loading").innerText = "Weather in " + city_name;content: "Loading...";
        document.querySelector(".city_name").innerText = "Weather in " + city_name;
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
//////////Generate a new trip when button is selected
document.querySelector("#generate").addEventListener("click", function () {
    console.log(destination);
    weather.search();
    currentDay = 0;

});
////Two ways to enter the destination and number of days. Stores locations in 'destination' array until needed in generate step
document.querySelector(".search button").addEventListener("click", function () {
    if ((currentDay + Number(document.querySelector(".days").value)) > 16) {
        alert("Accurate weather forecasts exist out to a maximum of 16 days. Please enter a number of days for this stop so the total trip is 16 days or less.");
        throw new Error("User entered too many days. Forecasts exist out to a maximum of 16.");
    }
    for (let i = currentDay; i < (Number(document.querySelector(".days").value) + currentDay); i++) {
        destination[i] = document.querySelector(".search-bar").value;
    }
    currentDay = currentDay + Number(document.querySelector(".days").value);
    console.log(currentDay);
});
document
    .querySelector(".search-bar").addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
////////// start with ISP location as default starting point and use Seattle as a backup on error
fetch('https://extreme-ip-lookup.com/json/')
    .then(res => res.json())
    .then(response => {
        weather.fetchWeather(response.city);
    })
    .catch((data, status) => {
        weather.fetchWeather("Seattle");
    })






// let addToDoButton = document.getElementById('addToDo');
// let toDoContainer = document.getElementById('toDoContainer');
// let inputField = document.getElementById('inputField');

// addToDoButton.addEventListener('click', function(){
//     var paragraph = document.createElement('p');
//     paragraph.classList.add('paragraph-styling');
//     paragraph.innerText = inputField.value;
//     toDoContainer.appendChild(paragraph);
//     inputField.value = "";
//     paragraph.addEventListener('click', function(){
//         paragraph.style.textDecoration = "line-through";
//     })
//     paragraph.addEventListener('dblclick', function(){
//         toDoContainer.removeChild(paragraph);
//     })
// })

// <div class="container">
// <input id="inputField" type="text"><button id="addToDo">+</button>
// <div class="to-dos" id="toDoContainer">
// </div>
// </div>