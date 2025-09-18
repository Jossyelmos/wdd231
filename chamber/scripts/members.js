const url = "data/members.json";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=johannesburg&units=metric&appid=8505e43dbdf700a1ce8842ad85394c2e";

const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=johannesburg&appid=8505e43dbdf700a1ce8842ad85394c2e&units=metric";

const cards = document.querySelector("#cards");
const gridButton = document.querySelector(".gridBtn");
const listButton = document.querySelector(".listBtn");
const currentTemp = document.querySelector("#currentTemp");
const desc = document.querySelector("#description");
const highTemp = document.querySelector("#highTemp");
const lowTemp = document.querySelector("#lowTemp");
const humidity = document.querySelector("#humidity");
const firstDay = document.querySelector("#firstDay");
const secondDay = document.querySelector("#secondDay");
const thirdDay = document.querySelector("#thirdDay");
const spotlightCards = document.querySelector("#spotlightCards")

if (document.querySelector(".layout")) {
  gridButton.addEventListener("click", () => {
      cards.classList.add('cards');
      cards.classList.remove('list');
  });
  
  listButton.addEventListener("click", () => {
      cards.classList.add('list');
      cards.classList.remove('cards');
  })
}

async function getMembersInfo() {
  const response = await fetch(url);
  const data = await response.json();
  displayMember(data.members);
}

const displayMember = (members) => {
  cards.innerHTML = "";
  members.forEach(member => {
    let card = document.createElement("li");
    let mem_name = document.createElement("h3");
    let b_tag = document.createElement("h4");
    let l_break = document.createElement("hr");

    // Image
    let portrait = document.createElement("img");
    portrait.setAttribute("src", member.imageurl);
    portrait.setAttribute("alt", `Portrait of ${member.name}`);
    portrait.setAttribute("loading", "lazy");

    // Address block
    let address = document.createElement("div");
    address.classList.add("address");
    address.innerHTML = `
      <p><span>Email:</span> ${member.email}</p>
      <p><span>Phone:</span> ${member.phone}</p>
      <p><span>Url:</span><a href="${member.url}" target="_blank"> ${member.url}</a></p>
    `;

    // Wrapper for image and address
    let infoWrapper = document.createElement("div");
    infoWrapper.classList.add("info-wrapper");
    infoWrapper.appendChild(portrait);
    infoWrapper.appendChild(address);

    // Assemble card
    mem_name.textContent = member.name;
    b_tag.textContent = member.description;

    card.appendChild(mem_name);
    card.appendChild(b_tag);
    card.appendChild(l_break);
    card.appendChild(infoWrapper);

    cards.appendChild(card);
  });
};

if (document.querySelector("#cards")) {
  getMembersInfo();
};



async function apiFetch() {
  try {
    const response = await fetch(weatherUrl);

    if (response.ok) {
      const data = await response.json();
      displayResult(data);
    } else {
      throw error(response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();


function displayResult(data) {
  currentTemp.innerHTML = `Temp: ${data.main.temp}&deg;C`;
  desc.innerHTML = `Description: ${data.weather[0].description}`;
  highTemp.innerHTML = `High: ${data.main.temp_max}&deg;C`;
  lowTemp.innerHTML = `Low: ${data.main.temp_min}&deg;C`;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
}


async function forecast() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      const forecastData = data.list.filter((item, index) => index % 8 == 0 ).slice(0, 3);
      displayForecast(forecastData);
    } else {
      throw error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayForecast(forecastData) {
  firstDay.innerHTML = `${forecastData[0].main.temp}&deg;C`;
  secondDay.innerHTML = `${forecastData[1].main.temp}&deg;C`;
  thirdDay.innerHTML = `${forecastData[2].main.temp}&deg;C`;
}

forecast();



// Home page javascript

async function getSpotlight() {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    const goldMember = data.members.filter((member) => member.mem_level > 1);
    const shuffled = goldMember.sort(() => 0.5 - Math.random());

    const spotlight = shuffled.slice(0, 3);
    displaySpotlight(spotlight);
  }
}

const displaySpotlight = (members) => {
  spotlightCards.innerHTML = "";
  members.forEach(member => {
    let card = document.createElement("li");
    let mem_name = document.createElement("h3");

    // Image
    let portrait = document.createElement("img");
    portrait.setAttribute("src", member.imageurl);
    portrait.setAttribute("alt", `Portrait of ${member.name}`);
    portrait.setAttribute("loading", "lazy");

    // Address block
    let address = document.createElement("div");
    address.classList.add("spot-address");
    address.innerHTML = `
      <p><span>Address:</span> ${member.address}</p>
      <p><span>Phone:</span> ${member.phone}</p>
      <p><span>Url:</span><a href="${member.url}" target="_blank"> ${member.url}</a></p>
    `;
    let membership = document.createElement('button');
    if (member.mem_level === 3) {
      membership.classList.add("gold");
      membership.textContent = "Gold Member";
    } else {
      membership.classList.add("silver");
      membership.textContent = "Silver Member";
    }

    // Assemble card
    mem_name.textContent = member.name;

    card.appendChild(mem_name);
    card.appendChild(portrait);
    card.appendChild(address);
    card.appendChild(membership);

    spotlightCards.appendChild(card);
  });
};

if (document.querySelector("#spotlightCards")){
  getSpotlight();
}