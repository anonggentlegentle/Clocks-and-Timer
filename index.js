"use strict";

const mainClock = document.querySelector(".clock__main-hours");
const mainCurrentDay = document.querySelector(".clock__main-date");

const mainTimeAndDate = function () {
  const mainTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
    }).format(new Date());
    mainClock.textContent = mainTime;
  }, 1000);
};

mainTimeAndDate();
