import React from 'react';
import Image from 'next/image';
import style from './pokemon.module.css';
import Link from 'next/link';

export async function getStaticPaths() {
  const traerPokemon = (numero) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
      .then((res) => res.json())
      .then((data) => data);
  };

  let arrayPokemon = [];

  for (let index = 1; index <= 2; index++) {
    let datapokemon = await traerPokemon(index);
    arrayPokemon.push(datapokemon);
  }

  let paths = arrayPokemon.map((pokemon) => {
    return {
      params: {
        pokemon: pokemon.name.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  const id = context.params.pokemon;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await res.json();

  return {
    props: {
      pokemon,
    },
  };
};

const cardPokemon = ({ pokemon }) => {
  let type = pokemon.types?.[0]?.type?.name;
  let type2 = pokemon.types?.[1]?.type?.name;
  let habiliti = pokemon?.abilities?.[0]?.ability?.name;
  let habiliti2 = pokemon?.abilities?.[1]?.ability?.name;

  return (
    <div className={`${style.main} ${type}`}>
      <Link
        href={{
          pathname: '/',
        }}
      >
        <a>
          <button className={style.back}>VOLVER</button>
        </a>
      </Link>

      <h1 className={style.title}>{pokemon.name}</h1>
      <img
        className={style.imgencard}
        src={pokemon.sprites.other.dream_world.front_default}
      ></img>
      <div className={`${style.subdiv} ${type2}`}></div>
      <div className={style.contentspan}>
        <span className={`${style.tipo1} ${type}`}>{type}</span>
        <span className={`${style.tipo2} ${type2}`}>{type2}</span>
        <h3 className={style.title}>
          HABILITIES
          <div className={style.habilitis}>
            <span className={style.habiliti}>{habiliti}</span>
            <span className={style.habiliti}>{habiliti2}</span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default cardPokemon;
