import React from "react";

export async function getStaticPaths() {

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

  let paths = arrayPokemon.map((pokemon) => {
    return {
      params: {
        name: pokemon.name.toString()
      }
    }
  });

  return {
    paths,
    fallback : true
  }
}

export const getStaticProps = async (context) => {

  const id = context.params.name

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