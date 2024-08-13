import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isShowingFavorites = location.search.includes('favorites=true');

  return (
    <div className="app-layout">
      <Header />
      {isHomePage && <SearchBar showFavorites={isShowingFavorites} />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
