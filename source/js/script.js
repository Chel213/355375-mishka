var controlPopup = document.querySelector(".main-header__control-popup");
var navMenu = document.querySelector(".site-navigation");

var buy = document.querySelectorAll (".catalog__button-buy");
var btn = document.querySelector(".goods-week__button");
var modal = document.querySelector(".modal");
var overlay = document.querySelector(".modal__overlay");

//nav menu
controlPopup.classList.add("open");
navMenu.classList.add("close");

controlPopup.addEventListener("click", function() {
  controlPopup.classList.toggle("open");
  controlPopup.classList.toggle("close");
  navMenu.classList.toggle("close");
});

//modal for catalog
for (var i = 0; i < buy.length; i++) {
  buy[i].addEventListener("click", function(evt) {
    evt.preventDefault();
    modal.classList.add("visible");
  });
}
overlay.addEventListener("click", function() {
  modal.classList.remove("visible");
});

//modal for index
btn.addEventListener("click", function(evt) {
  evt.preventDefault();
  modal.classList.add("visible");
});

overlay.addEventListener("click", function() {
  modal.classList.remove("visible");
});
