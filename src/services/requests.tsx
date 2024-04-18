import axios from 'axios';

const POKEFIT_API_URL = 'https://site-j44gulea5a-uc.a.run.app'
const POKEAPI_SVG='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world'

const api = axios.create({
  baseURL: POKEFIT_API_URL,
});

const pokeApiSvg = axios.create({
  baseURL: POKEAPI_SVG,
  responseType: 'blob',
});

export const requestData = async (endpoint: string) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestSvg = async (endpoint: string) => {
  const { data } = await pokeApiSvg.get(endpoint);
  const imageUrl = URL.createObjectURL(data);
  return imageUrl;
};

export default api;
