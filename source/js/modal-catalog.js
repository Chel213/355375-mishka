var btn = document.querySelectorAll (".catalog__button-buy");
var modal = document.querySelector(".modal");
var overlay = document.querySelector(".modal__overlay");


for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function(evt) {
    evt.preventDefault();
    modal.classList.add("visible");
  });
}

overlay.addEventListener("click", function() {
  modal.classList.remove("visible");
});
