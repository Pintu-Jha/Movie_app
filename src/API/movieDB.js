import axios from 'axios';
import {apiKey} from '../Utility/constants';

//endPoints

const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMovieEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMovieEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMovieEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMovieEndpoint1 = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

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

// fallback images
export const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

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
export const fetchTrendingMovies = (params) => {
  return apiCall(trendingMovieEndpoint,params);
};

export const fetchUpComingMovies = (params) => {
  return apiCall(upcomingMovieEndpoint,params);
};

export const fetchTopRatedMovies = (params) => {
  return apiCall(topRatedMovieEndpoint,params);
};

export const fetchMoviesDetails = id => {
  return apiCall(detailsMovieEndpoint(id));
};
export const fetchMoviesCredits = id => {
  return apiCall(creditsMovieEndpoint(id));
};
export const fetchMoviesSimilar = (id) => {
  return apiCall(similarMovieEndpoint(id));
};

// person screen apis
export const fetchPersonDetails = id => {
  return apiCall(personDetailsEndpoint(id));
};
export const fetchPersonMovies = id => {
  return apiCall(personMoviesEndpoint(id));
};

 export const searchMovies = params => {
    return apiCall(searchMovieEndpoint1, params);
  };


// const searchMovie1 = params => {
//   return apiCall(searchMovieEndpoint1, params);
// };
// const searchMovie2 = params => {
//   return apiCall(searchMovieEndpoint2, params);
// };
// const searchMovie3 = params => {
//   return apiCall(searchMovieEndpoint3, params);
// };

// export const searchMovies = () => {
//   const saveData = searchMovie1;
//   return saveData;
// };
