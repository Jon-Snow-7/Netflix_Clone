const API_KEY = '20ac0341ec5b2096d68f9c473d7b5d69';
const BASE_URL = 'https://api.themoviedb.org/3';



const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXlhbmtiaGFrYXRAZ21haWwuY29tIiwicHJvZmlsZUlkIjoxMSwiaWF0IjoxNzQ5NDYzOTIwLCJleHAiOjE3NDk0OTk5MjB9.JWMrW6Ru-whCy_VZ3MTv38ln-wxez4SBhmYkP5dpuDQ",
  },
};

const options2 = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXlhbmtiaGFrYXRAZ21haWwuY29tIiwiaWF0IjoxNzQ5NDYzNzYxLCJleHAiOjE3NDk0OTk3NjF9.tGe8kSD-7QnqnEuin451g3j2sa1zkxNTDk9lFewhD3Q",
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

export const getProfiles = async () => {
  const response = await fetch(`http://localhost:8080/api/profiles`,options2);
  if (!response.ok) {
    throw new Error('Failed to fetch profiles');
  }
  return response.json();
};
