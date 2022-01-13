import Card from '../components/card.js';
import Link from 'next/link';

export const getStaticProps = async () => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const traerPokemon = (numero) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
      .then((res) => res.json())
      .then((data) => data);
  };

  let arrayPokemon = [];

  for (let index = 1; index <= 230; index++) {
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
    <div className='container'>
      <div className="title">
        <div className='contentcards'>
          {arrayPokemon2.map((item, index) => {
            return (
              <div>
                <Link href={{
                  pathname : '/pokecard/[name]',
                  query : { name : item.name }
                }} key={item.id}>
                  <a>
                <Card key={index} item={item}></Card>
                </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pokemons;
