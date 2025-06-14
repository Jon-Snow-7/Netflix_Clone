import React from "react";
import { useNavigate } from "react-router-dom";
// Import images
import img1 from "../../assets/romance.webp";
import img2 from "../../assets/drama.webp";
import img3 from "../../assets/comedy.webp";
import img4 from "../../assets/action.webp";
import img5 from "../../assets/horror.webp";
import img6 from "../../assets/thriller.webp";
import img7 from "../../assets/adventure.webp";
import img8 from "../../assets/scifi.webp";
// Genre names
const genres = [
  "Romance",
  "Drama",
  "Comedy",
  "Action",
  "Horror",
  "Thriller",
  "Adventure",
  "Scifi",
];
// Corresponding images (same order as genres)
const genreImages = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function GenreList() {
  const navigate = useNavigate();

  const handleClick = (genre) => {
    navigate(`/genre/${genre.toLowerCase()}`);
  };

  return (
    <div className="w-full overflow-x-auto py-4 no-scrollbar">
      {/* <div className="px-4 mb-2">
        <p className="text-xl font-semibold">Movies Based on Genres</p>
      </div> */}
      <div className="flex space-x-4 px-0 flex-col">
        <div className="flex gap-4 scrollbar-hide no-scrollbar ">
          {genres.map((genre, index) => (
            <div
              key={genre}
              onClick={() => handleClick(genre)}
              className="sm:pl-5 cursor-pointer no-scrollbar scrollbar-hide min-w-[400px] max-sm:min-w-[250px] overflow-visible shadow-md sm:hover:shadow-lg transition-transform sm:hover:scale-120"
            >
              <img
                src={genreImages[index]}
                alt={genre}
                className="w-full scrollbar-hide h-56 max-sm:h-35 object-cover rounded-3xl"
              />
              {/* <div className="text-center bg-white py-2 font-medium capitalize">
                {genre}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

