import items from "./items.json" assert { type: "json" };
import currencyFormatter from "./.util/currencyFormatter.js";

const cartItemsContainer = document.querySelector(
  "[data-cart-items-container]"
);
const cart = document.querySelector("[data-cart]");
const cartItemTemp = document.querySelector("#cart-item-temp");
const totalPrice = document.querySelector("[data-total-price]");
const totalProductsInCart = document.querySelector(
  "[data-total-products-in-cart]"
);

const IMAGE_URL = "https://dummyimage.com/210x130";

let localCart = localStorage.getItem('SHOPPING-CART')
let shoppingCart = JSON.parse(localCart) || [];
console.log(shoppingCart)
renderCartItems()


export default function setupCart({ id, price, quantity }) {
  const existingItem = shoppingCart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity++;
    renderCartItems();
  } else {
    //   console.log(id, price, quantity);
    console.log(shoppingCart);
    shoppingCart.push({ id, price, quantity });
    renderCartItems();
    console.log(shoppingCart);
  }
}

function renderCartItems() {
    console.log('IMAGE_URL',IMAGE_URL)
    localStorage.setItem('SHOPPING-CART',JSON.stringify(shoppingCart))
    setCartLength();
    calculateTotal();
    shoppingCart.length === 0 && hideCart()
    cartItemsContainer.innerHTML = "";
    shoppingCart.forEach((entry) => {
    const cartItemTemplate = cartItemTemp.content.cloneNode(true);
    const cartItem = cartItemTemplate.querySelector("[data-cart-item]");
    const myItem = items.find((item) => item.id == entry.id);

    const image = cartItem.querySelector("[data-product-image]");
    image.src = `${IMAGE_URL}/${myItem.imageColor}/${myItem.imageColor}`;
    console.log('image',image)

    const name = cartItem.querySelector("[data-product-name]");
    name.innerText = myItem.name;

    cartItem.dataset.id = myItem.id;

    if (entry.quantity > 1) {
      const quantityText = cartItem.querySelector("[data-product-quantity]");
      quantityText.innerText = `x${entry.quantity}`;
    }

    const price = cartItem.querySelector("[data-product-price]");
    price.innerText = currencyFormatter(myItem.priceCents / 100);

    cartItemsContainer.appendChild(cartItem);
    console.log(cartItem);
    console.log("entry", entry);

    // setCartLength();
    // calculateTotal();
    console.log('set length and total')

    shoppingCart.length == 1 && showCart();
  });
}

const cartButton = document.querySelector("[data-cart-btn]");

cartButton.addEventListener("click", () => {
  cart.classList.toggle("invisible");
});

function calculateTotal() {
  const finalPrice =
    shoppingCart.length &&
    shoppingCart.reduce((sum, entry) => {
      const price = entry.price;
      const quantity = entry.quantity;
      return (sum += price * quantity);
    }, 0);
  totalPrice.innerText = currencyFormatter(finalPrice);
}

function setCartLength() {
  totalProductsInCart.innerText = shoppingCart.length;
}

function showCart() {
  cart.classList.remove("invisible");
}

function hideCart() {
   cart.classList.add("invisible");
}

document.addEventListener('click', (e) => {
    if(e.target.matches('[data-remove-from-cart-button]')) {
        const id = parseInt(e.target.closest('[data-cart-item]').dataset.id)
        removeItem(id)
        renderCartItems()
    }
})

function removeItem(id) {
    shoppingCart = shoppingCart.filter(item => item.id !== id)
}