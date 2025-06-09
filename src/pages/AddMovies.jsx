import React, { useState, useRef } from 'react';
import SideBarAdmin from "../components/SideBarAdmin";
import Footer from '../components/Footer';
import { addMovie } from '../redux/apis';

const AddMovies = () => {
  const [movie, setMovie] = useState({
    name: '',
    releaseDate: '',
    runtime: '',
    genres: [],
    description: '',
    rating: '',
    actors: [],
    poster: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const [genreError, setGenreError] = useState(false);

  const [actorError, setActorError] = useState(false);

  const [actorInput, setActorInput] = useState('');

  const genreRef = useRef(null);

  const actorRef = useRef(null);

  const genreList = [
  'Action', 'Adventure', 'Sci-Fi', 'Drama', 'Crime', 'Thriller', 'Romance',
  'Fantasy', 'Animation', 'Comedy', 'Family', 'Biography', 'War', 'History',
  'Music', 'Western', 'Mystery', 'Horror'
];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

    const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setMovie((prev) => {
      const genres = checked
        ? [...prev.genres, value]
        : prev.genres.filter((g) => g !== value);
      return { ...prev, genres };
    });
  };


  const addActor = () => {
    if (actorInput.trim()) {
      setMovie({ ...movie, actors: [...movie.actors, actorInput.trim()] });
      setActorInput('');
    }
  };

  const removeActor = (index) => {
  setMovie((prevMovie) => ({
    ...prevMovie,
    actors: prevMovie.actors.filter((_, i) => i !== index)
    }));
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (movie.genres.length === 0) {
    setGenreError(true);
    genreRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  } else {
    setGenreError(false);
  }

  if (movie.actors.length === 0) {
    setActorError(true);
    actorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  } else {
    setActorError(false);
  }
  
  const formattedRuntime = `${movie.runtime} min`;

  const movieDTO = {
    movieName: movie.name,
    releaseDate: movie.releaseDate,
    runTime: formattedRuntime,
    description: movie.description,
    rating: parseFloat(movie.rating),
    actorList: movie.actors,
    moviePoster: movie.poster,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    updatedBy: 1,
    genre: movie.genres
  };

  try {
    const res = await addMovie(movieDTO);
    console.log("Movie added:", res);

    setMovie({
      name: '',
      releaseDate: '',
      runtime: '',
      genres: [],
      description: '',
      rating: '',
      actors: [],
      poster: '',
    });
    setActorInput('');
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 3000);
  } catch (error) {
    alert("Something went wrong while adding the movie.");
  }
};


  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
        <div className=" fixed top-0 left-0 h-screen  z-50">
        <SideBarAdmin />
        </div>
      <div className="flex flex-1 justify-center items-center pt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1c1c1e] p-10 rounded-2xl shadow-2xl w-full max-w-3xl space-y-6"
        >
          <h2 className="text-3xl font-semibold text-center mb-4">🎬 Add New Movie</h2>

          <div>
            <label className="block mb-1">🎥 Movie Name</label>
            <input
              type="text"
              name="name"
              value={movie.name}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
              required
            />
          </div>

        <div className="flex space-x-4">
            <div className="flex-1">
                <label className="block mb-1">📅 Release Date</label>
                <input
                type="date"
                name="releaseDate"
                value={movie.releaseDate}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white p-2 rounded"
                required
                />
            </div>

            <div className="flex-1">
                <label className="block mb-1">⏱️ Runtime (in minutes)</label>
                <input
                type="number"
                name="runtime"
                value={movie.runtime}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white p-2 rounded"
                placeholder="e.g. 120"
                required
                />
            </div>
        </div>


          <div ref={genreRef}>
            <label className="block mb-1">🎭 Genre</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {genreList.map((genre) => (
                <label key={genre} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={genre}
                    checked={movie.genres.includes(genre)}
                    onChange={handleGenreChange}
                  />
                  {genre}
                </label>
              ))}
            </div>
            {genreError && (
                <p className="text-red-500 text-sm mt-1 pt-2">Please select at least one genre.</p>
            )}
          </div>


          <div>
            <label className="block mb-1">📝 Movie Description (max 100 words)</label>
            <textarea
              name="description"
              value={movie.description}
              onChange={handleChange}
              maxLength="600"
              rows="4"
              className="w-full bg-gray-800 text-white p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">👨‍🎤 Actors</label>
            <div className="flex space-x-2">
                <input
                type="text"
                value={actorInput}
                onChange={(e) => setActorInput(e.target.value)}
                className="flex-grow bg-gray-800 text-white p-2 rounded"
                />
                <button
                type="button"
                onClick={addActor}
                className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
                >
                Add
                </button>
            </div>
            {actorError && (
                <p className="text-red-500 text-sm mt-1 pt-2">Please add at least one actor.</p>
            )}

            <div className="mt-2 flex flex-wrap gap-2">
                {movie.actors.map((actor, idx) => (
                <div key={idx} className="relative bg-gray-700 px-3 py-1 rounded text-white">
                    <span>{actor}</span>
                    <button
                    type="button"
                    onClick={() => removeActor(idx)}
                    className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center leading-none"
                    >
                    ✕
                    </button>
                </div>
                ))}
            </div>
            </div>


        <div className="flex space-x-4">
            <div className="flex-1">
                <label className="block mb-1">⭐ Rating (out of 10)</label>
                <input
                type="number"
                name="rating"
                value={movie.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                className="w-full bg-gray-800 text-white p-2 rounded"
                placeholder="e.g. 7.5"
                required
                />
            </div>

            <div className="flex-1">
                <label className="block mb-1">🖼 Poster Link</label>
                <input
                type="url"
                name="poster"
                value={movie.poster}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white p-2 rounded"
                required
                />
            </div>
        </div>


          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
        {showPopup && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 w-72">
            🎉 Movie added successfully!

            {/* Progress Bar */}
            <div className="mt-2 h-1 w-full bg-green-800 rounded overflow-hidden">
            <div className="h-full bg-white animate-progress-bar" />
            </div>
        </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AddMovies;
