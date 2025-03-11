import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});
export interface Pokemon {
  name: string;
  url: string;
}
export interface PokemonDetails {
  id: number;
  name: string;
  sprites:{
    front_default: string;
  };
  types :Array<{
    type:{
        name:string;
    }
  }>;
}

// все покемоны

export const getPokemons = async():Promise <Pokemon[]> => {
    const response = await api.get('pokemon?limit=50');
    return response.data.results;
};

// запрос деталей покемона

export const getPokemonsDetails = async (url: string): Promise <PokemonDetails> => {
    const response = await api.get(url);
    return response.data;
}