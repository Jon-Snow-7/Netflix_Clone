import React, { useEffect } from 'react';
import MovieRow from './MovieRow'; 
import { useDispatch,useSelector } from 'react-redux';
import { popularData } from '../redux/slice/popularSlice';

const Popular = () => {
  const dispatch=useDispatch();
  const popularState=useSelector((state)=>state.popular)

  useEffect(() => {
    dispatch(popularData());
  }, [dispatch]);
  const popular=popularState?.data || [];
  console.log(popular);

  return (
    <MovieRow movies={popular} title="Popular Movies"  className="mb-8" />
  );
};

export default Popular;
