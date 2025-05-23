import React from 'react';
import { Carousel } from 'primereact/carousel';

const ContinueWatching = () => {
  const movies = [
    {
      title: "The Avengers",
      url: "https://wallpapers.com/images/featured/avengers-vm16xv4a69smdauy.jpg",
    },
    {
      title: "Final Destination",
      url: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/medium/final-destination-bloodlines-et00432143-1746683831.jpg",
    },
    {
      title: "More Avengers",
      url: "https://wallpapers.com/images/featured/avengers-vm16xv4a69smdauy.jpg",
    },
  ];

  const movieTemplate = (movie) => {
    return (
      <div className="border-round m-2 p-2" style={{ textAlign: 'center' }}>
        <img src={movie.url} alt={movie.title} className="w-full h-56 object-cover rounded-md" />
        <h4 className="text-white mt-2">{movie.title}</h4>
      </div>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={movies}
        itemTemplate={movieTemplate}
        numVisible={3}
        numScroll={1}
        circular
        autoplayInterval={3000}
        showIndicators={false} 
        className='w-[99%] p-2'
      />
    </div>
  );
};

export default ContinueWatching;
