// (w) 1) -------------------------------------Variables

let pokemons = [];

const url = "https://pokeapi.co/api/v2/pokemon";
const pokemons_number = 151;

const cardContainer = document.querySelector("#cardContainer");
const form = document.querySelector("#form");
const select = document.querySelector("#optionTypes");

// (w) 2) -------------------------------------Funciones

const getAllPokemon = async (id) => {
  const response = await fetch(`${url}/${id}`);
  const pokemon = await response.json();
  pokemons = [...pokemons, pokemon];
};

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getAllPokemon(i);
  }
  pokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

const removePokemon = () => {
  const pokemonCards = document.getElementsByClassName("pokemon");
  let removablePokemons = [];
  for (let i = 0; i < pokemonCards.length; i++) {
    const pokemonCard = pokemonCards[i];
    removablePokemons = [...removablePokemons, pokemonCard];
  }
  removablePokemons.forEach((remPoke) => remPoke.remove());
};

const getPokemon = (search) => {
  const searchPokemons = pokemons.filter(
    (poke) =>
      poke.types[0].type.name == search ||
      poke.id == search ||
      poke.name[0] === search ||
      poke.name.startsWith(search)
  );

  removePokemon();
  searchPokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

const createPokemonCard = (pokemon) => {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon");

  const type = pokemon.types.map((el) => el.type.name).slice(0, 1);

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const stat = pokemon.stats
    .map((el) => el.stat.name)
    .slice(0, 3)
    .map((stat) => {
      return `<li class="names">${stat}</li>`;
    })
    .join("");

  const base = pokemon.stats
    .map((el) => el.base_stat)
    .slice(0, 3)
    .map((base) => {
      return `<li class="base">${base}</li>`;
    })
    .join("");

  const template = `
        <div class="img-container ${type}" style="background-image: url(./svg/${type}.svg)">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              pokemon.id
            }.png" alt="${name}" />
        </div>

        <div class="info">
            <span class="number">#${pokemon.id
              .toString()
              .padStart(3, "0")}</span>

            <h3 class="name" style="background-color: var(--${type})">${name}</h3>
            
            <small class="type"><span style="color: var(--${type})">${type}</span></small>
        </div>

        <div class="stats">
            <h2>Stats</h2>
            <div class="flex">
                <ul>${stat}</ul>
                <ul>${base}</ul>
            </div>
        </div>
    `;

  pokemonCard.innerHTML = template;
  cardContainer.appendChild(pokemonCard);
};

// (w) 3) ----------------------------------------Eventos

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm === "") {
    pokemons = [];
    removePokemon();
    fetchPokemons();
    return;
  }

  getPokemon(searchTerm);
});

select.addEventListener("change", (e) => {
  const selectTypes = e.target.value;
  console.log(selectTypes);

  getPokemon(selectTypes);
});

// (w) 4) ----------------------------------------Llamado

fetchPokemons();
