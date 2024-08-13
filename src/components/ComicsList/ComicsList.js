import React from 'react';
import './ComicsList.css'; 

export const ComicsList = ({ comics, isLoading }) => {
  if (isLoading) return <div>Loading comics...</div>;

  const getYearFromDate = (dateString) => new Date(dateString).getFullYear();

  return (
    <div className="comics-section">
      <h2 className='comics-title'>Comics</h2>
      {comics.length === 0 ? (
        <p>No comics found</p>
      ) : (
        <>
          <div className="comics-list">
            {comics.map((comic) => {
              const onsaleDate = comic.dates.find(date => date.type === 'onsaleDate');
              const year = onsaleDate ? getYearFromDate(onsaleDate.date) : 'Unknown';

              return (
                <div key={comic.id} className="comic-item">
                  <img 
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                    alt={comic.title} 
                    className="comic-image"
                  />
                  <div className="comic-info">
                  <h3 className="comic-title">{comic.title}</h3>
                  <p className="comic-year">{year}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
