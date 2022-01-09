import Card from '../../components/card.js';
import style from './pokecards.module.css';

export const getStaticProps = async () => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const traerPokemon = (numero) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
      .then((res) => res.json())
      .then((data) => data);
  };

  let arrayPokemon = [];

  for (let index = 1; index <= 150; index++) {
    let datapokemon = await traerPokemon(index);
    arrayPokemon.push(datapokemon);
  }

  let arrayPokemon2 = arrayPokemon.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.sprites.other.dream_world.front_default,
      type: pokemon.types,
    };
  });

  return {
    props: {
      arrayPokemon2,
    },
  };
};

const Pokemons = ({ arrayPokemon2 }) => {
  return (
    <div className={style.container}>
      <div className="title">
        <div className={style.contentcards}>
          {arrayPokemon2.map((item, index) => {
            return <Card key={index} item={item}></Card>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Pokemons;
