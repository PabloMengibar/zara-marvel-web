import React from 'react';
import './CharacterCard.css'; 
import FavoriteButton from '../FavoriteButton/FavoriteButton';

const CharacterCard = ({ character, onClick }) => {
  return (
    <div className="character-card" onClick={onClick}>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="character-card-image"
      />
      <div className="character-card-info">
        <h3>{character.name}</h3>
        <FavoriteButton character={character} />
      </div>
    </div>
  );
};

export default CharacterCard;
