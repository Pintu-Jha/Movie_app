import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, memo} from 'react';
import colors from '../../../Utility/colors';
import {spacing} from '../../../Styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../../Styles/commonStyle';
import {textScale} from '../../../Styles/responsiveStyles';
import {Constants} from '../../../Utility/imdex';
import Loader from '../../Common/Loader';
import {
  fallbackMoviePoster,
  image185,
  searchMovies,
} from '../../../API/movieDB';
import VirtualizedView from '../../Common/VirtualizedView';

let loadMore = true;

const SearchScreen = ({navigation}) => {
  const [result, setResult] = useState([]);
  const [value, setValue] = useState('');
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [showFoterLoader, setShowFoterLoader] = useState(false);

  const handleSerach = () => {
    if (value != '') {
      if (page == '1') setLoader(true);
      searchMovies({
        query: value,
        include_adult: false,
        language: 'en-US',
        page: page,
      }).then(data => {
        setLoader(false);
        if (data.total_results.length == 0) {
          loadMore = false;
        }
        // console.log('sadfsggdsfg', data.total_results);
        if (data && data.results) setResult([...result, ...data.results]);
        setPage(page + 1);
        setShowFoterLoader(false);
      });
    } else {
      setLoader(false);
      setResult([]);
    }
  };

  const keyExtractor = useCallback((item) => `${item.id}`);

  const increseData = () => {
    if (loadMore) {
      setShowFoterLoader(true);
      handleSerach();
    }
  };

  const listFooterComponent = useCallback(() => {
    return (
      <ActivityIndicator
        style={{marginVertical: APP_PADDING_HORIZONTAL}}
        size={25}
        color={colors.white}
      />
    );
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.transparentBlackHard}}>
      <SafeAreaView
        style={{
          alignItems: 'center',
          marginHorizontal: spacing.PADDING_12,
          marginVertical: APP_PADDING_HORIZONTAL,
          flexDirection: 'row',
        }}>
        <TouchableWithoutFeedback
          onPress={() => navigation.goBack()}
          activeOpacity={1}>
          <Image
            source={require('../../../Assets/Images/back.png')}
            style={{
              width: spacing.WIDTH_30,
              height: spacing.HEIGHT_30,
              tintColor: colors.white,
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={{
            marginLeft: spacing.MARGIN_10,
            borderWidth: 1,
            borderColor: colors.grey900,
            flex: 1,
            borderRadius: spacing.RADIUS_16,
            backgroundColor: colors.grey900,
          }}>
          <TextInput
            onChangeText={txt => setValue(txt)}
            value={value}
            onSubmitEditing={handleSerach}
            placeholder="Search Movie"
            placeholderTextColor={colors.white}
            style={{
              paddingLeft: spacing.PADDING_10,
              padding: spacing.PADDING_6,
              color: colors.white,
              fontSize: textScale(12),
            }}
          />
        </View>
      </SafeAreaView>
      {loader ? (
        <Loader />
      ) : result.length > 0 ? (
        <VirtualizedView>
          <Text
            style={{
              color: colors.white,
              fontSize: textScale(14),
              marginLeft: spacing.MARGIN_2,
            }}>
            Results({result.length})
          </Text>
          <FlatList
            data={result}
            style={{flexDirection: 'column'}}
            numColumns={2}
            keyExtractor={keyExtractor}
            onEndReached={increseData}
            ListFooterComponent={showFoterLoader && listFooterComponent}
            renderItem={({item, index}) => {
              return (
                <TouchableWithoutFeedback
                  key={'result' + index}
                  onPress={() => navigation.push(Constants.SCREEN_MOVIE, item)}>
                  <View
                    style={{
                      paddingVertical: 14,
                      paddingHorizontal: spacing.PADDING_12,
                    }}>
                    <Image
                      source={{
                        uri: image185(item?.poster_path) || fallbackMoviePoster,
                      }}
                      style={{
                        width: spacing.FULL_WIDTH * 0.44,
                        height: spacing.FULL_HEIGHT * 0.3,
                        borderRadius: spacing.RADIUS_10,
                      }}
                    />
                    <Text
                      style={{
                        color: colors.white,
                        alignSelf: 'center',
                        marginTop: spacing.MARGIN_2,
                      }}>
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + '...'
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </VirtualizedView>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: spacing.FULL_WIDTH / 3,
          }}>
          <Image
            source={require('../../../Assets/Images/movieTime.png')}
            style={{
              width: spacing.WIDTH_300,
              height: spacing.HEIGHT_300,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default memo(SearchScreen);
