import { getLocalStorage, setLocalStorage, qs, renderListWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
  constructor() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.cartElement = qs("#cart-items");
    this.cartFooter = qs(".list-footer");  // O elemento que mostra o total e o botão de checkout
    this.cartTotalElement = qs("#cart-total"); // O span que exibe o total
  }

  init() {
    this.renderCart();
    this.addEventListeners();
  }

  renderCart() {
    if (this.cartItems.length === 0) {
      this.cartElement.innerHTML = "<p>Your cart is empty.</p>";
      this.hideCartTotal();
      return;
    }

    // Renderiza os itens do carrinho
    renderListWithTemplate(this.cartItemTemplate, this.cartElement, this.cartItems, "afterbegin", true);
    
    // Mostra o total e o calcula
    this.showCartTotal();
  }

  // Exibe o total do carrinho
  showCartTotal() {
    const total = this.calculateTotal();
    this.cartTotalElement.textContent = total.toFixed(2);  // Exibe o total com 2 casas decimais
    this.cartFooter.classList.remove("hide"); // Exibe o footer com o total e o botão de checkout
  }

  // Esconde o total e o botão de checkout caso o carrinho esteja vazio
  hideCartTotal() {
    this.cartFooter.classList.add("hide");
  }

  // Calcula o total do carrinho
  calculateTotal() {
    return this.cartItems.reduce((total, item) => total + item.FinalPrice, 0);
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
