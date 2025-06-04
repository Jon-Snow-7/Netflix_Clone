const API_KEY = '20ac0341ec5b2096d68f9c473d7b5d69';
const BASE_URL = 'https://api.themoviedb.org/3';

export const continueMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
};

export const historyMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
};

export const popularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
};



export const latestMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
};

export const recentMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
};

export const watchlistMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
};

export const recommendationMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
};