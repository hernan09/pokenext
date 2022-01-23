import Card from '../components/card.js';
import Link from 'next/link';
import cache from 'memory-cache';
import { useState, useEffect } from 'react';

export const getStaticProps = async () => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const traerPokemon = (numero) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
      .then((res) => res.json())
      .then((data) => data);
  };

  let arrayPokemon = [];

  for (let index = 1; index <= 300; index++) {
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
  useEffect(() => {
    localStorage.setItem('pokemons', JSON.stringify(arrayPokemon2));
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="container">
      <div className="content_search">
        <input
          className="inputsearch"
          type="text"
          placeholder="Search pokemon name"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>
      </div>
      <div className="title">
        <div className="contentcards">
          {arrayPokemon2
            .filter((item) => {
              if (searchTerm == '') {
                return item;
              } else if (
                item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
              ) {
                return item;
              }
            })
            .map((item, index) => {
              return (
                <div>
                  <Link
                    href={{
                      pathname: '/pokecard/[pokemon]',
                      query: { pokemon: item.name },
                    }}
                    key={item.id}
                  >
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
