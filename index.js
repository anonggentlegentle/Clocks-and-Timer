"use strict";

const mainClock = document.querySelector(".container__clock--main-hours");
const mainCurrentDay = document.querySelector(".container__clock--main-date");
const worldClocks = document.querySelector(".container__clock--world");

mainClock.textContent = "";
mainCurrentDay.textContent = "";

const mainTimeAndDate = function () {
  const mainTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // const mainOption = {
  //   day: "numeric",
  //   month: "long",
  //   weekday: "long",
  //   year: "numeric",
  //   timeZone: "Asia/Tokyo",
  // };

  const mainDate = new Intl.DateTimeFormat(navigator.language, {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  }).format(new Date());

  mainCurrentDay.textContent = `${mainDate} - ${mainTimeZone}`;

  setInterval(() => {
    const mainTime = new Intl.DateTimeFormat(navigator.language, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      // timeZone: "Asia/Tokyo",
    }).format(new Date());
    mainClock.textContent = mainTime;
  }, 1000);
};

mainTimeAndDate();

// console.log(Intl.supportedValuesOf("timeZone"));

const countries = ["America/New_York", "Europe/London", "Asia/Tokyo"];

countries.forEach((country, i) => {
  const worldDate = document.createElement("div");

  worldDate.className = `container__world--clock`;

  const worldDay = new Intl.DateTimeFormat(navigator.language, {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
    timeZone: country,
  }).format(new Date());

  const firstPart = document.createElement("p");
  firstPart.className = "container__clock--world-date";
  firstPart.textContent = `${worldDay} - ${country.split("_").join(" ")}`;
  worldDate.appendChild(firstPart);

  const secondPart = document.createElement("p");
  secondPart.className = "container__clock--world-hours";
  secondPart.textContent = "";
  worldDate.appendChild(secondPart);

  setInterval(() => {
    const worldTimeFormat = new Intl.DateTimeFormat(navigator.language, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: country,
    }).format(new Date());
    secondPart.textContent = worldTimeFormat;
  }, 1000);

  worldClocks.appendChild(worldDate);
});
