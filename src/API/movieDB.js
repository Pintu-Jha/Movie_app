import axios from 'axios';
import {apiKey} from '../Utility/constants';

//endPoints

const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMovieEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMovieEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMovieEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMovieEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

//dynamic endpoints
const detailsMovieEndpoint = id =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const creditsMovieEndpoint = id =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMovieEndpoint = id =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// person
const personDetailsEndpoint = id =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const image500 = path =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path =>
  path ? 'https://image.tmdb.org/t/p/w185' + path : null;

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const respones = await axios.request(options);
    return respones.data;
  } catch (error) {
    console.log('error', error);
    return {};
  }
};
export const fetchTrendingMovies = () => {
  return apiCall(trendingMovieEndpoint);
};

export const fetchUpComingMovies = () => {
  return apiCall(upcomingMovieEndpoint);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMovieEndpoint);
};

export const fetchMoviesDetails = id => {
  return apiCall(detailsMovieEndpoint(id));
};
export const fetchMoviesCredits = id => {
  return apiCall(creditsMovieEndpoint(id));
};
export const fetchMoviesSimilar = id => {
  return apiCall(similarMovieEndpoint(id));
};

// person screen apis
export const fetchPersonDetails = id => {
  return apiCall(personDetailsEndpoint(id));
};
export const fetchPersonMovies = id => {
  return apiCall(personMoviesEndpoint(id));
};

export const searchMovie = params => {
  return apiCall(searchMovieEndpoint, params);
};
