// discount.js

// Função para verificar o número de itens no carrinho e mostrar o desconto
function verificarDesconto() {
    // Obter os itens do carrinho usando a função getLocalStorage do cart.js
    const cartItems = getLocalStorage("so-cart"); // Obtém os itens do carrinho
  
    // Referências para o botão e a mensagem de desconto
    const botaoDesconto = document.getElementById("botao-desconto");
    const mensagemDesconto = document.getElementById("mensagem-desconto");
  
    // Verifica se há 2 ou mais itens no carrinho
    if (cartItems.length >= 2) {
      // Se houver 2 ou mais itens, exibe o botão e a mensagem
      botaoDesconto.style.display = "block";
      mensagemDesconto.style.display = "block";
    } else {
      // Caso contrário, esconde o botão e a mensagem
      botaoDesconto.style.display = "none";
      mensagemDesconto.style.display = "none";
    }
  }
  
  // Chama a função para verificar o desconto assim que a página carregar
  window.onload = verificarDesconto;
  