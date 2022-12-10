"use strict";

// Dom Elements

//Filter by competition type
const allCompetitions = document.querySelector("#all");
const onlyLeagues = document.querySelector("#league");
const onlyCups = document.querySelector("#cup");

//Filter by date
const leagueDateParent = document.querySelector(".filters__date");
const filterYear = document.querySelector(".filters__date-year");
const filterYearIcon = document.querySelector(".filters__date-icon");

//Filter Dropdown
const dropdownUl = document.querySelector(".filters__date-dropdown");
const dropdownLi = document.querySelectorAll(".filters__date-dropdown--item");

////////////////////
const requestOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "2da306cef44425dd1e827661aa95d96d",
    "x-rapidapi-host": "v3.football.api-sports.io",
  },
};
const fetchLiveGames = "https://v3.football.api-sports.io/fixtures?live=all";
const fetchLeagues = "https://v3.football.api-sports.io/leagues";

//fetch data from api
let dataLive = [];
let dataLeague = [];
const getData = async function () {
  try {
    const [response1, response2] = await Promise.all([
      fetch(fetchLiveGames, requestOptions),
      fetch(fetchLeagues, requestOptions),
    ]);
    dataLive = await response1.json();
    dataLeague = await response2.json();
    console.log(dataLive);
    render(dataLive);
    leaguesHandler(dataLive, dataLeague);
    cupHandler(dataLive, dataLeague);
  } catch (error) {
    console.log(error);
  }
};
getData();

//Render HTML on the page
const render = function (data) {
  data.response.forEach((el) => {
    const leagueDiv = document.getElementById(`${el.league.id}`);
    if (!leagueDiv) {
      renderLeague(el);
    } else {
      renderGame(el);
    }
  });
};

const renderLeague = function (el) {
  const markup = `
      <div class="league" id="${el.league.id}">
    <!-- League Info Box -->
    <div class="league__info">
    <!-- League Main Logo -->
    <div class="league__logo">
      <img src="${el.league.logo}" />
    </div>
    <!-- League Info: Name, Country -->
    <div class="league__header">
      <h1 class="league__name" id="league-name">${el.league.name}</h1>
      <h4 class="league__country" id="league-country">${el.league.country}</h4>
    </div>
    <div class="league__arrow">
      <img src="./images/caret-right.svg" alt="icon" class="icon arrow" />
    </div>
  </div>
  </div>`;

  leaguesContainer.insertAdjacentHTML("afterbegin", markup);

  const gameDiv = document.getElementById(`${el.league.id}`);
  const gameMarkup = `
        <div class="league__game">
  <!-- Game Time & Favorite  -->
  <div class="league__game-time">
    <img src="./images/star.svg" alt="" class="league__game-fav star" />
    <span class="time">${el.fixture.status.elapsed}'</span>
  </div>
  <!-- Game info -->
  <div class="league__game-info">
    <!-- First Team Logo -->
    <div class="league__game-logo league__game-logo--1" id="logo1">
      <img src="${el.teams.home.logo}" alt="Team Logo" class="logo1" />
    </div>
    <!-- First Team Name-->
    <div class="league__game-team league__game-team--1" id="team1">
      ${el.teams.home.name}
    </div>
    <!-- Game Score -->
    <div class="league__game-score">
      <span class="score">${el.goals.home}</span>
      <span class="score">:</span>
      <span class="score">${el.goals.away}</span>
    </div>
    <!-- Second Team Name-->
    <div class="league__game-team league__game-team--2" id="team2">
    ${el.teams.away.name}
    </div>
    <!-- Second Team Logo -->
    <div class="league__game-logo league__game-logo--2" id="team2">
      <img src="${el.teams.away.logo}" alt="" class="logo2" />
    </div>
  </div>

  <!-- Icon Box (info & tv) -->
  <div class="league__game-icons">
    <img
      src="./images/info.svg"
      alt="info icon"
      class="league__game-icon info"
    />
    <img
      src="./images/monitor.svg"
      alt="info icon"
      class="league__game-icon monitor"
    />
  </div>
</div>
        `;
  gameDiv.insertAdjacentHTML("beforeend", gameMarkup);
};

const renderGame = function (el) {
  const gameDiv = document.getElementById(`${el.league.id}`);
  const gameMarkup = `
    <div class="league__game">
<!-- Game Time & Favorite  -->
<div class="league__game-time">
<img src="./images/star.svg" alt="" class="league__game-fav star" />
<span class="time">${el.fixture.status.elapsed}'</span>
</div>
<!-- Game info -->
<div class="league__game-info">
<!-- First Team Logo -->
<div class="league__game-logo league__game-logo--1" id="logo1">
  <img src="${el.teams.home.logo}" alt="Team Logo" class="logo1" />
</div>
<!-- First Team Name-->
<div class="league__game-team league__game-team--1" id="team1">
  ${el.teams.home.name}
</div>
<!-- Game Score -->
<div class="league__game-score">
  <span class="score">${el.goals.home}</span>
  <span class="score">:</span>
  <span class="score">${el.goals.away}</span>
</div>
<!-- Second Team Name-->
<div class="league__game-team league__game-team--2" id="team2">
  ${el.teams.away.name}
</div>
<!-- Second Team Logo -->
<div class="league__game-logo league__game-logo--2" id="team2">
  <img src="${el.teams.away.logo}" alt="" class="logo2" />
</div>
</div>

<!-- Icon Box (info & tv) -->
<div class="league__game-icons">
<img
  src="./images/info.svg"
  alt="info icon"
  class="league__game-icon info"
/>
<img
  src="./images/monitor.svg"
  alt="info icon"
  class="league__game-icon monitor"
/>
</div>
</div>
    `;
  gameDiv.insertAdjacentHTML("beforeend", gameMarkup);
};

//Render Leagues when LEAGUE button is clicked
const leaguesHandler = function () {
  dataLive.response.forEach((el1) => {
    dataLeague.response.forEach((el2) => {
      if (el1.league.id === el2.league.id && el2.league.type === "League") {
        renderLeague(el1);
      }
    });
  });
};

//Render Cups when Cup button is clicked
const cupHandler = function () {
  dataLive.response.forEach((el1) => {
    dataLeague.response.forEach((el2) => {
      if (el1.league.id === el2.league.id && el2.league.type === "Cup") {
        renderLeague(el1);
      }
    });
  });
};

onlyLeagues.addEventListener("click", leaguesHandler);
onlyCups.addEventListener("click", cupHandler);
