import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import MovieModal from '../components/movieModal/MovieModal';
import { Swiper, SwiperSlide } from "swiper/react";
import '../components/Row.css';
// Import Swiper styles
import "swiper/css";

export default function Row({title, id, url, largeRow}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMovie, setModalMovie] = useState({});
  const fetchMovieData = async () => {
    const req = await axios.get(url);
    // console.log(req);
    setMovies(req.data.results);
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  const modalMovieOpen = (movie) => {
    setModalOpen(true);
    setModalMovie(movie);
    // console.log(modalMovie);
  }

  return (
    <section className='sec_row'>
      <h2 className='txt_title'>{title}</h2>
      <div className='wrap_slide'>
        <button type='button' onClick={() => {document.getElementById(id).scrollLeft -= window.innerWidth - 80}} className='btn_left'>
          <img src={require('../img/icon_left_arrow.png')} alt='' className='img_arrow img_left' />
        </button>
          <Swiper id={id} className={`wrap_contents ${largeRow && 'wrap_poster'}`} slidesPerView={6}>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/original/${largeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.title}
              onClick={() => modalMovieOpen(movie)}
              className={`img_backDrop ${largeRow && 'img_poster'}`}
              />
            </SwiperSlide>
          ))}
          </Swiper>
        <button type='button' onClick={() => {document.getElementById(id).scrollLeft += window.innerWidth - 80}} className='btn_right'>
          <img src={require('../img/icon_right_arrow.png')} alt='' className='img_arrow img_right' />
        </button>
      </div>
      {modalOpen && (<MovieModal {...modalMovie} modalOpen={modalOpen} setModalOpen={setModalOpen} />)}
    </section>
  )
}