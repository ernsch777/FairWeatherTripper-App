let currentDay = 0;
let destination = [];
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
//GENERATE TRIP BUTTON SELECTED CODE -- produce cards for each day's weather and calculate the whole trip's mins and maxs
document.querySelector("#generate").addEventListener("click", function () {
    console.log(destination);
    weather.search();
    currentDay = 0; // Reset the global currentDay for use in another trip

});

// <div class="search">
{/* <div class="data-enter">
        <input type="text" class="search-bar" placeholder="Enter city and state">
        <input type="text" class="days" placeholder="Number of days">
        <button class="add-button">Add</button>
    </div>
</div>  */}

//ADD BUTTON SELECTED CODE -- Store location in 'destination' array for given number of days until needed in generate step
document.querySelector(".add-button").addEventListener("click", function () {
    if ((currentDay + Number(document.querySelector(".days").value)) > 16) {
        alert("Accurate weather forecasts exist out to a maximum of 16 days. Please enter a number of days for this stop so the total trip is 16 days or less.");
        throw new Error("User entered too many days. Forecasts exist out to a maximum of 16.");
    }
    for (let i = currentDay; i < (Number(document.querySelector(".days").value) + currentDay); i++) {
        destination[i] = document.querySelector(".search-bar").value;
    }
    currentDay = currentDay + Number(document.querySelector(".days").value);
    var divDataEnter = document.createElement("Div");//create div for another stop
    divDataEnter.classList.add('data-enter');
    var searchInput = document.createElement("INPUT");//create another search field
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Enter city and state");
    searchInput.classList.add("search-bar");
    divDataEnter.appendChild(searchInput);
    var daysInput = document.createElement("INPUT");//create another days field
    daysInput.setAttribute("type", "text");
    daysInput.setAttribute("placeholder", "Number of days");
    daysInput.classList.add("days");
    divDataEnter.appendChild(daysInput);
    var btnAdd = document.createElement("Button");//create another add button
    btnAdd.classList.add("add-button");
    var textForButton = document.createTextNode("Add");
    btnAdd.appendChild(textForButton);
    divDataEnter.appendChild(btnAdd);
    document.getElementById("search").appendChild(divDataEnter);
    console.log(currentDay);
});

//Start with ISP location as default starting point and use Seattle as a backup on error
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
