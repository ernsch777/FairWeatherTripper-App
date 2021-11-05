let currentDay = 0;
let destination = [];

let weather = {
    apiKey: "68219aab5bbb48fe97a4f322fc15c400",
    fetchWeather: async function (city, day) {
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
            alert("Could not locate desired city or coordinates. Please try to enter again or check internet connection.");
            throw new Error("can't fetch");
        } else {
            let data = await response.json();
            this.createCard(data, day);
        }
    },
    createCard: function (data, day) {
        // let { city_name } = data;
        // let { high_temp, low_temp, pop, rh, wind_spd, wind_gust_spd } = data.data[0];
        // document.querySelector(".city_name").innerText = "Weather in " + city_name;
        // document.querySelector(".high").innerText = high_temp + "°F";
        // document.querySelector(".low").innerText = low_temp + "°F";
        // document.querySelector(".pop").innerText = "Chance of precipitation: " + pop + " %";
        // document.querySelector(".rh").innerText = "Humidity: " + rh + "%";
        // document.querySelector(".wind").innerText = `Wind speed: ${wind_spd} km/h`;
        // document.querySelector(".gust").innerText = `Wind gusts up to: ${wind_gust_spd} km/h`;
        var divCard = document.createElement("Div");//create div for a day of weather
        divCard.classList.add('dayCard');
        var dayNumber = document.createElement("h1");
        dayNumber.classList.add('dayTitle');
        dayNumber.innerText = "Day " + (day + 1);
        var city = document.createElement("h2");//start creating all of the weather data details
        city.innerText = data.city_name;
        var high = document.createElement("h3");
        high.innerText = "High:  " + data.data[day].high_temp + " °F";
        var low = document.createElement("h3");
        low.innerText = "Low:  " + data.data[day].low_temp + " °F";
        var precip = document.createElement("h4");
        precip.innerText = "Precipitation:  " + data.data[day].pop + " %";
        var humidity = document.createElement("h4");
        humidity.innerText = "Humidity:   " + data.data[day].rh + "%";
        var windSpeed = document.createElement("h4");
        windSpeed.innerText = "Wind speed:   " + data.data[day].wind_spd + " mph";
        var windGust = document.createElement("h4");
        windGust.innerText = "Wind gusts:   " + data.data[day].wind_gust_spd + " mph";
        divCard.appendChild(dayNumber);
        divCard.appendChild(city);
        divCard.appendChild(high);
        divCard.appendChild(low);
        divCard.appendChild(precip);
        divCard.appendChild(humidity);
        divCard.appendChild(windSpeed);
        divCard.appendChild(windGust);
        document.getElementById("results").appendChild(divCard);
    }
};

//Starting with Seattle as our default weather call
//weather.fetchWeather("Seattle");

//ADD BUTTON SELECTED CODE -- Store location in 'destination' array for given number of days until needed in generate step
document.querySelector(".add-button").addEventListener("click", function () {
    if ((currentDay + Number(document.querySelector(".days").value)) > 16) {
        alert("Accurate weather forecasts exist out to a maximum of 16 days. Please enter a number of days for this stop so the total trip is 16 days or less.");
        throw new Error("User entered too many days. Forecasts exist out to a maximum of 16 days.");
    }
    if (document.querySelector(".days").value) {//Check for the numnber of days before proceeding
        for (let i = currentDay; i < (Number(document.querySelector(".days").value) + currentDay); i++) {
            destination[i] = document.querySelector(".search-bar").value;
        }
        currentDay = currentDay + Number(document.querySelector(".days").value);
        var divDataEnter = document.createElement("Div");//create div for another stop
        var cityInput = document.createElement("p");//solidify the location selected
        cityInput.innerText = document.querySelector(".search-bar").value;
        cityInput.classList.add("city-input");
        divDataEnter.appendChild(cityInput);
        var daysInput = document.createElement("p");//solidify the number of days selected
        daysInput.innerText = document.querySelector(".days").value;
        daysInput.classList.add("days-input");
        divDataEnter.appendChild(daysInput);
        var btnDelete = document.createElement("Button");//create a delete button
        btnDelete.classList.add("delete-button");
        var textForButton = document.createTextNode("Delete");
        btnDelete.appendChild(textForButton);
        divDataEnter.appendChild(btnDelete);
        var inputDiv = document.getElementById("data-enter");
        var parentDiv = inputDiv.parentNode;
        parentDiv.insertBefore(divDataEnter, inputDiv);
    } else {
        alert("Please enter the number of days planned for this stop before trying to add it to your trip.");
        throw new Error("User forgot to enter the number of days for potential new stop.");
    }
});

//GENERATE TRIP BUTTON SELECTED CODE --> produce cards for each day's weather and calculate the whole trip's mins and maxs. Will call createCard function for each day and each day should format with flexbox
document.querySelector("#generate").addEventListener("click", function () {
    console.log(destination);
    for (let i = 0; i < currentDay; i++) {
        weather.fetchWeather(destination[i], i);
    }
    currentDay = 0; // Reset the global currentDay for use in another trip
});





// let addToDoButton = document.getElementById('addToDo');
// let toDoContainer = document.getElementById('toDoContainer');
// let inputField = document.getElementById('inputField');

// addToDoButton.addEventListener('click', function(){
//     var paragraph = document.createElement('p');
//     paragraph.classList.add('paragraph-styling');
//     paragraph.innerhtml = inputField.value;
//     toDoContainer.appendChild(paragraph);
//     inputField.value = "";
//     document.body.onload = addElement;



// function addElement () {
//     // create a new div element
//     const newDiv = document.createElement("div");

//     // and give it some content
//     const newContent = document.createTextNode("Hi there and greetings!");

//     // add the text node to the newly created div
//     newDiv.appendChild(newContent);

//     // add the newly created element and its content into the DOM
//     const currentDiv = document.getElementById("div1");
//     document.body.insertBefore(newDiv, currentDiv);}

