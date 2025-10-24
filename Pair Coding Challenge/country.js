const countrycard = document.getElementById("country-card");
const countryname = document.getElementById("country-name");
const caps = document.getElementById("caps");

const searchInput = document.getElementById("search-input");
const regionFilter = document.getElementById("region-filter");
const toggleMode = document.getElementById("toggle");
const body = document.body;

async function page() {
    const countrynameurl = await fetch (`https://countriesnow.space/api/v0.1/countries/capital`)
    var desha = await countrynameurl.json()

    const countryCardsContainer= document.getElementById("country-cards")
    countryCardsContainer.innerHTML = "";

for (let i=0; i<20; i++){
    const country = desha.data[i];

    const card = document.createElement('div');
        card.classList.add('card');

    const flag = document.createElement('img');
        flag.classList.add('country-flag');
    
    const info = document.createElement('div');
        info.classList.add('country-info');

    const countryName = document.createElement('h3');
        countryName.classList.add('country-name');
        countryName.textContent = country.name;

    const capital = document.createElement('p');
        capital.innerHTML = `<b>Capital:</b> ${country.capital}`;

    info.appendChild(countryName);
        info.appendChild(capital);

        card.appendChild(flag);
        card.appendChild(info);

        countryCardsContainer.appendChild(card);
}
     }
page()
// async function 


