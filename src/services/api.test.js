import * as api from './api';

  describe('API Service', () => {
    const fixedTimestamp = '1723540976234';
    const publicKey = process.env.REACT_APP_API_PUBLIC_KEY;
    const privateKey = process.env.REACT_APP_API_PRIVATE_KEY;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch characters with correct query parameters', async () => {
    const mockResponse = {
      data: {
        results: [],
      },
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const offset = 10;
    const limit = 20;
    const nameStartsWith = 'Spider';
    const characters = await api.getCharacters(offset, limit, nameStartsWith, fixedTimestamp);

    const expectedHash = api.getHash(fixedTimestamp, privateKey, publicKey);
    const expectedUrl = `https://gateway.marvel.com/v1/public/characters?ts=${fixedTimestamp}&apikey=${publicKey}&hash=${expectedHash}&offset=10&limit=20&nameStartsWith=Spider`;

    expect(fetch).toHaveBeenCalledWith(expectedUrl);
    expect(characters).toEqual(mockResponse);
  });

  it('should fetch character details with correct query parameters', async () => {
    const characterId = 1011334;
    const mockResponse = {
      data: {
        results: [],
      },
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const characterDetails = await api.getCharacterDetails(characterId, fixedTimestamp);

    const expectedHash = api.getHash(fixedTimestamp, privateKey, publicKey);
    const expectedUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${fixedTimestamp}&apikey=${publicKey}&hash=${expectedHash}`;

    expect(fetch).toHaveBeenCalledWith(expectedUrl);
    expect(characterDetails).toEqual(mockResponse);
  });

  it('should fetch character comics with correct query parameters', async () => {
    const characterId = 1011334;
    const mockResponse = {
      data: {
        results: [],
      },
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const characterComics = await api.getCharacterComics(characterId, fixedTimestamp);

    const expectedHash = api.getHash(fixedTimestamp, privateKey, publicKey);
    const expectedUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=${fixedTimestamp}&apikey=${publicKey}&hash=${expectedHash}&orderBy=onsaleDate&limit=20`;

    expect(fetch).toHaveBeenCalledWith(expectedUrl);
    expect(characterComics).toEqual(mockResponse);
  });

  it('should throw an error if network response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(api.getCharacters()).rejects.toThrowError('Network response was not ok');
  });
});