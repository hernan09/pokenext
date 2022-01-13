import React from "react";

export async function getStaticPaths() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=200&offset=200`);
  const data = await res.json();
  
  let paths = data.results.map((pokemon) => {
    console.log('LA DATAAAA', pokemon.name);
    return {
      params: {
        pokemon: pokemon.name.toString()
      }
    }
  });

  return {
    paths,
    fallback : true
  }
}

export const getStaticProps = async (context) => {

  
  const id = context.params.pokemon

  console.log('el ID...', id)
    
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = await res.json();
  
    return {
      props: {
        pokemon
      },
    };
};


const cardPokemon = ({pokemon}) => {
    return (
        <div>{pokemon.name}</div>
    )
}

export default cardPokemon;