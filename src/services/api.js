import md5 from 'md5';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY;
const API_PRIVATE_KEY = process.env.REACT_APP_API_PRIVATE_KEY;

export const getTimeStamp = () => Date.now().toString();

export const getHash = (timeStamp, privateKey, publicKey) => 
  md5(timeStamp + privateKey + publicKey);

export const getQuery = (injectedTimeStamp = null) => {
  const timeStamp = injectedTimeStamp || getTimeStamp();
  const hash = getHash(timeStamp, API_PRIVATE_KEY, API_PUBLIC_KEY);
  return `ts=${timeStamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;
};

export const getCharacters = async (offset = 0, limit = 50, nameStartsWith = '', injectedTimeStamp = null) => {
  const query = getQuery(injectedTimeStamp);
  const url = `${API_BASE_URL}/characters?${query}&offset=${offset}&limit=${limit}${nameStartsWith ? `&nameStartsWith=${nameStartsWith}` : ''}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getCharacterDetails = async (characterId, injectedTimeStamp = null) => {
  const query = getQuery(injectedTimeStamp);
  const url = `${API_BASE_URL}/characters/${characterId}?${query}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getCharacterComics = async (characterId, injectedTimeStamp = null) => {
  const query = getQuery(injectedTimeStamp);
  const url = `${API_BASE_URL}/characters/${characterId}/comics?${query}&orderBy=onsaleDate&limit=20`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};