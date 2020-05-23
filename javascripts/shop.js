// Filter Shop Items
// external js: isotope.pkgd.js

// init Isotope
var $grid = $(".grid").isotope({
  itemSelector: ".grid-item",
  layoutMode: "fitRows",
});

// store filter for each group
var filters = {};

$(".filters").on("click", ".button", function (event) {
  var $button = $(event.currentTarget);
  // get group key
  var $buttonGroup = $button.parents(".button-group");
  var filterGroup = $buttonGroup.attr("data-filter-group");
  // set filter for group
  filters[filterGroup] = $button.attr("data-filter");
  // combine filters
  var filterValue = concatValues(filters);
  // set filter for Isotope
  $grid.isotope({ filter: filterValue });
});

// change is-checked class on buttons
$(".button-group").each(function (i, buttonGroup) {
  var $buttonGroup = $(buttonGroup);
  $buttonGroup.on("click", "button", function (event) {
    $buttonGroup.find(".is-checked").removeClass("is-checked");
    var $button = $(event.currentTarget);
    $button.addClass("is-checked");
  });
});

// flatten object by concatting values
function concatValues(obj) {
  var value = "";
  for (var prop in obj) {
    value += obj[prop];
  }
  return value;
}

//End Filter Shop Items

//Add Watches To Cart
(function () {
  const btnWatch = document.querySelectorAll(".btn-watch");

  btnWatch.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      //Img
      let imgPath = event.target.nextElementSibling.firstElementChild.src;

      //Name
      let finishPath =
        event.target.nextElementSibling.nextElementSibling.firstElementChild
          .textContent;
      let strapFirstWord = event.target.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.textContent.slice(
        0,
        6
      );
      let strapLastWord = event.target.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.textContent.slice(
        14,
        20
      );
      let strapPath = strapFirstWord + strapLastWord;

      let name = `${finishPath} / ${strapPath}`;

      //Price
      let fullPrice =
        event.target.nextElementSibling.nextElementSibling.firstElementChild
          .nextElementSibling.nextElementSibling.textContent;
      let price = fullPrice.slice(1, 5).trim();

      const watch = {};
      watch.img = imgPath;
      watch.name = name;
      watch.price = price;

      const cartItem = document.createElement("div");
      cartItem.classList.add("products-container");

      cartItem.innerHTML = `
        <div class="img-cart">
          <img src="${watch.img}" alt="">
        </div>
        <div class="name-cart">
          <h3>${watch.name}</h3> 
        </div>
        <div class="price-cart">
          <h3>${watch.price} $</h3>
        <div class="bin-icon">
          <i class="fa fa-trash remove"></i>
        </div>  
        `;

      const cartContainer = document.querySelector(".cart-container");
      const cartTotal = document.querySelector(".check-out-container");
      if (cartContainer.insertBefore(cartItem, cartTotal)) {
        cartMenu.classList.toggle("nav-cart-active");
        warpper.classList.add("warpper-active");
        body.classList.add("scrollY");
      }

      showTotal();

      // Delete Items
      cartItem.lastElementChild.lastElementChild.firstElementChild.addEventListener(
        "click",
        function (event) {
          event.target.parentElement.parentElement.parentElement.remove();
          showTotal();
        }
      );
    });
  });

  // Total Price
  function showTotal() {
    const total = [];
    const prices = document.querySelectorAll(".price-cart h3");

    prices.forEach(function (price) {
      total.push(parseFloat(price.textContent));
    });

    const totalPrice = total.reduce(function (total, price) {
      total += price;
      return total;
    }, 0);

    document.querySelector(".subtotal h3").textContent = "$" + totalPrice;
    document.querySelector(".cart-icon p").textContent = total.length;
  }
})();

//End Add Watches To Cart
