const burgerButton = document.querySelector(".burger-button");
const warpper = document.querySelector(".warpper");
const burgerMenu = document.querySelector(".burger-menu");
const textSlide = document.querySelectorAll(".burger-menu h2");
const body = document.body;
const exitBtn = document.querySelector(".exitBtn");
const exitCartBtn = document.querySelector(".exit-cartBtn");
const cartButton = document.querySelector(".cart-icon");
const cartMenu = document.querySelector(".nav-cart");

// Burger Menu And Cart
const navSlide = () => {
  burgerButton.addEventListener("click", () => {
    if (burgerMenu.classList.toggle("burger-menu-active")) {
      warpper.classList.add("warpper-active");
      body.classList.add("scrollY");
      cartMenu.classList.remove("nav-cart-active");
    } else {
      burgerMenu.classList.remove("burger-menu-active");
      warpper.classList.remove("warpper-active");
      body.classList.remove("scrollY");
    }
  });
};
navSlide();

const cartSlide = () => {
  // Toggle Cart Menu
  cartButton.addEventListener("click", () => {
    if (cartMenu.classList.toggle("nav-cart-active")) {
      warpper.classList.add("warpper-active");
      body.classList.add("scrollY");
      burgerMenu.classList.remove("burger-menu-active");
    } else {
      warpper.classList.remove("warpper-active");
      body.classList.remove("scrollY");
      cartMenu.classList.remove("nav-cart-active");
    }
  });
};
cartSlide();

// Exit Menu And Cart
const exitMenu = () => {
  // Exit Burger Menu
  exitBtn.addEventListener("click", () => {
    if (exitBtn.classList.toggle("nav-cart-active")) {
      warpper.classList.remove("warpper-active");
      body.classList.remove("scrollY");
      burgerMenu.classList.remove("burger-menu-active");
    }
  });
};
exitMenu();

const exitCart = () => {
  // Exit Burger Menu
  exitCartBtn.addEventListener("click", () => {
    if (exitCartBtn.classList.toggle("nav-cart-active")) {
      warpper.classList.remove("warpper-active");
      body.classList.remove("scrollY");
      cartMenu.classList.remove("nav-cart-active");
    }
  });
};
exitCart();
