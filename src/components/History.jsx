// components/History.jsx
import React, { useEffect, useState } from 'react';

import { useDispatch,useSelector } from 'react-redux';
import { historyData } from '../redux/slice/historySlice';
import MovieDetail from './MovieDetail';

const History = ({title="Watch History",size=40}) => {
  
  const dispatch=useDispatch();
  const historyState=useSelector((state)=>state.history);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
  
  useEffect(()=>{
    dispatch(historyData());
    console.log(historyData)
  },[dispatch])
  const history=historyState?.data?.results || [];

  return (
    <>
      
    </>
  );
};

export default History;
