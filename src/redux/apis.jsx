const API_KEY = '20ac0341ec5b2096d68f9c473d7b5d69';
const BASE_URL = 'https://api.themoviedb.org/3';



const options = {
  // method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZXZqeW90aTU5OEBnbWFpbC5jb20iLCJwcm9maWxlSWQiOjUsImlhdCI6MTc0OTIwNjM3NCwiZXhwIjoxNzQ5MjQyMzc0fQ.uA2zl2i51TM23Qx8c_9-suKzRr1kdDwY-PfKD-KzSz4",
  },
};

export const addMovie = async (movieData) => {
  try {
    const response = await fetch('http://localhost:8080/api/movies', {
      method: 'POST',
      body: JSON.stringify(movieData)
    }, options);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Backend error:', errorData);
      throw new Error(errorData.message || 'Failed to add movie');
    }

    return response.json();
  } catch (error) {
    console.error('Error while adding movie:', error.message);
    throw error;
  }
};

export const recommendationMovies = async () => {
  const response = await fetch(`http://localhost:8080/api/movies`,options);
  if (!response.ok) {
    throw new Error('Failed to fetch recommendation movies');
  }
  return  response.json();
};

export const latestMovies = async () => {
  const response = await fetch(`http://localhost:8080/api/movies/sort/releaseDate/desc`,options);
  if (!response.ok) {
    throw new Error('Failed to fetch latest movies');
  }
  return response.json();
};


export const popularMovies = async () => {
  const response = await fetch(`http://localhost:8080/api/movies/sort/rating/desc`,options);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return  response.json();
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
