import React from 'react';
import Image from 'next/image';
import style from './card.module.css';

const card = ({ item }) => {
  let type = item.type[0].type.name;
  let type2 = item.type[1]?.type.name;

  type2 === undefined ? '' : type2;

  console.log(type);
  return (
    <div className={`${style.pokecard} ${type} hvr-float-shadow`}>
      <h3 className={style.title}>{item.name}</h3>
      <span className={`${style.imgspan} ${type2}`}>
        <img className={style.img} src={item.img}></img>
      </span>
      <span className={`${style.span} ${type}`}></span>
      <p className={style.text}> {type}</p>
    </div>
  );
};

export default card;
