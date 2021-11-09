let currentDay = 0;
let destination = [];

let weather = {
    apiKey: "68219aab5bbb48fe97a4f322fc15c400",
    fetchWeather: /*async*/ function (city, day) {
        fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + "&units=I&key=" + this.apiKey)
            .then((response) => {
                if (response.status == "204") {
                    alert("Could not locate desired city or coordinates. Please try to enter again or check internet connection.");
                    throw new Error("No weather found for location indicated. Bad location or internet connection.");
                }
                return response.json();
            })
            .then((data) => this.createCard(data, day));
        // const response = await fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + "&units=I&key=" + this.apiKey);
        // if (response.status == "204") {
        //     alert("Could not locate desired city or coordinates. Please try to enter again or check internet connection.");
        //     throw new Error("can't fetch");
        // } else {
        //     let data = await response.json();
        //     this.createCard(data, day);
        // }
    },
    createCard: function (data, day) {
        let divCard = document.createElement("Div");//create div for a day of weather
        divCard.classList.add('dayCard');
        divCard.id = day;
        let dayNumber = document.createElement("h1");
        dayNumber.classList.add('dayTitle');
        dayNumber.innerText = "Day " + (day + 1);
        let city = document.createElement("h2");//start creating all of the weather data details
        city.innerText = data.city_name;
        let high = document.createElement("h3");
        high.innerText = "High:  " + data.data[day].high_temp + " °F";
        let low = document.createElement("h3");
        low.innerText = "Low:  " + data.data[day].low_temp + " °F";
        let precip = document.createElement("h4");
        precip.innerText = "Precipitation:  " + data.data[day].pop + " %";
        let humidity = document.createElement("h4");
        humidity.innerText = "Humidity:   " + data.data[day].rh + "%";
        let windSpeed = document.createElement("h4");
        windSpeed.innerText = "Wind speed:   " + data.data[day].wind_spd + " mph";
        let windGust = document.createElement("h4");
        windGust.innerText = "Wind gusts:   " + data.data[day].wind_gust_spd + " mph";
        divCard.appendChild(dayNumber);
        divCard.appendChild(city);
        divCard.appendChild(high);
        divCard.appendChild(low);
        divCard.appendChild(precip);
        divCard.appendChild(humidity);
        divCard.appendChild(windSpeed);
        divCard.appendChild(windGust);
        document.getElementById("results").append(divCard);
    }
};

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
        let divDataEnter = document.createElement("Div");//create div for another stop
        let cityInput = document.createElement("p");//solidify the location selected
        cityInput.innerText = document.querySelector(".search-bar").value;
        cityInput.classList.add("city-input");
        divDataEnter.appendChild(cityInput);
        let daysInput = document.createElement("p");//solidify the number of days selected
        daysInput.innerText = document.querySelector(".days").value;
        daysInput.classList.add("days-input");
        divDataEnter.appendChild(daysInput);
        let btnDelete = document.createElement("Button");//create a delete button
        btnDelete.classList.add("delete-button");
        let textForButton = document.createTextNode("Delete");
        btnDelete.appendChild(textForButton);
        divDataEnter.appendChild(btnDelete);
        let inputDiv = document.getElementById("data-enter");
        let parentDiv = inputDiv.parentNode;
        parentDiv.insertBefore(divDataEnter, inputDiv);
        let firstInput = document.getElementById("location-input");
        document.getElementById("location-input").value = "";
        document.getElementById("location-input").placeholder = "Enter next city and state";
        document.getElementById("days-input").value = "";
        document.getElementById("days-input").placeholder = "# of days";
    } else {
        alert("Please enter the number of days planned for this stop before trying to add it to your trip.");
        throw new Error("User forgot to enter the number of days for potential new stop.");
    }
});

//GENERATE TRIP BUTTON SELECTED CODE --> produce cards for each day's weather and calculate the whole trip's mins and maxs. Will call createCard function for each day and each day should format with flexbox
document.querySelector("#generate").addEventListener("click", function () {
    let generatingText = document.createElement("Div");//When clicked, we first append the loading text and make it visibile will keeping the generated results hidden until complete and sorted in order of day
    generatingText.classList.add("loading-text");
    generatingText.innerText = "Generating your dream getaway as we speak. ";
    let loadingText = document.createElement("Div");
    loadingText.classList.add("loading-text");
    loadingText.innerText = "LO.....";
    loadingText.id = "loading-steps";
    document.getElementById("loading").append(generatingText);
    document.getElementById("loading").append(loadingText);
    document.getElementById("loading").style.visibility = "visible";
    document.getElementById("results").style.visibility = "hidden";
    for (let i = 0; i < currentDay; i++) {//Next we fetch the api weather data for each day and location requested
        weather.fetchWeather(destination[i], i);
    }
    setTimeout(function () {//While fetching the data, we spell out "LOADING...." to let the user know the app is working behind the scenes
        let loading = document.getElementById("loading-steps");
        loading.innerHTML = "LOA....";
    }, 1500);
    setTimeout(function () {
        let loading = document.getElementById("loading-steps");
        loading.innerHTML = "LOAD...";
    }, 3500);
    setTimeout(function () {
        let loading = document.getElementById("loading-steps");
        loading.innerHTML = "LOADI..";
    }, 5500);
    setTimeout(function () {
        let loading = document.getElementById("loading-steps");
        loading.innerHTML = "LOADIN.";
    }, 7500);
    setTimeout(function () {
        let loading = document.getElementById("loading-steps");
        loading.innerHTML = "LOADING";
    }, 9500);
    setTimeout(function () {
        let loading = document.getElementById("loading-steps");
        loading.innerHTML = "LOADING.";
    }, 11500);
    setTimeout(function () {
        let loading = document.getElementById("loading-steps");
        loading.innerHTML = "LOADING..";
    }, 13500);
    setTimeout(function () {
        let loading = document.getElementById("loading-steps");
        loading.innerHTML = "LOADING...";
    }, 15500);
    setTimeout(function () {
        let loading = document.getElementById("loading-steps");
        loading.innerHTML = "LOADING....";
    }, 17500);
    setTimeout(function () {
        let loading = document.getElementById("loading-steps");
        loading.innerHTML = "LOADING.....";
    }, 19500);
    setTimeout(function () {
        let loading = document.getElementById("loading-steps");
        loading.innerHTML = "LOADING......";
    }, 22000);
    setTimeout(function () {//We must time the display of the weather cards to ensure they are in order and ready to be fully displayed
        let mylist = document.getElementById("results");
        let divs = mylist.getElementsByTagName("div");
        let listitems = [];
        for (i = 0; i < divs.length; i++) {
            listitems.push(divs.item(i));
        }
        listitems.sort(compareFunction);
        function compareFunction(a, b) {//We sort numerically and append back onto the container div "results"
            return a - b;
        }
        for (i = 0; i < listitems.length; i++) {
            mylist.appendChild(listitems[i]);
        }
        document.getElementById("loading").style.display = "none";//Make the loading screen hidder
        document.getElementById("results").style.display = "inherit";//Make the sorted results visibile
        document.getElementById("results").style.visibility = "visible";
    }, (currentDay * 1500));
    currentDay = 0; // Reset the global currentDay for use in another trip
});

function tripHighlights() {



}



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

