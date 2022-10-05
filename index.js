"use strict";

const mainClock = document.querySelector(".container__clock--main-hours");
const mainCurrentDay = document.querySelector(".container__clock--main-date");
const worldClocks = document.querySelector(".container__clock--world");
const addWorldClockButton = document.querySelector(
  ".container__dropdown-submit"
);
const timezoneDropdown = document.querySelector(".container__dropdown-menu");

// Default world clock timezones
const countries = ["America/New_York", "Europe/London", "Asia/Tokyo"];

// Reset main text contents
mainClock.textContent = "";
mainCurrentDay.textContent = "";

// Main browser current time and date
const mainTimeAndDate = function () {
  // Browser timezone
  const mainTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Browser current date
  const mainDate = new Intl.DateTimeFormat(navigator.language, {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  }).format(new Date());

  // Dispay current date and timezone
  mainCurrentDay.textContent = `${mainDate} - ${mainTimeZone}`;

  // Browser current time
  setInterval(() => {
    const mainTime = new Intl.DateTimeFormat(navigator.language, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date());
    mainClock.textContent = mainTime;
  }, 1000);
};

const worldTimeAndDate = function () {
  // Display world clock date and time
  countries.forEach((country, i) => {
    // Create div for each world clock
    const worldDate = document.createElement("div");
    worldDate.className = `container__world--clock`;
    worldDate.setAttribute("data-index", `${i}`);
    worldDate.classList.add(`container__world--clock-${i}`);

    // Set world clock date from countries array
    const worldDay = new Intl.DateTimeFormat(navigator.language, {
      day: "numeric",
      month: "long",
      weekday: "long",
      year: "numeric",
      timeZone: country,
    }).format(new Date());

    // Create date element inside created div
    const firstPart = document.createElement("p");
    firstPart.className = "container__clock--world-date";
    firstPart.innerHTML = `${worldDay} - ${country
      .split("_")
      .join(" ")} <button class="delete-world-entry">Delete</button>`;
    worldDate.appendChild(firstPart);

    // Create hours element inside created div
    const secondPart = document.createElement("p");
    secondPart.className = "container__clock--world-hours";
    secondPart.textContent = "";
    worldDate.appendChild(secondPart);

    // Set world clock hours based on countries array
    setInterval(() => {
      const worldTimeFormat = new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: country,
      }).format(new Date());
      // Set textcontent here for continous clock ticks
      secondPart.textContent = worldTimeFormat;
    }, 1000);

    // Append created dive with date and time elements on the world clock container
    worldClocks.appendChild(worldDate);
  });
};

const clockFunctions = function () {
  mainTimeAndDate();

  worldTimeAndDate();
};

clockFunctions();

// Select delete button
let btnDeleteWorld = document.querySelectorAll(".delete-world-entry");

const deletingTimezone = function () {
  // Delete selected world clock
  btnDeleteWorld.forEach((world) => {
    world.addEventListener("click", function (e) {
      // Remove country from countries array
      const index = e.target.parentElement.dataset.index;
      countries.splice(index, 1);

      // Select child containing world date and time
      const child = e.target.closest(".container__world--clock");

      // Remove the child from dom tree/interface
      e.target.closest(".container__clock--world").removeChild(child);
    });
  });
};

deletingTimezone();

// Array of available timezones
const availableTimezones = Intl.supportedValuesOf("timeZone");

// Looping the timezones array
availableTimezones.forEach((timezone) => {
  // Creating the options element for the dropdown
  const options = document.createElement("option");
  options.setAttribute("value", `${timezone}`);
  options.textContent = `${timezone.split("_").join(" ")}`;

  // Appending created options elements to the dropdown input element
  timezoneDropdown.appendChild(options);
});

// Adding functionality to timezone dropdown
addWorldClockButton.addEventListener("click", function (e) {
  // Prevent button from submitting
  e.preventDefault();

  // Checking if dropdown value is timezone and updating clock contents
  if (timezoneDropdown.value !== "default") {
    countries.push(timezoneDropdown.value);
    worldClocks.innerHTML = "";
    mainClock.textContent = "";
    mainCurrentDay.textContent = "";
    clockFunctions();
  }

  // Updating delete button
  btnDeleteWorld = document.querySelectorAll(".delete-world-entry");
  deletingTimezone();
});
