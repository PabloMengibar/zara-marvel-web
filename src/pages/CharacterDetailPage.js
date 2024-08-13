import React from 'react';
import { useParams } from 'react-router-dom';
import { useCharacterDetails } from '../hooks/useCharacterDetails';
import { CharacterInfo } from '../components/CharacterInfo/CharacterInfo';
import { ComicsList } from '../components/ComicsList/ComicsList';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const CharacterDetailPage = () => {
  const { id } = useParams();
  const { character, comics, isLoading } = useCharacterDetails(id);

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="character-detail-page">
      {character && (
        <>
          <CharacterInfo character={character} />
          <ComicsList comics={comics} />
        </>
      )}
    </div>
  );
};

export default CharacterDetailPage;