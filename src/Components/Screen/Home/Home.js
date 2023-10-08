import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import colors from '../../../Utility/colors';
import {spacing} from '../../../Styles/spacing';
import {Images} from '../../../Utility/imgPath';
import {textScale} from '../../../Styles/responsiveStyles';
import {APP_PADDING_HORIZONTAL} from '../../../Styles/commonStyle';
import WrapperContainer from '../../Common/WrapperContainer';
import TrandingMovie from '../../Common/trandingMovie';
import MovieList from '../../Common/MovieList';
import {Constants} from '../../../Utility/imdex';
import Loader from '../../Common/Loader';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpComingMovies,
} from '../../../API/movieDB';
import VirtualizedView from '../../Common/VirtualizedView';



let loadMore = true;

const Home = ({navigation}) => {
  const [tranding, setTreanding] = useState([]);
  const [upcoming, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loding, setLoding] = useState(true);
  const [page, setPage] = useState(1);
  const [showFoterLoader, setShowFoterLoader] = useState(false);

  useEffect(() => {
    getTrendingMovies();
    getUpComingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies({
      page: page,
    });
    // console.log('trending movies', data.results);
    if (data.total_results.length == 0) {
      loadMore = false;
    }
    if (data && data.results) setTreanding([...tranding, ...data.results]);
    setPage(page + 1);
    setLoding(false);
    // setShowFoterLoader(false);
  };
  const getUpComingMovies = async () => {
    const data = await fetchUpComingMovies({
      page: page,
    });
    // console.log('trending movies',data)
    if (data.total_results.length == 0) {
      loadMore = false;
    }
    if (data && data.results) setUpComing([...upcoming, ...data.results]);
    setPage(page + 1);
    setLoding(false);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies({
      page: page,
    });
    // console.log('trending movies',data)
    if (data.total_results.length == 0) {
      loadMore = false;
    }
    if (data && data.results) setTopRated([...topRated,...data.results]);
    setPage(page + 1);
    setLoding(false);
  };

  const onEndReached = () => {
    if (loadMore) {
      // setShowFoterLoader(true);
      getTrendingMovies();
      getTopRatedMovies();
      getUpComingMovies();
    }
  };

  const listFooterComponent = useCallback(() => {
    return (
      <ActivityIndicator
        style={{marginRight: APP_PADDING_HORIZONTAL}}
        size={25}
      />
    );
  }, []);

  return (
    <VirtualizedView>
      <WrapperContainer>
        <View style={Styles.headerContainer}>
          <Image source={Images.IMG_MENU} style={Styles.headerIcons} />
          <Text style={{fontSize: textScale(20), color: colors.white}}>
            <Text style={{color: colors.orange500}}>M</Text>ovies
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(Constants.Screen_SEARCH)}>
            <Image source={Images.IMG_SEARCH} style={Styles.headerIcons} />
          </TouchableOpacity>
        </View>
        {loding ? (
          <Loader />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: spacing.PADDING_10}}>
            {tranding.length > 0 && (
              <TrandingMovie
                data={tranding}
                onEndReached={onEndReached}
                listFooterComponent={listFooterComponent}
              />
            )}

            {upcoming.length > 0 && (
              <MovieList
                title="UpComing"
                data={upcoming}
                onEndReached={onEndReached}
                listFooterComponent={listFooterComponent}
              />
            )}

            {topRated.length > 0 && (
              <MovieList title="Top Rated" data={topRated} />
            )}
          </ScrollView>
        )}
      </WrapperContainer>
    </VirtualizedView>
  );
};

export default memo(Home);

const Styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: APP_PADDING_HORIZONTAL,
    marginHorizontal: spacing.MARGIN_12,
  },
  headerIcons: {
    width: spacing.WIDTH_30,
    height: spacing.HEIGHT_30,
    tintColor: colors.white,
  },
});
