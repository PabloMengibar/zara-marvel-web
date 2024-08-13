import { useState, useCallback } from 'react';
import { getCharacters } from '../services/api';

export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCharacters = useCallback(async (query = '') => {
    setIsLoading(true);
    try {
      const limit = query ? 100 : 50;
      const response = await getCharacters(0, limit, query);
      setCharacters(response.data.results);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { characters, isLoading, fetchCharacters };
};