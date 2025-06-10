const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXlhbmsyYmhha2F0QGdtYWlsLmNvbSIsInByb2ZpbGVJZCI6MjUsImlhdCI6MTc0OTUzODU3NywiZXhwIjoxNzQ5NTc0NTc3fQ.j7iUVKchMDLHWrn9hPrnUIuGSX59JEBuGDjrlnvlXso",
  },
};

const options_profile= {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZXZqeW90aTU5OEBnbWFpbC5jb20iLCJpYXQiOjE3NDk1NDY0ODcsImV4cCI6MTc0OTU4MjQ4N30.VJIMY-UkAxA4LR10LpWkkdRc-Taof37MG1UCCYEQLzM",
  },
};



const options_post = {
  method: "POST",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXlhbmsyYmhha2F0QGdtYWlsLmNvbSIsInByb2ZpbGVJZCI6MjUsImlhdCI6MTc0OTUzODU3NywiZXhwIjoxNzQ5NTc0NTc3fQ.j7iUVKchMDLHWrn9hPrnUIuGSX59JEBuGDjrlnvlXso",
  },
};

const options_delete = {
  method: "DELETE",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXlhbmsyYmhha2F0QGdtYWlsLmNvbSIsInByb2ZpbGVJZCI6MjUsImlhdCI6MTc0OTUzODU3NywiZXhwIjoxNzQ5NTc0NTc3fQ.j7iUVKchMDLHWrn9hPrnUIuGSX59JEBuGDjrlnvlXso",
  },
};

// src/redux/apis.js
export const genreMovies = async (genreId, page = 0) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/genre/${genreId}?page=${page}&size=12`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch paginated genre movies");
  }
  return response.json();
};

export const getMovieById = async (id) => {
  const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
    // throw new Error("Failed to fetch movie");
  }

  const data = await response.json();
  data.id = id; // add or override the id property
  return data;
};

export const watchlistMoviesPost = async (movie_id) => {
  const response = await fetch(
    `http://localhost:8080/api/watchlist/${movie_id}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
    // throw new Error("Failed to fetch popular movies");
  }
  return response.json();
};

