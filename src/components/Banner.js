import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import requests from '../api/requests';
import styled from 'styled-components';
import './Banner.css';

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const fetchData = async () => {
    const req = await axios.get(requests.fetchNowPlaying);
    const movieId = req.data.results[
      Math.floor(Math.random() * req.data.results.length)
    ].id
    const movieDetail = await axios.get(`movie/${movieId}`, {
      params: {append_to_response: 'videos'},
    })

    setMovie(movieDetail.data);
  }

  useEffect(() => {
    fetchData();
  },[]);

  const [clicked, setClicked] = useState(false);
  if (!clicked) {
    return (
      <section
        className='sec_banner'
        style={{backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`}}
      >
        <h2 className='txt_hide'>현재 상영중인 영화 정보 목록</h2>
        <div className='wrap_contents'>
          <strong className='txt_title'>{movie.title || movie.original_title || movie.name}</strong>
          <div className='wrap_btn'>
            <button type='button' className='btn_banner btn_play' onClick={() => setClicked(true)}>PLAY</button>
            <button type='button' className='btn_banner btn_more'>More Information</button>
          </div>
          <p className='txt_overview'>{movie.overview}</p>
        </div>
        <div className='sec_fade'></div>
      </section>
    )
  } else {
    return (
      <Container>
        <HomeContainer>
          {movie.videos.results.length === 0 ? 
          <NonIframe>
            <NonIframeTxt>해당하는 영화의 영상 정보가 없습니다.</NonIframeTxt>
          </NonIframe> :
          <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playList=${movie.videos.results[0].key}`}
            width='640'
            height='360'
            title='Youtube Video Player'
            allow='autoplay; fullscreen'
          ></Iframe>
          }
        </HomeContainer>
      </Container>
    )
  }
}
// movie.videos.results.length = 0 인 경우
const NonIframe = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #111;
`
const NonIframeTxt = styled.strong`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  color: #5e5e5e;
`

const Iframe = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: .85;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: center;
  width: 100%;
  height: 100vh;
`
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`