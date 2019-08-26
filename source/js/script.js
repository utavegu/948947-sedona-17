var menuToggleSection = document.querySelector(".main-navigation__toggle-section");
var menuToggleButton = document.querySelector(".main-navigation__toggle-button");
var menuClose = document.querySelector(".site-list__close");
var menuNavigation = document.querySelector(".site-list");

window.onload = function() {
  if (document.body.clientWidth <= 320) {
    menuNavigation.classList.add("hidden");
    menuToggleButton.classList.add("appear");
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
  menuClose.classList.add("appear");
  menuToggleButton.classList.remove("appear");
});

menuClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  menuNavigation.classList.add("hidden");
  menuClose.classList.remove("appear");
  menuToggleSection.classList.add("appear");
  menuToggleButton.classList.add("appear");
});



var formSubmitButton = document.querySelector(".feedback__button");
var popupSuccessWindow = document.querySelector(".popup--success");
var popupFailureWindow = document.querySelector(".popup--failure");
var popupSuccessButton = document.querySelector(".popup-success__button");
var popupFailureButton = document.querySelector(".popup-failure__button");
var fieldName = document.querySelector("#forename");
var fieldSurname = document.querySelector("#surname");
var fieldPhone = document.querySelector("#phone");
var fieldEmail = document.querySelector("#e-mail");

formSubmitButton.addEventListener("click", function (evt) {
  if (!fieldName.value || !fieldSurname.value || !fieldPhone.value || !fieldEmail.value) {
    popupFailureWindow.classList.add("is-opened");
  } else {
    evt.preventDefault();
    popupSuccessWindow.classList.add("is-opened");
  }
});

popupSuccessButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupSuccessWindow.classList.remove("is-opened");
});

popupFailureButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupFailureWindow.classList.remove("is-opened");
});
