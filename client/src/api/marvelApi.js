import axios from 'axios';

export const getCharacters = async () => {
     return await axios.get('https://gateway.marvel.com:443/v1/public/characters?apikey=7527cdb472c1a0b944c6d4568f66e867');
}

export const searchCharacter = async (query) => {
     return await axios.get('https://gateway.marvel.com:443/v1/public/characters?nameStartsWith='+ query +'&apikey=7527cdb472c1a0b944c6d4568f66e867');
}
