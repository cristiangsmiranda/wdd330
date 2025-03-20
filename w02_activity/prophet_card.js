const url =
  "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json"; // URL do JSON
const cardsContainer = document.querySelector(".cards"); // Container onde os cards serão adicionados
const template = document.getElementById("prophet-card"); // Pegando o template

// Função para buscar os dados do JSON
async function getProphets() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets); // Chama a função que cria os cards
}

// Função para exibir os profetas na tela
function displayProphets(prophets) {
  prophets.forEach((prophet) => {
    let clone = template.content.cloneNode(true); // Clona o template

    // Preenche os elementos do template com os dados do profeta
    clone.querySelector(
      "h2"
    ).textContent = `${prophet.name} ${prophet.lastname}`;
    clone.querySelectorAll(
      "p"
    )[0].textContent = `Data de nascimento: ${prophet.birthdate}`;
    clone.querySelectorAll(
      "p"
    )[1].textContent = `Local de nascimento: ${prophet.birthplace}`;
    clone.querySelector(".profile").src = prophet.imageurl;
    clone.querySelector(
      ".profile"
    ).alt = `Retrato de ${prophet.name} ${prophet.lastname}`;

    // Adiciona o clone ao container
    cardsContainer.appendChild(clone);
  });
}

// Chama a função para buscar os dados e preencher os templates
getProphets();
