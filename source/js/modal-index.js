var btn = document.querySelector(".goods-week__button");
var modal = document.querySelector(".modal");
var overlay = document.querySelector(".modal__overlay");

btn.addEventListener("click", function(evt) {
  evt.preventDefault();
  modal.classList.add("visible");
});

overlay.addEventListener("click", function() {
  modal.classList.remove("visible");
})
