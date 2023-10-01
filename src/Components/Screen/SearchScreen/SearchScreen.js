import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import colors from '../../../Utility/colors';
import WrapperContainer from '../../Common/WrapperContainer';
import {spacing} from '../../../Styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../../Styles/commonStyle';
import {textScale} from '../../../Styles/responsiveStyles';
import {Constants} from '../../../Utility/imdex';
import Loader from '../../Common/Loader';
import debounce from 'lodash';
import {image185, searchMovie} from '../../../API/movieDB';

const SearchScreen = ({navigation}) => {
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleSerach = value => {
    // console.log(value)
    if (value && value.length > 2) {
      setLoader(true);
      searchMovie({
        query: value,
        include_adult: true,
        language: 'en-US',
        page: '1',
      }).then(data => {
        setLoader(false);
        console.log('sadfsggdsfg', data);
        if(data && data.results) setResult(data.results) 
      });
    }else{
      setLoader(false)
      setResult([])
    }
  };

  const handleTextBounce = useCallback((debounce(handleSerach, 400), []));

  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          alignItems: 'center',
          marginHorizontal: spacing.PADDING_12,
          marginVertical: APP_PADDING_HORIZONTAL,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            source={require('../../../Assets/Images/back.png')}
            style={{
              width: spacing.WIDTH_30,
              height: spacing.HEIGHT_30,
              // transform: [{rotate: '180deg'}],
              tintColor: colors.white,
            }}
          />
        </TouchableOpacity>
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
            onChangeText={handleSerach}
            placeholder="Search Movie"
            placeholderTextColor={colors.white}
            style={{
              paddingLeft: spacing.PADDING_10,
              padding: spacing.PADDING_6,
              color:colors.white,
              fontSize:textScale(12)
            }}
          />
        </View>
      </SafeAreaView>
      {loader ? (
        <Loader />
      ) : result.length > 0 ? (
        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: spacing.PADDING_16}}
            style={{marginTop: spacing.MARGIN_6}}>
            <Text
              style={{
                color: colors.white,
                fontSize: textScale(14),
                marginLeft: spacing.MARGIN_2,
              }}>
              Results({result.length})
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              {result.map((item,index ) => {
                return (
                  <TouchableOpacity
                    key={'result' + index}
                    onPress={() =>
                      navigation.push(Constants.SCREEN_MOVIE, item)
                    }>
                    <View
                      style={{
                        marginTop: spacing.MARGIN_4,
                        marginBottom: spacing.MARGIN_8,
                      }}>
                      <Image
                        // source={require('../../../Assets/Images/img.png')}
                        source={{uri: image185(item?.poster_path)}}
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
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
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
    </WrapperContainer>
  );
};

export default SearchScreen;
