$('.owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  dots:false,
  navText: ["<img src='./images/carousel-prev-btn.svg'>","<img src='./images/carousel-next-btn.svg'>"],
  responsive:{
      0:{
          items:1
      }
  }
});

let carouselWhite = document.querySelectorAll(".owl-carousel--white");
carouselWhite.forEach(function (item) {
  item.querySelector(".owl-prev").querySelector("img").src = "./images/carousel-prev-btn--white.svg";
  item.querySelector(".owl-next").querySelector("img").src = "./images/carousel-next-btn--white.svg";
});