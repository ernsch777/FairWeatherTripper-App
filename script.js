let totalDays = 0;      //Must be 16 or lower due to weatherbit.io forecast limitation
let currentDay = 0;     //Current day placeholder
let stopCounter = 0;    //Number of stops
let destination = [];   //List of stops
let iteration = [];     //Days entered at each stop

let tripHigh = 0;       //Collection of datapoints for whole trip entered
let tripLow = 200;
let tripPrecip = 0;
let tripHumid = 0;
let tripWind = 0;
let tripGust = 0;

//ADD BUTTON SELECTED CODE -- Stores location in 'destination' array and counts stops and days. Also creates delete button and eventlisteners for them.
document.querySelector(".add-button").addEventListener("click", function (e) {
    if ((totalDays + Number(document.querySelector(".days").value)) > 16) {//Check for the maximum number of days before proceeding
        alert("Accurate weather forecasts exist out to a maximum of 16 days. Please enter a number of days for this stop so the total trip is 16 days or less.");
        throw new Error("User entered too many days. Forecasts exist out to a maximum of 16 days.");
    }
    if (!document.querySelector(".days").value) {//Check for the number of days before proceeding
        alert("Please enter the number of days planned for this stop before trying to add it to your trip.");
        throw new Error("User forgot to enter the number of days for potential new stop.");
    }
    this.disabled = true;
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
            let divDataEnter = document.createElement("Div");//create div for another stop
            divDataEnter.id = "stop" + stopCounter;
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
            btnDelete.id = "del" + stopCounter;
            let textForButton = document.createTextNode("Delete");
            btnDelete.appendChild(textForButton);
            divDataEnter.appendChild(btnDelete);
            //add functionality to remove the created div for that stop and reset all counters
            btnDelete.addEventListener("click", function () {
                let removeCounter = Number(btnDelete.parentNode.id.slice(-1));
                let destroyDay = 0;
                for (let i = 0; i < removeCounter; i++) {//Count the number of entries to remove from destination array
                    destroyDay = destroyDay + iteration[i];
                }
                destination.splice(destroyDay, iteration[removeCounter]);//Remove entries to destination array
                totalDays = totalDays - iteration[removeCounter];
                iteration.splice(removeCounter, 1);//Remove entry in iteration array
                let destroy = btnDelete.parentNode;//Remove the parent div altogether
                destroy.remove();
                //Loop through remaining stops to re-number their id tags for sorting purposes later
                let childDivs = document.getElementById("search").getElementsByTagName("div");
                for (let i = removeCounter; i < childDivs.length - 1; i++) {
                    childDivs[i].id = "stop" + i;
                    console.log(childDivs[i].id);
                }
                stopCounter = stopCounter - 1;//Reset stopCounter to exclude deleted stop
                console.log(childDivs);
                console.log(destination);
            });
            let inputDiv = document.getElementById("data-enter");
            let parentDiv = inputDiv.parentNode;
            parentDiv.insertBefore(divDataEnter, inputDiv);//Insert newly created div
            document.getElementById("locationInput").value = "";//Reset the input values for another possible stop to be put in
            document.getElementById("locationInput").placeholder = "Enter next city and state";
            document.getElementById("daysInput").value = "";
            document.getElementById("daysInput").placeholder = "# of days";
            this.disabled = false;
            stopCounter++;//Increment the counter for number of stops
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
    document.getElementById("generate").style.visibility = "hidden";
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
        tripHighlights();
        document.getElementById("loading").style.display = "none";//Make the loading screen hidden
        document.getElementById("highlights").style.display = "block";//Make the trip highlights piece visibile
        document.getElementById("results").style.display = "inherit";//Make the sorted results visible
        document.getElementById("results").style.visibility = "visible";
    }, (totalDays * 1500));
    this.disabled = false;
});

//Weather object fetches weather forecast, creates weather cards for each day and location selected, and calls tripHighlights
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
    createCards: function (data, day, stop) {//Generates a weather display card for the days indicated
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
            if (data.data[cardDay].high_temp > tripHigh) {
                tripHigh = data.data[cardDay].high_temp;
            }
            let low = document.createElement("h3");
            low.innerText = "Low:  " + data.data[cardDay].low_temp + " °F";
            if (data.data[cardDay].low_temp < tripLow) {
                tripLow = data.data[cardDay].low_temp;
            }
            let precip = document.createElement("h4");
            precip.innerText = "Precipitation:  " + data.data[cardDay].pop + " %";
            if (data.data[cardDay].pop > tripPrecip) {
                tripPrecip = data.data[cardDay].pop;
            }
            let humidity = document.createElement("h4");
            humidity.innerText = "Humidity:   " + data.data[cardDay].rh + "%";
            if (data.data[cardDay].rh > tripHumid) {
                tripHumid = data.data[cardDay].rh;
            }
            let windSpeed = document.createElement("h4");
            windSpeed.innerText = "Wind speed:   " + data.data[cardDay].wind_spd + " mph";
            if (data.data[cardDay].wind_spd > tripWind) {
                tripWind = data.data[cardDay].wind_spd;
            }
            let windGust = document.createElement("h4");
            windGust.innerText = "Wind gusts:   " + data.data[cardDay].wind_gust_spd + " mph";
            if (data.data[cardDay].wind_gust_spd > tripGust) {
                tripGust = data.data[cardDay].wind_gust_spd;
            }
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

//tripHighlights just displays the max and min values for all days selected
function tripHighlights() {
    let mainHighlights = document.getElementById("highlights");
    mainHighlights.innerHTML = "";
    let tHigh = document.createElement("p");
    tHigh.innerText = "Highest temperature on trip:  " + tripHigh + " °F";
    let tLow = document.createElement("p");
    tLow.innerText = "Lowest temperature on trip:  " + tripLow + " °F";
    let tPrecip = document.createElement("p");
    tPrecip.innerText = "Highest precipitation expected:  " + tripPrecip + " %";
    let tHumid = document.createElement("p");
    tHumid.innerText = "Highest humidity expected:   " + tripHumid + "%";
    let tWind = document.createElement("p");
    tWind.innerText = "Wind speed:   " + tripWind + " mph";
    let tGust = document.createElement("p");
    tGust.innerText = "Wind gusts:   " + tripGust + " mph";
    mainHighlights.appendChild(tHigh);
    mainHighlights.appendChild(tLow);
    mainHighlights.appendChild(tPrecip);
    mainHighlights.appendChild(tHumid);
    mainHighlights.appendChild(tWind);
    mainHighlights.appendChild(tGust);
}




//     paragraph.classList.add('paragraph-styling');
//     document.body.onload = addElement;


// To-Do items:
// 1. Host site online with Netlify
// 2. DONE
// 3. Redesign searchMain, loading, and highlight window visibility
// 4. Get better fonts to make weather cards more readable
// 5. Add google maps interface and display
// 6. Research 504 error handling more and try to fix for large # of stops (stop into freecodecamp)
