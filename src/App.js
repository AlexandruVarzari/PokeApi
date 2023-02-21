import React, { useState, useEffect } from "react";
import PokeThumbnail from "./components/PokeThumbnail";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadPokemon, setLoadPokemon] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [theme, setTheme] = useState("lightTheme");
  const toggleTheme = () => {
    if (theme === "lightTheme") {
      setTheme("darkTheme");
    } else {
      setTheme("lightTheme");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const getAllPokemons = async () => {
    const res = await fetch(loadPokemon);
    const data = await res.json();

    setLoadPokemon(data.next);

    function createPokemon(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setAllPokemons((currentList) => {
          currentList = [...currentList, data];
          currentList.sort((a, b) => (a.id > b.id ? 1 : -1));
          return currentList;
        });
        await console.log(allPokemons);
      });
    }
    createPokemon(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className={`App ${theme}`}>
      <button className="themeButton" onClick={toggleTheme}>
        🌙
      </button>
      <div className="app-style">
        <h1>Pokémon </h1>
        <div className="pokemon-style">
          <div className="pokemon-all">
            {allPokemons.map((pokemon, index) => (
              <PokeThumbnail
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                stat1={pokemon.stats[0].base_stat}
                stat2={pokemon.stats[1].base_stat}
                stat3={pokemon.stats[2].base_stat}
                stat4={pokemon.stats[3].base_stat}
                stat5={pokemon.stats[4].base_stat}
                stat6={pokemon.stats[5].base_stat}
                type={pokemon.types[0].type.name}
                key={index}
              />
            ))}
          </div>
          <button className="more-pokemon" onClick={() => getAllPokemons()}>
            More Pokemon's
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
