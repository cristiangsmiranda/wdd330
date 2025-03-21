import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

export default class Discount {
  constructor() {
    // Pegando os itens do carrinho do localStorage
    this.cartItems = getLocalStorage("so-cart") || [];
    this.discountButton = qs("#botao-desconto");
    this.discountMessage = qs("#mensagem-desconto");
    this.listFooter = qs(".list-footer");
  }

  init() {
    // Chama a função que verifica a quantidade de itens
    this.checkCartItems();
    // Adiciona evento para atualizar o desconto quando itens forem removidos
    this.addEventListeners();
  }

  checkCartItems() {
    // Se houver 2 ou mais itens no carrinho
    if (this.cartItems.length >= 2) {
      this.showDiscountButton();
    } else {
      this.hideDiscountButton();
    }
  }

  showDiscountButton() {
    // Exibe o botão de desconto
    this.discountButton.style.display = "inline-block";
    this.discountMessage.style.display = "inline-block";
    this.listFooter.classList.remove("hide");
  }

  hideDiscountButton() {
    // Esconde o botão de desconto
    this.discountButton.style.display = "none";
    this.discountMessage.style.display = "none";
    this.listFooter.classList.add("hide");
  }

  addEventListeners() {
    // Adiciona evento para o clique no botão de desconto (se necessário)
    this.discountButton.addEventListener("click", () => {
      this.applyDiscount();
    });
  }

  applyDiscount() {
    // Exemplo de aplicação do desconto
    const discountAmount = 0.25; // 25% de desconto
    const discountedItems = this.cartItems.map(item => {
      item.FinalPrice = item.FinalPrice - (item.FinalPrice * discountAmount);
      return item;
    });

    // Atualiza o carrinho com os preços com desconto no localStorage
    this.cartItems = discountedItems;
    setLocalStorage("so-cart", this.cartItems);
    
    // Atualiza a renderização do carrinho
    this.renderCartWithDiscount();

    alert("25% discount applied!");
  }

  renderCartWithDiscount() {
    // Atualiza a exibição do carrinho com os preços com desconto
    this.checkCartItems();
    // Aqui você pode chamar a renderização do carrinho novamente, se necessário
    // Exemplo: renderCart();
  }
}
