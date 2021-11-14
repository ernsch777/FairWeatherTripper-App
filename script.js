let totalDays = 0;
let currentDay = 0;
let stopCounter = 0;
let destination = [];
let iteration = [];

//ADD BUTTON SELECTED CODE -- Stores location in 'destination' array and counts stops and days
document.querySelector(".add-button").addEventListener("click", function () {
    if ((totalDays + Number(document.querySelector(".days").value)) > 16) {//Check for the maximum number of days before proceeding
        alert("Accurate weather forecasts exist out to a maximum of 16 days. Please enter a number of days for this stop so the total trip is 16 days or less.");
        throw new Error("User entered too many days. Forecasts exist out to a maximum of 16 days.");
    }
    if (!document.querySelector(".days").value) {//Check for the number of days before proceeding
        alert("Please enter the number of days planned for this stop before trying to add it to your trip.");
        throw new Error("User forgot to enter the number of days for potential new stop.");
    }
    let cityTest = document.querySelector(".search-bar").value;
    fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + cityTest + "&units=I&key=" + weather.apiKey).then((response) => {
        if (response.status == "204" || response.status == "400") {//Check for location before proceeding
            alert("Could not locate desired city or coordinates. Please try to enter again or check internet connection.");
            throw new Error("Bad location or internet connection.");
        } else {
            for (let i = totalDays; i < (Number(document.querySelector(".days").value) + totalDays); i++) {//adds location entered to destination array for the number of days indicated
                destination[i] = document.querySelector(".search-bar").value;
            }
            totalDays = totalDays + Number(document.querySelector(".days").value);
            iteration.push(Number(document.querySelector(".days").value));
            stopCounter++;
            let divDataEnter = document.createElement("Div");//create div for another stop
            let cityInput = document.createElement("p");//solidify the location selected
            cityInput.innerText = document.querySelector(".search-bar").value;
            cityInput.classList.add("city-input");
            divDataEnter.appendChild(cityInput);
            let daysInput = document.createElement("p");//solidify the number of days selected
            daysInput.innerText = document.querySelector(".days").value;
            daysInput.classList.add("daysInput");
            divDataEnter.appendChild(daysInput);
            let btnDelete = document.createElement("Button");//create a delete button
            btnDelete.classList.add("delete-button");
            let textForButton = document.createTextNode("Delete");
            btnDelete.appendChild(textForButton);
            divDataEnter.appendChild(btnDelete);
            let inputDiv = document.getElementById("data-enter");
            let parentDiv = inputDiv.parentNode;
            parentDiv.insertBefore(divDataEnter, inputDiv);
            document.getElementById("locationInput").value = "";
            document.getElementById("locationInput").placeholder = "Enter next city and state";
            document.getElementById("daysInput").value = "";
            document.getElementById("daysInput").placeholder = "# of days";
        }
    });
});

//GENERATE TRIP BUTTON SELECTED CODE --> Calls featchWeather for each unique stop using stopCounter variable and organizes the created weather day cards in chronological order after a slight delay
document.querySelector("#generate").addEventListener("click", function () {
    let generatingText = document.createElement("Div");//When clicked, we first append the loading text and make it visibile while keeping the generated results hidden until results are complete and sorted
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
    for (let i = 0; i < (stopCounter); i++) {//Next we fetch the api weather data 
        weather.fetchWeather(i, currentDay);
        currentDay = currentDay + iteration[i];
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
    setTimeout(function () {//We must time the display of the weather cards to ensure they are in chronological order and ready to be fully displayed, otherwise async/await will display them when done and out of order
        let mylist = document.getElementById("results");
        let divs = mylist.getElementsByTagName("div");
        let listitems = [];
        for (i = 0; i < divs.length; i++) {
            listitems.push(divs.item(i));
        }
        listitems.sort(compareFunction);
        function compareFunction(a, b) {//We sort numerically and append back onto the container div "results"
            return a.id - b.id;
        }
        for (i = 0; i < listitems.length; i++) {
            mylist.appendChild(listitems[i]);
        }
        document.getElementById("loading").style.display = "none";//Make the loading screen hidden
        document.getElementById("results").style.display = "inherit";//Make the sorted results visible
        document.getElementById("results").style.visibility = "visible";
    }, (totalDays * 1500));
    //totalDays = 0; // Reset the global totalDays and iteration for use in another trip
    //iteration = [];
    //stopCounter = 0;
});

let weather = {
    apiKey: "68219aab5bbb48fe97a4f322fc15c400",
    fetchWeather: /*async*/ function (stop, day) {
        fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + destination[day] + "&units=I&key=" + this.apiKey)
            .then((response) => {
                if (response.status == "204") {//Checks for errors one more time
                    alert("Could not locate desired city or coordinates. Please try to enter again or check internet connection.");
                    throw new Error("No weather found for location indicated. Bad location or internet connection.");
                }
                return response.json();
            })
            .then((data) => this.createCards(data, day, stop));
        // const response = await fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + "&units=I&key=" + this.apiKey);
        // if (response.status == "204") {
        //     alert("Could not locate desired city or coordinates. Please try to enter again or check internet connection.");
        //     throw new Error("can't fetch");
        // } else {
        //     let data = await response.json();
        //     this.createCards(data, day);
        // }
    },
    createCards: function (data, day, stop) {//Generates a weather display card for the day indicated
        for (let i = 0; i < iteration[stop]; i++) {
            let cardDay = day + i;
            let divCard = document.createElement("Div");//create div for a day of weather
            divCard.classList.add('dayCard');
            divCard.id = cardDay;
            let dayNumber = document.createElement("h1");
            dayNumber.classList.add('dayTitle');
            dayNumber.innerText = "Day " + (cardDay + 1);
            let city = document.createElement("h2");//start creating all of the weather data details
            city.innerText = data.city_name;
            let high = document.createElement("h3");
            high.innerText = "High:  " + data.data[cardDay].high_temp + " °F";
            let low = document.createElement("h3");
            low.innerText = "Low:  " + data.data[cardDay].low_temp + " °F";
            let precip = document.createElement("h4");
            precip.innerText = "Precipitation:  " + data.data[cardDay].pop + " %";
            let humidity = document.createElement("h4");
            humidity.innerText = "Humidity:   " + data.data[cardDay].rh + "%";
            let windSpeed = document.createElement("h4");
            windSpeed.innerText = "Wind speed:   " + data.data[cardDay].wind_spd + " mph";
            let windGust = document.createElement("h4");
            windGust.innerText = "Wind gusts:   " + data.data[cardDay].wind_gust_spd + " mph";
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
    }
};



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

