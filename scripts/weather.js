const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const cityName = document.querySelector('h2');

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=8505e43dbdf700a1ce8842ad85394c2e";

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResult(data);
        } else {
            throw error(response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResult(data) {
    cityName.innerHTML = `${data.name}, Germany`;
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', "Weather Icon");
    captionDesc.textContent = `${desc}`;
}

apiFetch();