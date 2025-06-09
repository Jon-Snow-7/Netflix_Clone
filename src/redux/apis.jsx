const API_KEY = '9908b852951e7ca6dd735fa8b567a5d1';
const BASE_URL = 'https://api.themoviedb.org/3';



const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZXZqeW90aTU5OEBnbWFpbC5jb20iLCJwcm9maWxlSWQiOjUsImlhdCI6MTc0OTQ0NzExNCwiZXhwIjoxNzQ5NDgzMTE0fQ.1GUJzzPXhHjQxMq6alnX9B5gadZibCi_2BFtDNud9TQ",
  },
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
  const response = await fetch(`http://localhost:8080/api/movies/sort/rating/desc`,options);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
    // console.log(response)
  return response.json();
};

export const historyMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
};
