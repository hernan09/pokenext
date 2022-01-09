import React from 'react';
import Image from 'next/image';
import style from './card.module.css';

const card = ({ item }) => {
  let type = item.type[0].type.name;
  let type2 = item.type[1]?.type.name;
  console.log(type);
  return (
    <div className={`${style.pokecard} ${type}`}>
      <h3>{item.name}</h3>
      <img className={style.img} src={item.img}></img>
      <span className={`${style.span} ${type}`}>{type}</span>
    </div>
  );
};

export default card;
