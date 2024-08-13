import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import './FavoriteButton.css'; 

const FavoriteButton = ({ character, className = '' }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const toggleFavorite = (e) => {
    e.stopPropagation(); 
    if (isFavorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <button onClick={toggleFavorite} className={`favorite-button ${className}`}>
      <FavoriteIcon isFavorite={isFavorite} className={className}/>
    </button>
  );
};

export default FavoriteButton;