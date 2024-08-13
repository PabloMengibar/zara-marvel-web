import React from 'react';
import  FavoriteButton  from '../FavoriteButton/FavoriteButton';
import './CharacterInfo.css';

export const CharacterInfo = ({ character }) => (
  <div className='wrapper-character'>
  <div className="character-info">
    <img 
      src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
      alt={character.name} 
      className="character-image"
    />
    <div className="character-details">
      <div className="character-header">
        <h1 className="character-name">{character.name}</h1>
        <FavoriteButton character={character} className="favorites-toggle-detail"/>
      </div>
      <p className="character-description">
        {character.description || 'No description available.'}
      </p>
    </div>
  </div>
  </div>
);
