const API_KEY = '9908b852951e7ca6dd735fa8b567a5d1';
const BASE_URL = 'https://api.themoviedb.org/3';



const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZXZqeW90aTU5OEBnbWFpbC5jb20iLCJwcm9maWxlSWQiOjUsImlhdCI6MTc0OTQ0NTY2NCwiZXhwIjoxNzQ5NDgxNjY0fQ.z6BigMOB3SQv-aNmIIMbJHJBA8HNJONTWqLqEdZXJ_U",
  },
};

// src/redux/apis.js
export const genreMovies = async (genreId, page = 0) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/genre/${genreId}?page=${page}&size=12`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch paginated genre movies");
  }
  return response.json();
};


export const searchMoviesApi = async (query, genre, ratingMin, ratingMax, page = 1) => {
  const url = new URL("http://localhost:8080/api/search");
  const sanitizedQuery = query.replace(/[^\w\s]/gi, " ").trim();
  url.searchParams.append("q", sanitizedQuery);
  url.searchParams.append("genre", genre);
  url.searchParams.append("ratingMin", ratingMin);
  url.searchParams.append("ratingMax", ratingMax);
  url.searchParams.append("page", page);
  url.searchParams.append("size", 20); // Set default page size

  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Search failed");
  return await res.json();
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
