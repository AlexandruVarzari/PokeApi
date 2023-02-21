import React, { useState } from "react";

const PokeThumbnail = ({
  id,
  name,
  image,
  type,
  stat1,
  stat2,
  stat3,
  stat4,
  stat5,
  stat6,
}) => {
  const stylePoke = `thumb-style ${type}`;
  const [show, setShow] = useState(false);

  return (
    <div className={stylePoke}>
      <div className="numberPoke">
        <small>0{id}</small>
      </div>
      <img src={image} alt={name} />
      <div className="poke-info">
        <h2>{name}</h2>

        <button className="poke-btn" onClick={() => setShow(!show)}>
          {show === true ? (
            <>
              <p> type: {type}</p>
              <p> hp: {stat1}</p>
              <p> attack: {stat2}</p>
              <p> defense: {stat3}</p>
              <p> special-attack: {stat4}</p>
              <p> special-defense: {stat5}</p>
              <p> speed: {stat6}</p>
            </>
          ) : (
            "pokeInfo"
          )}
        </button>
      </div>
    </div>
  );
};

export default PokeThumbnail;
