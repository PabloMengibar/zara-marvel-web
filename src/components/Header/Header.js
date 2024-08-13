import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import logo from '../../assets/img/marvel_logo.png';
import './Header.css'; 
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';

const Header = () => {
  const { favorites } = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();

  const isShowingFavorites = location.search.includes('favorites=true');

  const toggleFavorites = () => {
    if (isShowingFavorites) {
      navigate('/');
    } else {
      navigate('/?favorites=true');
    }
  };
  const goToHomePage = () => {
    navigate('/');
  };

 return (
    <header className="header">
      <img src={logo} alt="Marvel Logo" className="logo" onClick={goToHomePage}/>
      <nav>
        <button onClick={toggleFavorites} className="favorites-toggle">
          <FavoriteIcon className="heart-icon" />
          <span className='favorites-count'>{favorites.length}</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
