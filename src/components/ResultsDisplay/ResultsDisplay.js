import React from 'react';
import CharacterList from '../CharacterList/CharacterList';
import './ResultsDisplay.css'; 
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const ResultsDisplay = ({ isLoading, characters, onCharacterClick }) => (
  isLoading ? (
    <LoadingSpinner/>
  ) : (
    <>
      <div className='wrapper-characters'>
        <p className="results-text">{characters.length} Results</p>
        <CharacterList characters={characters} onCharacterClick={onCharacterClick} />
      </div>
    </>
  )
);


export default ResultsDisplay;