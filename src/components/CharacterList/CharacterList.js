import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import './CharacterList.css';

const CharacterList = ({ characters, onCharacterClick }) => {
  return (
      <div className="character-list">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => onCharacterClick(character.id)}
          />
        ))}
      </div>
  );
};
export default CharacterList;