
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');
const readMoreBtn = document.getElementById('read-more');

function openModal(contentHTML, readMoreUrl = null) {
  modalBody.innerHTML = contentHTML;
  if (readMoreUrl) {
    readMoreBtn.href = readMoreUrl;
    readMoreBtn.style.display = 'inline-block';
  } else {
    readMoreBtn.style.display = 'none';
  }
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalBody.querySelectorAll('video').forEach(v => v.pause?.());
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


function setupTiles() {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const { type, src, title, desc } = tile.dataset;
      let html = `<h2>${title}</h2>`;
      if (type === 'video') {
        html += `<video controls autoplay><source src="${src}" type="video/mp4"></video>`;
      } else {
        html += `<img src="${src}" alt="${title}">`;
      }
      html += `<p>${desc}</p>`;
      openModal(html);
    });
  });
}


function setupEventCards() {
  const readMoreLinks = document.querySelectorAll('.tile-event .read-more');
  readMoreLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const parent = link.closest('.tile-event');
      const { title, desc, src: img1, img2 } = parent.dataset;
      const html = `
        <div class="event-modal-content">
          <div class="event-modal-left">
            <h2>${title}</h2>
            <p>${desc}</p>
          </div>
          <div class="event-modal-right">
            <img src="${img1}" alt="${title}">
            <img src="${img2}" alt="${title}">
          </div>
        </div>`;
      openModal(html);
    });
  });
}

const darkToggle = document.getElementById('darkToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  darkToggle.textContent = '☀️';
}

darkToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  darkToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const backBtn = document.createElement('button');
backBtn.className = 'back-to-top';
backBtn.textContent = '↑';
document.body.appendChild(backBtn);

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  backBtn.classList.toggle('show', window.scrollY > 400);
});

const adviceBox = document.createElement('div');
adviceBox.id = 'advice-box';
adviceBox.style.cssText = `
  margin: 20px auto;
  text-align: center;
  background: #ffffff;
  color: #111;
  padding: 14px 18px;
  border-radius: 12px;
  max-width: 700px;
  font-size: 1.1rem;
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  transition: background 0.3s ease, color 0.3s ease;
`;
document.body.insertBefore(adviceBox, document.querySelector('.main-wrap'));

async function getAdvice() {
  try {
    adviceBox.innerHTML = `<em>Loading advice...</em>`;
    const response = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });
    const data = await response.json();
    const { id, advice } = data.slip;

    setTimeout(() => {
      adviceBox.innerHTML = `
        <strong>💡 Advice #${id}:</strong> "${advice}"
      `;
    }, 800);
  } catch (error) {
    console.error("Error fetching advice:", error);
    adviceBox.innerHTML = "⚠ Unable to fetch advice. Try again later.";
  }
}

getAdvice();
setInterval(getAdvice, 90000);

const currencyCycle = document.getElementById('currency-cycle');
const baseCurrencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'JPY', symbol: '¥' },
  { code: 'CNY', symbol: '¥' }
];
const INR_SYMBOL = '₹';
let currentIndex = 0;

async function fetchRateToINR(base) {
  const res = await fetch(`https://api.frankfurter.app/latest?from=${base}&to=INR`);
  if (!res.ok) throw new Error('Currency API failed');
  const data = await res.json();
  return data.rates.INR;
}

async function showNextCurrency() {
  try {
    const { code, symbol } = baseCurrencies[currentIndex];
    const rate = await fetchRateToINR(code);
    currencyCycle.innerHTML = `
      <span style="
        display:inline-block;
        font-size:1.2rem;
        font-weight:600;
        color:#0a1a2f;">
        ${symbol}1 ${code} = ${INR_SYMBOL}${rate.toFixed(2)} INR
      </span>`;
    currentIndex = (currentIndex + 1) % baseCurrencies.length;
  } catch (err) {
    currencyCycle.innerHTML = `<span style="color:#a00;">Unable to load</span>`;
  }
}

function startCurrencyRotation() {
  showNextCurrency();
  setInterval(showNextCurrency, 15000);
}
startCurrencyRotation();

async function loadSidebarData() {
  try {
    const res = await fetch("data.json"); 
    const data = await res.json();

    const internshipBox = document.getElementById("internship-item");
    internshipBox.innerHTML = data.internships
      .map(i => `<a href="${i.link}" target="_blank" class="news-item">${i.title}</a>`)
      .join("<br>");

    const hackathonBox = document.getElementById("hackathon-item");
    hackathonBox.innerHTML = data.hackathons
      .map(h => `<a href="${h.link}" target="_blank" class="news-item">${h.title}</a>`)
      .join("<br>");

    const collegeBox = document.getElementById("college-events-item");
    collegeBox.innerHTML = data.collegeEvents
      .map(e => `<a href="${e.link}" target="_blank" class="news-item">${e.title}</a>`)
      .join("<br>");
  } catch (err) {
    console.error("Error loading sidebar data:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupTiles();
  setupEventCards();
  loadSidebarData(); // new
});

document.addEventListener('DOMContentLoaded', () => {
  setupTiles();
  setupEventCards();
});
