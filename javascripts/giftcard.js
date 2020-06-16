// Gift Card Counter
// function giftCardCounter() {
//   let number = document.getElementById("number");
//   const addCount = document.getElementById("addCountt");
//   const lowerCount = document.getElementById("lowerCountt");

//   let giftCount = 1;
//   addCount.addEventListener("click", incrementCounter);
//   lowerCount.addEventListener("click", decrementCounter);

//   function incrementCounter() {
//     giftCount++;
//     number.innerHTML = giftCount;
//   }

//   function decrementCounter() {
//     if (giftCount > 1) {
//       giftCount--;
//       number.innerHTML = giftCount;
//     }
//   }
// }
// giftCardCounter();

// End Of Gift Card Counter

(function () {
  const btnGift = document.querySelector(".add-gift");
  btnGift.addEventListener("click", function (event) {
    //Img
    let imgPath =
      event.target.parentElement.parentElement.parentElement
        .previousElementSibling.firstElementChild.src;
    //Name
    let namePath =
      event.target.parentElement.parentElement.firstElementChild
        .lastElementChild.firstElementChild.textContent;
    //Price
    let pricePath =
      event.target.parentElement.previousElementSibling.previousElementSibling
        .lastElementChild.value;

    //Gift Object
    const gift = {};
    gift.img = imgPath;
    gift.name = namePath;
    gift.price = pricePath;

    //Create Dom Cart Element Item
    const cartItem = document.createElement("div");
    cartItem.classList.add("products-container");

    cartItem.innerHTML = `
        <div class="img-cart">
          <img src="${gift.img}" alt="">
        </div>
        <div class="name-cart">
          <h3>${gift.name}</h3> 
        </div>
        <div class="price-cart">
          <h3>${gift.price} $</h3>
        <div class="bin-icon">
          <i class="fa fa-trash remove"></i>
        </div>  
        `;
    //Add Item To Cart
    const cartContainer = document.querySelector(".cart-container");
    const cartTotal = document.querySelector(".check-out-container");
    if (cartContainer.insertBefore(cartItem, cartTotal)) {
      cartMenu.classList.toggle("nav-cart-active");
      warpper.classList.add("warpper-active");
      body.classList.add("scrollY");
    }
    showTotal();

    // Delete Cart Items
    cartItem.lastElementChild.lastElementChild.firstElementChild.addEventListener(
      "click",
      function (event) {
        event.target.parentElement.parentElement.parentElement.remove();
        showTotal();
      }
    );
  });

  // Total Price And Items
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
