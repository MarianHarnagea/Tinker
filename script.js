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

warpper.addEventListener("click", (event) => {
  if (event.target !== burgerMenu) {
    burgerMenu.classList.remove("burger-menu-active");
    warpper.classList.remove("warpper-active");
    body.classList.remove("scrollY");
    cartMenu.classList.remove("nav-cart-active");
  }
});

(function () {
  //Add Watches To Cart

  const btnWatch = document.querySelectorAll(".btn-watch");

  let watches = [];

  function createUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    displayCartWatches();
    displayCartGifts();
  });

  btnWatch.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      //Img
      let imgPath = event.target.nextElementSibling.firstElementChild.src;

      //Name
      let finishPath =
        event.target.nextElementSibling.nextElementSibling.firstElementChild
          .textContent;
      let watchFirstName = event.target.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.textContent.slice(
        0,
        6
      );
      let watchLastName = event.target.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.textContent.slice(
        14,
        22
      );
      let watchPath = watchFirstName + watchLastName;

      let name = `${finishPath} / ${watchPath}`;

      //Price
      let fullPrice =
        event.target.nextElementSibling.nextElementSibling.firstElementChild
          .nextElementSibling.nextElementSibling.textContent;
      let price = fullPrice.slice(1, 5).trim();

      const watch = {};
      watch.img = imgPath;
      watch.name = name;
      watch.price = price;
      watch.id = createUUID();

      watches.push(watch);
      localStorage.setItem("watches", JSON.stringify(watches));

      const cartItem = document.createElement("div");
      cartItem.classList.add("products-container");

      cartItem.innerHTML = `
        <div class="row pl-0 pr-0">
          <div class="col-3 pl-0 pr-0 img">
            <div class="img-cart">
              <img src="${watch.img}" alt="" />
            </div>
          </div>
          <div class="col-6 pl-0 pr-0 name">
            <div class="name-cart">
              <div class="cart-name">
                <h3>${watch.name}</h3>
              </div>
            </div>
          </div>
          <div class="col-3 pl-0 pr-0 price">
            <div class="price-cart">
              <div class="cart-price">
                <h4>${watch.price} $</h4>
              </div>
              <div class="bin-icon">
                <i data-id=${watch.id} class="fa fa-trash remove"></i>
              </div>
            </div>
          </div>
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

      deleteCartWatch(cartItem, watch);
    });
  });

  // Total Price
  function showTotal() {
    const total = [];
    const prices = document.querySelectorAll(".price-cart h4");

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

  function displayCartWatches() {
    if (localStorage.getItem("watches")) {
      watches = JSON.parse(localStorage.getItem("watches"));
    }

    watches.forEach(function (watch) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("products-container");

      cartItem.innerHTML = `

      <div class="row pl-0 pr-0">
        <div class="col-3 pl-0 pr-0 img">
          <div class="img-cart">
            <img src="${watch.img}" alt="" />
          </div>
        </div>
        <div class="col-6 pl-0 pr-0 name">
          <div class="name-cart">
            <div class="cart-name">
              <h3>${watch.name}</h3>
            </div>
          </div>
        </div>
        <div class="col-3 pl-0 pr-0 price">
          <div class="price-cart">
            <div class="cart-price">
              <h4>${watch.price} $</h4>
            </div>
            <div class="bin-icon">
              <i data-id=${watch.id} class="fa fa-trash remove"></i>
            </div>
          </div>
        </div>
      </div>

          `;

      const cartContainer = document.querySelector(".cart-container");
      const cartTotal = document.querySelector(".check-out-container");
      cartContainer.insertBefore(cartItem, cartTotal);
      deleteCartWatch(cartItem, watch);

      showTotal();
    });
  }

  function deleteCartWatch(cartItem, watch) {
    // Delete Items

    cartItem.firstElementChild.lastElementChild.firstElementChild.lastElementChild.firstElementChild.addEventListener(
      "click",
      (event) => {
        let storageWatches = JSON.parse(localStorage.getItem("watches"));
        let products = storageWatches.filter(
          (product) => product.id !== watch.id
        );
        localStorage.setItem("watches", JSON.stringify(products));

        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();

        showTotal();
      }
    );
  }

  //  Add Straps To Cart
  const strapsDOM = document.querySelector(".straps-dom");
  const cartContent = document.querySelector(".cart-container");
  const cartSubTotal = document.querySelector(".check-out-container");
  let storageStraps = [];
  let straps = [];

  document.addEventListener("DOMContentLoaded", () => {
    fetch("./javascripts/strapitems.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        straps = data.straps;
        // id = straps.id;
        // img = straps.img;
        // name = straps.name;
        // price = straps.price;

        displayStraps();
        getAddCartBtn(straps);
      })

      .catch((err) => {
        console.log(err);
      });

    displayCartStraps();
  });

  function displayStraps() {
    let result = "";
    straps.forEach((strap) => {
      result += `
      <div class="col-6 col-md-3 col-xl-2.5 m-auto m-sm-0">
          <div class="grid-strap">
            <button class="btn-strap" data-id=${strap.id}>Add to Cart</button>
            <a href="#">
              <div class="img-strap-container">
              <img src=${strap.img.url} />
              </div>
              <div class="title">
              <h2>${strap.name}</h2>
              <h3>$ ${strap.price}</h3>
              </div>
            </a>
          </div>
        </div>       
        `;
    });
    strapsDOM.innerHTML = result;
  }

  function getAddCartBtn(straps) {
    const btnStraps = [...document.querySelectorAll(".btn-strap")];
    btnStraps.forEach((btnStrap) => {
      btnStrap.addEventListener("click", () => {
        let id = btnStrap.dataset.id;

        straps.forEach((strap) => {
          if (strap.id == id) {
            if (localStorage.getItem("straps") != null) {
              storageStraps = JSON.parse(localStorage.getItem("straps"));
            }

            storageStraps.push(strap);
            localStorage.setItem("straps", JSON.stringify(storageStraps));
            const cartItem = document.createElement("div");
            cartItem.classList.add("products-container");

            cartItem.innerHTML = `
            <div class="row pl-0 pr-0">
            <div class="col-3 pl-0 pr-0">
              <div class="img-cart">
              <img src="${strap.img.url}" alt="">
              </div>
            </div>
            <div class="col-6 pl-0 pr-0">
              <div class="name-cart">
                <div class="cart-name">
                <h3>${strap.name}</h3>
                </div>
              </div>
            </div>
            <div class="col-3 pl-0 pr-0">
              <div class="price-cart">
                <div class="cart-price">
                <h4>${strap.price} $</h4>
                </div>
                <div class="bin-icon">
                <i data-id=${strap.id} class="fa fa-trash remove"></i>
                </div>
                </div>
              </div>
            </div>

              `;

            const cartContainer = document.querySelector(".cart-container");
            const cartTotal = document.querySelector(".check-out-container");
            if (cartContainer.insertBefore(cartItem, cartTotal)) {
              cartMenu.classList.toggle("nav-cart-active");
              warpper.classList.add("warpper-active");
              body.classList.add("scrollY");
            }
            deleteCartStraps(cartItem, strap);
            showTotal();
          }
        });
      });
    });
  }

  function displayCartStraps() {
    if (localStorage.getItem("straps") !== null) {
      getStraps = JSON.parse(localStorage.getItem("straps"));
    }

    getStraps.forEach(function (getStrap) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("products-container");

      let strap = getStrap;

      cartItem.innerHTML = `

      

      <div class="row pl-0 pr-0">
          <div class="col-3 pl-0 pr-0">
            <div class="img-cart">
              <img src="${strap.img.url}" alt="">
            </div>
          </div>
        <div class="col-6 pl-0 pr-0">
          <div class="name-cart">
            <div class="cart-name">
              <h3>${strap.name}</h3>
            </div>
          </div>
        </div>
          <div class="col-3 pl-0 pr-0">
            <div class="price-cart">
              <div class="cart-price">
                <h4>${strap.price} $</h4>
              </div>
              <div class="bin-icon">
                <i data-id=${strap.id} class="fa fa-trash remove"></i>
              </div>
            </div>
          </div>
      </div>
          `;

      const cartContainer = document.querySelector(".cart-container");
      const cartTotal = document.querySelector(".check-out-container");
      cartContainer.insertBefore(cartItem, cartTotal);
      deleteCartStraps(cartItem, strap);

      showTotal();
    });
  }

  function deleteCartStraps(cartItem, strap) {
    // Delete Items
    cartItem.firstElementChild.lastElementChild.firstElementChild.lastElementChild.firstElementChild.addEventListener(
      "click",
      (event) => {
        let LSStraps = JSON.parse(localStorage.getItem("straps"));
        let products = LSStraps.filter((product) => product.id !== strap.id);
        localStorage.setItem("straps", JSON.stringify(products));
        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();

        showTotal();
      }
    );
  }

  // Add Gift Cards
  let gifts = [];

  function giftCardCounter() {
    let number = document.getElementById("number");
    const addCount = document.getElementById("addCountt");
    const lowerCount = document.getElementById("lowerCountt");

    let giftCount = 1;
    addCount.addEventListener("click", incrementCounter);
    lowerCount.addEventListener("click", decrementCounter);

    function incrementCounter() {
      giftCount++;
      number.innerHTML = giftCount;
    }

    function decrementCounter() {
      if (giftCount > 1) {
        giftCount--;
        number.innerHTML = giftCount;
      }
    }
  }
  giftCardCounter();

  const btnGift = document.querySelector(".add-gift");
  btnGift.addEventListener("click", function (event) {
    let imgPath =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.firstElementChild.firstElementChild.firstElementChild
        .src;
    let namePath = "Digital Gift Card";
    let pricePath =
      event.target.parentElement.previousElementSibling.previousElementSibling
        .lastElementChild.value;

    let id = createUUID();

    let gift = {};
    gift.img = imgPath;
    gift.name = namePath;
    gift.price = pricePath;
    gift.id = id;

    console.log(id);

    if (localStorage.getItem("gifts") != null) {
      gifts = JSON.parse(localStorage.getItem("gifts"));
    }

    gifts.push(gift);
    localStorage.setItem("gifts", JSON.stringify(gifts));

    const cartItem = document.createElement("div");
    cartItem.classList.add("products-container");

    cartItem.innerHTML = `
    <div class="row pl-0 pr-0">
      <div class="col-3 pl-0 pr-0">
        <div class="img-cart">
          <img src="${gift.img}" alt="">
        </div>
      </div>

      <div class="col-6 pl-0 pr-0">
        <div class="name-cart">
          <div class="cart-name">
            <h3>${gift.name}</h3> 
          </div>
        </div>
      </div>
            
      <div class="col-3 pl-0 pr-0">
        <div class="price-cart">
          <div class="cart-price">
            <h4>${gift.price} $</h4>
          </div>
          <div class="bin-icon">
            <i data-id=${gift.id} class="fa fa-trash remove"></i>
          </div>
        </div>
      </div>
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
    deleteCartGifts(cartItem, gift);
    showTotal();
  });

  function displayCartGifts() {
    if (localStorage.getItem("gifts")) {
      gifts = JSON.parse(localStorage.getItem("gifts"));
    }

    gifts.forEach(function (gift) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("products-container");

      cartItem.innerHTML = `

      <div class="row pl-0 pr-0">
        <div class="col-3 pl-0 pr-0 img">
          <div class="img-cart">
            <img src="${gift.img}" alt="" />
          </div>
        </div>
        <div class="col-6 pl-0 pr-0 name">
          <div class="name-cart">
            <div class="cart-name">
              <h3>${gift.name}</h3>
            </div>
          </div>
        </div>
        <div class="col-3 pl-0 pr-0 price">
          <div class="price-cart">
            <div class="cart-price">
              <h4>${gift.price} $</h4>
            </div>
            <div class="bin-icon">
              <i data-id=${gift.id} class="fa fa-trash remove"></i>
            </div>
          </div>
        </div>
      </div>

          `;

      const cartContainer = document.querySelector(".cart-container");
      const cartTotal = document.querySelector(".check-out-container");
      cartContainer.insertBefore(cartItem, cartTotal);
      deleteCartGifts(cartItem, gift);

      showTotal();
    });
  }

  function deleteCartGifts(cartItem, gift) {
    // Delete Items
    cartItem.firstElementChild.lastElementChild.firstElementChild.lastElementChild.firstElementChild.addEventListener(
      "click",
      (event) => {
        let LSGifts = JSON.parse(localStorage.getItem("gifts"));
        let products = LSGifts.filter((product) => product.id !== gift.id);
        localStorage.setItem("gifts", JSON.stringify(products));
        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        showTotal();
      }
    );
  }

  //
})();

//End Add Watches To Cart
