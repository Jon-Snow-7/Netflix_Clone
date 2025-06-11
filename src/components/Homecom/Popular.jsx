import React, { useEffect } from 'react';
import MovieRow from '../Rows/MovieRow'; 
import { useDispatch,useSelector } from 'react-redux';
import { popularData } from '../../redux/slice/popularSlice';

const Popular = () => {
  const dispatch=useDispatch();
  const popularState=useSelector((state)=>state.popular)
  const popular = popularState?.data?.content || [];

  useEffect(() => {
    if(!popular || popular.length==0 )dispatch(popularData());
  }, [dispatch]);
  // console.log(popular);

  return (
    <MovieRow movies={popular} title="Popular Movies"  className="mb-8" />
  );
};

export default Popular;
