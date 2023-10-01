import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import colors from '../../../Utility/colors';
import {spacing} from '../../../Styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../../Styles/commonStyle';
import LinearGradient from 'react-native-linear-gradient';
import {height, textScale} from '../../../Styles/responsiveStyles';
import Cast from '../../Common/Cast';
import VirtualizedView from '../../Common/VirtualizedView';
import MovieList from '../../Common/MovieList';
import Loader from '../../Common/Loader';
import {
  fetchMoviesCredits,
  fetchMoviesDetails,
  fetchMoviesSimilar,
  image500,
} from '../../../API/movieDB';

const Movie = ({navigation}) => {
  const {params: item} = useRoute();
  const [cast, setCast] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  const [loding, setLoding] = useState(false);
  const [movies, setMovies] = useState({});

  useEffect(() => {
    setLoding(true);
    getMoviesDetails(item.id);
    getMoviesCredits(item.id);
    getMoviesSimilar(item.id)
  }, [item]);
  const getMoviesDetails = async id => {
    const data = await fetchMoviesDetails(id);
    if (data) setMovies(data);
    setLoding(false);
  };
  const getMoviesCredits = async id => {
    const data = await fetchMoviesCredits(id);
    if (data && data.cast) {
      setCast(data.cast);
    }
    setLoding(false);
  };
  const getMoviesSimilar = async id => {
    const data = await fetchMoviesSimilar(id);
    // console.log('gdgddxcvbn',data)
    if (data && data.results) {
      setSimilarMovie(data.results);
    }
    setLoding(false);
  };

  return (
    <>
      <VirtualizedView style={{backgroundColor: colors.transparentBlackHard}}>
        <SafeAreaView
          style={{
            marginHorizontal: spacing.PADDING_12,
            marginVertical: APP_PADDING_HORIZONTAL,
            position: 'absolute',
            zIndex: 20,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.orange700,
              borderRadius: spacing.RADIUS_10,
              padding: spacing.PADDING_6,
            }}
            onPress={() => navigation.goBack()}
            activeOpacity={1}>
            <Image
              source={require('../../../Assets/Images/rightArrow.png')}
              style={{
                width: spacing.WIDTH_30,
                height: spacing.HEIGHT_30,
                transform: [{rotate: '180deg'}],
                tintColor: colors.white,
              }}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loding ? (
          <Loader />
        ) : (
          <>
            <View>
              <Image
                // source={require('../../../Assets/Images/img.png')}
                source={{uri: image500(movies?.poster_path)}}
                style={{
                  width: spacing.FULL_WIDTH,
                  height: spacing.FULL_HEIGHT * 0.65,
                }}
              />
              <LinearGradient
                colors={[
                  'transparent',
                  'rgba(23,23,23,0.8)',
                  'rgba(23,23,23,1)',
                ]}
                style={{
                  width: spacing.FULL_WIDTH,
                  height: spacing.FULL_HEIGHT * 0.4,
                  position: 'absolute',
                  bottom: 0,
                }}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
              />
            </View>
            <View
              style={{
                marginTop: -(height * 0.07),
                marginTop: spacing.MARGIN_10,
              }}>
              <Text
                style={{
                  color: colors.white,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  letterSpacing: 2,
                  fontSize: textScale(20),
                }}>
                {movies?.title}
              </Text>
              {movies?.id ? (
                <Text
                  style={{
                    color: colors.grey400,
                    textAlign: 'center',
                    fontSize: textScale(12),
                    marginTop: spacing.MARGIN_6,
                  }}>
                  {movies?.status} • {movies?.release_date?.split('-')[0]} •{' '}
                  {movies?.runtime} min
                </Text>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: spacing.MARGIN_6,
                }}>
                {movies?.genres?.map((genre, index) => {
                  let showDot = index + 1 != movies.genres.length;
                  return (
                    <Text
                      key={index}
                      style={{color: colors.grey400, fontSize: textScale(10)}}>
                      {' '}
                      {genre?.name} {showDot ? '•' : null}
                    </Text>
                  );
                })}
              </View>
              <Text
                style={{
                  color: colors.grey500,
                  marginHorizontal: APP_PADDING_HORIZONTAL,
                  letterSpacing: 1,
                }}>
                {movies?.overview}
              </Text>
            </View>
            {movies?.id && cast.length > 0 && (
              <Cast navigation={navigation} cast={cast} />
            )}
            <MovieList
              title={'Similar Movie'}
              hideSeeAll={true}
              data={similarMovie}
            />
          </>
        )}
      </VirtualizedView>
    </>
  );
};

export default Movie;
