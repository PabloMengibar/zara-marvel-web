import React, { useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCharacters } from '../hooks/useCharacters';
import { useFavorites } from '../context/FavoritesContext';
import ResultsDisplay from '../components/ResultsDisplay/ResultsDisplay';

const CharacterListPage = () => {
  const { characters, isLoading, fetchCharacters } = useCharacters();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const isShowingFavorites = location.search.includes('favorites=true');

  useEffect(() => {
    if (!isShowingFavorites) {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get('search') || '';
      fetchCharacters(query);
    }
  }, [location.search, fetchCharacters, isShowingFavorites]);

  const handleCharacterClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  const displayedCharacters = useMemo(() => {
    return isShowingFavorites ? favorites : characters;
  }, [isShowingFavorites, characters, favorites]);

  return (
    <div>
      <ResultsDisplay 
        isLoading={isLoading && !isShowingFavorites} 
        characters={displayedCharacters} 
        onCharacterClick={handleCharacterClick}
      />
    </div>
  );
};

export default CharacterListPage;
