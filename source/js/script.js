var menuToggleSection = document.querySelector(".main-navigation__toggle-section");
var menuToggleButton = document.querySelector(".main-navigation__toggle-button");
var menuClose = document.querySelector(".site-list__close");
var menuNavigation = document.querySelector(".site-list");

window.onload = function() {
  menuNavigation.classList.add("hidden");
  menuToggleSection.classList.add("appear");
};

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
