const strapsDOM = document.querySelector(".straps-grid-container");
const cartTotal = document.querySelector(".subtotal h3");
const navCartAmount = document.querySelector(".cart-icon p");
const cartContent = document.querySelector(".cart-container");
const cartSubTotal = document.querySelector(".check-out-container");

//cart
let cart = [];
//buttons
let buttonsDOM = [];

class Straps {
  async getStraps() {
    try {
      let result = await fetch("./javascripts/strapitems.json");
      let data = await result.json();
      let straps = data.straps;
      straps = straps.map((strap) => {
        const id = strap.id;
        const img = strap.img.url;
        const name = strap.name;
        const price = strap.price;
        return { id, img, name, price };
      });
      return straps;
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  }
}

class UI {
  displayStraps(straps) {
    let result = "";
    straps.forEach((strap) => {
      result += `
      <div class="grid-strap">
        <button class="btn-strap" data-id=${strap.id}>Add to Cart</button>
        <a href="#">
          <div class="img-strap-container">
            <img src=${strap.img} />
          </div>
          <div class="title">
            <h2>${strap.name}</h2>
            <h3>$ ${strap.price}</h3>
          </div>
        </a>
      </div>
      `;
    });
    strapsDOM.innerHTML = result;
  }
  getAddCartBtn() {
    const btnStraps = [...document.querySelectorAll(".btn-strap")];
    buttonsDOM = btnStraps;
    btnStraps.forEach((btnStrap) => {
      let id = btnStrap.dataset.id;
      let inCart = cart.find((strap) => strap.id === id);
      if (inCart) {
        btnStrap.innerText = "In Cart";
        btnStrap.disabled = true;
      } else {
        btnStrap.addEventListener("click", (event) => {
          event.target.innerText = "In Cart";
          event.target.disabled = true;
          //get strap from storage straps
          let cartStrap = { ...Storage.getStraps(id), amount: 1 };
          //add strap to cart
          cart = [...cart, cartStrap];
          //save cart in local storage
          Storage.saveCart(cart);
          //set cart values
          this.setCartValues(cart);
          //display cart items
          this.addCartStrap(cartStrap);
          //show the cart
        });
      }
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((strap) => {
      tempTotal += strap.price * strap.amount;
      itemsTotal += strap.amount;
    });
    cartTotal.innerText = "$" + parseInt(tempTotal.toFixed(2));
    navCartAmount.innerText = itemsTotal;
  }
  addCartStrap(strap) {
    const div = document.createElement("div");
    div.classList.add("products-container");
    div.innerHTML = `
          <div class="img-cart">
            <img src=${strap.img} />
          </div>
          <div class="name-cart">
            <div class="cart-name">
              <h3>${strap.name}</h3>
            </div>
            <div class="cart-amount">
              <i class="fa fa-angle-left left" data-id=${strap.id}></i>
              <h3>${strap.amount}</h3>
              <i class="fa fa-angle-right right" data-id=${strap.id}></i>
            </div>
          </div>
          <div class="price-cart">
            <div class="cart-price">
              <h4>$ ${strap.price}</h4>
            </div>
            <div class="bin-icon">
              <i class="fa fa-trash remove" data-id=${strap.id}></i>
            </div>
          </div>
    `;

    cartContent.insertBefore(div, cartSubTotal);
  }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
  }
  populateCart(cart) {
    cart.forEach((strap) => this.addCartStrap(strap));
  }
  cartLogic() {
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove")) {
        let removeBtn = event.target;
        let id = removeBtn.dataset.id;
        cartContent.removeChild(
          removeBtn.parentElement.parentElement.parentElement
        );
        this.removeItem(id);
      } else if (event.target.classList.contains("right")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((strap) => strap.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.previousElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("left")) {
        let subAmount = event.target;
        let id = subAmount.dataset.id;
        let tempItem = cart.find((strap) => strap.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          subAmount.nextElementSibling.innerText = tempItem.amount;
        } else {
          cartContent.removeChild(
            removeBtn.parentElement.parentElement.parentElement
          );
          this.removeItem(id);
        }
      }
    });
  }
  /*() {
    let cartStraps = cart.map(strap => strap.id);
    cartStraps.forEach(id => this.removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children(0));
    }
  }*/

  removeItem(id) {
    cart = cart.filter((strap) => strap.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let btnStrap = this.getSingleButton(id);
    btnStrap.disabled = false;
    btnStrap.innerHTML = `
     <button class="btn-strap" >Add to Cart</button>
    `;
  }
  getSingleButton(id) {
    return buttonsDOM.find((btnStrap) => btnStrap.dataset.id === id);
  }
}

class Storage {
  static saveStraps(straps) {
    localStorage.setItem("straps", JSON.stringify(straps));
  }

  static getStraps(id) {
    let straps = JSON.parse(localStorage.getItem("straps"));
    return straps.find((strap) => strap.id == id);
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}
// Load Content
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const straps = new Straps();

  ui.setupAPP();

  straps
    .getStraps()
    .then((straps) => {
      ui.displayStraps(straps);
      Storage.saveStraps(straps);
    })
    .then(() => {
      ui.getAddCartBtn();
      ui.cartLogic();
    });
});