export const watchlistMoviesDelete = async (movie_id) => {
  const response = await fetch(
    `http://localhost:8080/api/watchlist/${movie_id}`,
    {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  console.log("no");
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
    // throw new Error("Failed to fetch popular movies");
  }
  return response.json();
};

// export const watchlistMoviesDelete = async () => {
//   const response = await fetch(`http://localhost:8080/api/watchlist/`,options_delete);
//   if (!response.ok) {
//     throw new Error('Failed to fetch popular movies');
//   }
//   return response.json();
// };

export const searchMoviesApi = async (
  query,
  genre,
  ratingMin,
  ratingMax,
  page = 1
) => {
  const url = new URL("http://localhost:8080/api/search");
  const sanitizedQuery = query.replace(/[^\w\s]/gi, " ").trim();
  url.searchParams.append("q", sanitizedQuery);
  url.searchParams.append("genre", genre);
  url.searchParams.append("ratingMin", ratingMin);
  url.searchParams.append("ratingMax", ratingMax);
  url.searchParams.append("page", page);
  url.searchParams.append("size", 20); // Set default page size

  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Search failed");
  return await res.json();
};

export const addMovie = async (movieData) => {
  try {
    const response = await fetch("http://localhost:8080/api/movies", {
      ...{
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }, // reuse Authorization and accept headers
      method: "POST",
      headers: {
        ...{
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }.headers,
        "Content-Type": "application/json", // add this for POST
      },
      body: JSON.stringify(movieData),
      // body: JSON.stringify(movieData),
    });

    if (!response.ok) {
      const text = await response.text(); // fallback to raw text
      console.error("Backend error response:", text);
      throw new Error("Failed to add movie");
      // console.error("Backend error response:", text);
      // throw new Error("Failed to add movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error while adding movie:", error.message);
    console.error("Error while adding movie:", error.message);
    throw error;
  }
};

export const recommendationMovies = async () => {
  const response = await fetch(`http://localhost:8080/api/movies`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch recommendation movies");
    // throw new Error("Failed to fetch recommendation movies");
  }
  return response.json();
  // return response.json();
};

export const trendingMovies = async () => {
  const MAX_ID = 150;
  let uniqueIds = [];

  // 🔍 Load from localStorage if available
  const storedIds = localStorage.getItem(UNIQUE_ID_KEY);
  if (storedIds) {
    uniqueIds = JSON.parse(storedIds);
  } else {
    // 🆕 Generate 10 unique random IDs
    const idSet = new Set();
    while (idSet.size < 10) {
      const id = Math.floor(Math.random() * MAX_ID) + 1;
      idSet.add(id);
    }

    uniqueIds = [...idSet];
    localStorage.setItem(UNIQUE_ID_KEY, JSON.stringify(uniqueIds));
  }

  // 🎬 Fetch movies by ID
  const trendMovies = [];
  for (const id of uniqueIds) {
    const movie = await getMovieById(id);
    trendMovies.push(movie);
  }

  // console.log("Trending IDs:", uniqueIds);
  return trendMovies;
};
const UNIQUE_ID_KEY = "trending_movie_ids";
// Optional: to manually reset
export const resetTrendingIds = () => {
  localStorage.removeItem(UNIQUE_ID_KEY);
};

export const latestMovies = async () => {
  const response = await fetch(`http://localhost:8080/api/movies/recent`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch latest movies");
    // throw new Error("Failed to fetch latest movies");
  }
  return response.json();
};

export const watchlistMovies = async () => {
  const response = await fetch(`http://localhost:8080/api/watchlist`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
    // throw new Error("Failed to fetch popular movies");
  }
  return response.json();
};

export const historyMoviesPost = async (movie_id) => {
  const response = await fetch(
    `http://localhost:8080/api/history/${movie_id}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
    // throw new Error("Failed to fetch popular movies");
  }
  return response.json();
};

export const historyMovies = async () => {
  const response = await fetch(`http://localhost:8080/api/history`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
    // throw new Error("Failed to fetch popular movies");
  }
  return response.json();
};

export const popularMovies = async () => {
  const response = await fetch(`http://localhost:8080/api/movies/popular`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  return response.json();
};

export const recentMovies = async () => {
  const response = await fetch(`http://localhost:8080/api/recent`,options);
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  return response.json();
};

export const continueMovies = async () => {
  const response = await fetch(
    `http://localhost:8080/api/movies/sort/rating/desc`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  // console.log(response)
  return response.json();
};

export const isInWatchlist = async (movie_id) => {
  const response = await fetch(
    `http://localhost:8080/api/watchlist/check/${movie_id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to check watchlist status");
  }
  return response.json(); // returns true or false
};

export const getProfiles = async () => {
  const response = await fetch(`http://localhost:8080/api/profiles`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch profiles");
  }
  return response.json();
};

export const createProfile = async (profileData) => {
  try {
    const response = await fetch(`http://localhost:8080/api/profiles`, {
      method: "POST",
      headers: {
        ...{
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }.headers, // reuse Authorization and Accept headers
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Profile creation error:", errorText);
      throw new Error("Failed to create profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createProfile:", error.message);
    throw error;
  }
};

// Update profile
export const updateProfile = async (profileId, profileData) => {
  const response = await fetch(
    `http://localhost:8080/api/profiles/${profileId}`,
    {
      ...{
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
      method: "PUT",
      headers: {
        ...{
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("Failed to update profile:", err);
    throw new Error("Update failed");
  }

  return response.json();
};

// Delete profile
export const deleteProfile = async (profileId) => {
  const response = await fetch(
    `http://localhost:8080/api/profiles/${profileId}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("Failed to delete profile:", err);
    throw new Error("Delete failed");
  }
};
