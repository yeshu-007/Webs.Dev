const countrycard = document.getElementById("country-card");
const countryname = document.getElementById("country-name");
const caps = document.getElementById("caps");
const searchInput = document.getElementById("search-input");
const toggleMode = document.getElementById("toggle");
const body = document.body;

async function page() {

    const countryflagurl = await fetch(`https://countriesnow.space/api/v0.1/countries/flag/images`);
    const dhwaja = await countryflagurl.json();

    const countrynameurl = await fetch(`https://countriesnow.space/api/v0.1/countries/capital`);
    var desha = await countrynameurl.json();

    const countrypopurl = await fetch(`https://countriesnow.space/api/v0.1/countries/population`);
    var jana = await countrypopurl.json();

    const countryCardsContainer = document.getElementById("country-cards");
    countryCardsContainer.innerHTML = "";

    for (let i = 0; i < 200; i++) {
        const country = desha.data[i];
        const countrypop = jana.data.find(c => c.country === country.name);

        const countryflag = dhwaja.data.find(f => f.name === country.name);

        const card = document.createElement('div');
        card.classList.add('card');

        const flag = document.createElement('img');
        flag.classList.add('country-flag');

        flag.src = countryflag ? countryflag.flag : "na.png";
        flag.alt = countryflag ? `${country.name} Flag` : "No Flag Available";

        flag.onerror = () => {
            flag.src = "na.png";
        };

        const info = document.createElement('div');
        info.classList.add('country-info');

        const countryName = document.createElement('h3');
        countryName.classList.add('country-name');
        countryName.textContent = country.name;

        const capital = document.createElement('p');
        capital.innerHTML = `<b>Capital:</b> ${country.capital}`;

        const population = document.createElement('p');
        if (countrypop && countrypop.populationCounts.length > 0) {
            population.innerHTML = `<b>Population:</b> ${countrypop.populationCounts.slice(-1)[0].value.toLocaleString()}`;
        } else {
            population.innerHTML = `<b>Population:</b> N/A`;
        }

        info.appendChild(countryName);
        info.appendChild(capital);
        info.appendChild(population);

        card.appendChild(flag);
        card.appendChild(info);

        countryCardsContainer.appendChild(card);
    }
}
page();

toggleMode.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    toggleMode.textContent = body.classList.contains("dark-mode") ? "Light Mode ☀️" : "Dark Mode 🌜";
});

document.getElementById("search-input").addEventListener("input", () => {
    if (document.getElementById("search-input").value === "") {
        search();
    }
});

function search() {
    const input = document.getElementById("search-input").value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const countryName = card.querySelector(".country-name").textContent.toLowerCase();
        if (countryName.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
