import React, { useState } from 'react'
import rightimg from "../assets/right-arrow.jpg"
import leftimg from "../assets/left-arrow-28.jpg"
const Carousel = () => {

  const sliderData = [
        {
          url: "https://wallpapers.com/images/featured/avengers-vm16xv4a69smdauy.jpg",
          title:"The Avengers",
          releaseyear: "2012",
          genre: "Action, Drama",
          rating: "IMDb: 8.0",
          plot: "Earth's  as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        },
        {
          url: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/medium/final-destination-bloodlines-et00432143-1746683831.jpg",
          title:"The Avengers",
          releaseyear: "2012",
          genre: "Action, Drama",
          rating: "IMDb: 8.0",
          plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        },
        {
          url: "https://wallpapers.com/images/featured/avengers-vm16xv4a69smdauy.jpg",
          title:"The Avengers",
          releaseyear: "2012",
          genre: "Action, Drama",
          rating: "IMDb: 8.0",
          plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        },
      ];
    
      const [next, setNext] = useState(0);
    
      const handlePrev = () => {
        setNext((prev) => (prev + sliderData.length - 1) % sliderData.length);
      };
      const handleNext = () => {
        setNext((prev) => (prev + 1) % sliderData.length);
      };

  return (
    <div>
      <div className="flex relative items-center top-0 max-h-max">
              <div className="left-arrow absolute left-10 top-[250px] cursor-pointer rounded-full  z-10" onClick={handlePrev}>
                <img
                  className="w-[80px] h-[80px]  rounded-full "
                  src={leftimg}
                  alt=""
                />
              </div>
      
              <div className="relative transition-transform duration-500 overflow-hidden" >
                <img className="h-[600px] w-screen " 
                src={sliderData[next].url} 
                alt="" 
                onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500";
        }}/>
      
                <div className="details absolute bottom-[10%] bg-black/70 max-w-max text-white font-extrabold text-xl pl-10">
                  <div className="flex gap-8">
                    <div className="releaseyear">{sliderData[next].releaseyear}</div>
                    <div className="genre">{sliderData[next].genre}</div>
                    <div className="rating">{sliderData[next].rating}</div>
                  </div>
                  <div className="plot max-w-[600px]">{sliderData[next].plot}</div>
                </div>
              </div>
      
              <div className="right-arrow absolute right-10 top-[250px] cursor-pointer rounded-full " onClick={handleNext}>
                <img
                  className="w-[80px] h-[80px] rounded-full "
                  src={rightimg}
                  alt=""
                />
              </div>
            </div>
    </div>
  )
}

export default Carousel
