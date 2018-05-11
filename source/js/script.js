var controlPopup = document.querySelector(".main-header__control-popup");
var navMenu = document.querySelector(".site-navigation");
console.log(controlPopup);
console.log(navMenu);

controlPopup.classList.add("open");
navMenu.classList.add("close");

controlPopup.addEventListener("click", function() {
  controlPopup.classList.toggle("open");
  controlPopup.classList.toggle("close");
  navMenu.classList.toggle("close");
});
