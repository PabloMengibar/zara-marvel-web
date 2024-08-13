import { useState, useEffect } from 'react';
import { getCharacterDetails, getCharacterComics } from '../services/api';

export const useCharacterDetails = (id) => {
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [characterResponse, comicsResponse] = await Promise.all([
          getCharacterDetails(id),
          getCharacterComics(id)
        ]);
        setCharacter(characterResponse.data.results[0]);
        setComics(comicsResponse.data.results);
      } catch (error) {
        console.error('Error fetching character data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { character, comics, isLoading };
};