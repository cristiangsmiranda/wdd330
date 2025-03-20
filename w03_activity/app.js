let url = 'https://pokeapi.co/api/v2/pokemon';

// Função para buscar a próxima página de Pokémon
function fetchData(url) {
  fetch(url)
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
      doStuff(data); // Processa os dados recebidos
      // Se houver uma próxima página, faça a requisição dela
      // Comentado: Se quiser carregar todos os Pokémon, descomente a linha abaixo
      // if (data.next) { fetchData(data.next); }
    })
    .catch(error => console.error('Erro ao buscar dados: ', error)); // Tratar erros
}

function doStuff(data) {
  let results = data; // Armazena os dados recebidos

  // Exibe a resposta da API no console
  console.log('first: ', results);
  console.log('Total de Pokémon: ', results.count);
  console.log('Número de Pokémon retornados por padrão: ', results.results.length);

  // Cria elementos na página HTML para exibir os nomes dos Pokémon
  results.results.forEach((pokemon) => {
    const div = document.createElement('div');
    div.textContent = pokemon.name;
    document.querySelector('main').appendChild(div);

    // Adiciona cada Pokémon como uma opção no <select>
    const option = document.createElement('option');
    option.value = pokemon.name;
    option.textContent = pokemon.name;
    document.querySelector('#pokemonSelect').appendChild(option);
  });

  // If you want to see more than 20 Pokémon, uncomment the line below to load the next page
  // if (results.next) { fetchData(results.next); }
}

// Start the request for the first page (20 Pokémon)
fetchData(url);
