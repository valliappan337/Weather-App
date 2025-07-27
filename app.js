// https://api.openweathermap.org/data/2.5/weather?q=germany&appid=5bdcd61886d846d3f3c02fd1b1c7a8f5

const apikey = "5bdcd61886d846d3f3c02fd1b1c7a8f5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const btn = document.querySelector(".search button");
const inp = document.querySelector('.search input');
const weaticon = document.querySelector(".weather-icon");



async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".err").style.display = "block";
        document.querySelector(".weather").style.display = "none";

    }
    else {
        document.querySelector(".err").style.display = "none";
        document.querySelector(".welcome").style.display = "none";


        var data = await response.json();
        console.log(data)


        // for updating the text 
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".feelslike").innerHTML = `Feels like : ${Math.round(data.main.feels_like)} °C`;
        document.querySelector(".gradlevel").innerHTML = `Grnd Level : ${data.main.grnd_level}`;
        document.querySelector(".pressure").innerHTML = `Pressure   : ${data.main.pressure}`;
        document.querySelector(".sealevel").innerHTML = `Sea Level  : ${data.main.sea_level}`;

        if (data.weather[0].main == "Cloud") {
            weaticon.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weaticon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weaticon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle" || "Haze") {
            weaticon.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weaticon.src = "images/mist.png"
        }
        document.querySelector('.weather').style.display = "block";
    }


}


//for btn click
btn.addEventListener('click', () => {
    checkWeather(inp.value)
})

//for enter btn in input box
inp.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        btn.click(); // Simulate button click
    }
});