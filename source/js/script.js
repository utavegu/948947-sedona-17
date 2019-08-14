var menuToggleSection = document.querySelector(".main-navigation__toggle-section");
var menuToggleButton = document.querySelector(".main-navigation__toggle-button");
var menuClose = document.querySelector(".site-list__close");
var menuNavigation = document.querySelector(".site-list");

//В принципе на мобильном этот скрипт работает, но чтобы реагировал на вьюпорт - написал вариант, который под ним... который работает так же
// window.onload = function() {
//   if (screen.width <= 320) {
//     menuNavigation.classList.add("hidden");
//     menuToggleSection.classList.add("appear");
//   }
// }

window.onload = function() {
  if (document.body.clientWidth <= 320) {
    menuNavigation.classList.add("hidden");
    menuToggleSection.classList.add("appear");
  }
  else {
    menuNavigation.classList.remove("hidden");
    menuToggleSection.classList.remove("appear");
    menuClose.classList.remove("appear");
  }
}

menuToggleButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  menuNavigation.classList.remove("hidden");
  menuToggleSection.classList.remove("appear");
  menuClose.classList.add("appear");
});

menuToggleButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  menuNavigation.classList.remove("hidden");
  menuToggleSection.classList.remove("appear");
  menuClose.classList.add("appear");
});

menuClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  menuNavigation.classList.add("hidden");
  menuClose.classList.remove("appear");
  menuToggleSection.classList.add("appear");
});
