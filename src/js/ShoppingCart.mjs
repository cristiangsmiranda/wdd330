import { getLocalStorage, setLocalStorage, qs, renderListWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
  constructor() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.cartElement = qs("#cart-items");
  }

  init() {
    this.renderCart();
    this.addEventListeners();
  }

  renderCart() {
    if (this.cartItems.length === 0) {
      this.cartElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    renderListWithTemplate(this.cartItemTemplate, this.cartElement, this.cartItems, "afterbegin", true);
  }

  cartItemTemplate(item) {
    return `
      <li class="cart-item">
        <img src="${item.Image}" alt="${item.NameWithoutBrand}" class="cart-item__image" />
        <div class="cart-item__details">
          <h3>${item.Brand.Name} - ${item.NameWithoutBrand}</h3>
          <p>Price: $${item.FinalPrice}</p>
          <p>Color: ${item.Colors[0].ColorName}</p>
          <button class="remove-item" data-id="${item.Id}">Remove</button>
        </div>
      </li>
    `;
  }

  addEventListeners() {
    this.cartElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        const productId = event.target.dataset.id;
        this.removeItemFromCart(productId);
      }
    });
  }

  removeItemFromCart(productId) {
    this.cartItems = this.cartItems.filter(item => item.Id !== productId);
    setLocalStorage("so-cart", this.cartItems);
    this.renderCart();
  }
}
