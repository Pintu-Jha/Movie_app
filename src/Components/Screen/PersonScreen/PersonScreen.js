import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import VirtualizedView from '../../Common/VirtualizedView';
import colors from '../../../Utility/colors';
import {spacing} from '../../../Styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../../Styles/commonStyle';
import {useNavigation, useRoute} from '@react-navigation/native';
import {textScale} from '../../../Styles/responsiveStyles';
import MovieList from '../../Common/MovieList';
import Loader from '../../Common/Loader';
import {fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342} from '../../../API/movieDB';

const PersonScreen = () => {
  const navigation = useNavigation();
  const {params: item} = useRoute();
  const [personMovie, setPersonMovie] = useState([]);
  const [person, setPerson] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);
  const getPersonDetails = async id => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    setLoader(false);
  };
  const getPersonMovies = async id => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovie(data.cast);
    setLoader(false);
  };

  return (
    <VirtualizedView style={{backgroundColor: colors.transparentBlackHard}}>
      <SafeAreaView
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: spacing.PADDING_12,
          marginVertical: APP_PADDING_HORIZONTAL,
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
      {loader ? (
        <Loader />
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
                borderRadius: spacing.RADIUS_160,
                width: spacing.WIDTH_320,
                height: spacing.HEIGHT_320,
                borderWidth: 2,
                borderColor: ' rgb(115 115 115)',
              }}>
              <Image
                // source={require('../../../Assets/Images/image.jpeg')}
                source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                style={{
                  width: spacing.WIDTH_320,
                  height: spacing.HEIGHT_320,
                  borderRadius: spacing.RADIUS_160,
                }}
              />
            </View>
          </View>
          <View style={{marginTop: spacing.MARGIN_8, alignItems: 'center'}}>
            <Text
              style={{
                color: colors.white,
                fontSize: textScale(22),
                fontWeight: '500',
              }}>
              {person?.name}
            </Text>
            <Text style={{color: colors.grey500, fontSize: textScale(13)}}>
              {person?.place_of_birth}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: spacing.MARGIN_14,
              padding: spacing.PADDING_12,
              marginTop: spacing.MARGIN_8,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: colors.grey900,
              borderRadius: spacing.RADIUS_16,
            }}>
            <View
              style={{
                borderRightWidth: 2,
                borderRightColor: 'rgb(15,15,15)',
                paddingHorizontal: spacing.PADDING_12,
                alignItems: 'center',
              }}>
              <Text style={{color: colors.white}}>Gender</Text>
              <Text style={{color: colors.white}}>
                {person?.gender == 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View
              style={{
                borderRightWidth: 2,
                borderRightColor: 'rgb(15,15,15)',
                paddingHorizontal: spacing.PADDING_16,
                alignItems: 'center',
              }}>
              <Text style={{color: colors.white}}>Birthday</Text>
              <Text style={{color: colors.white}}>{person?.birthday}</Text>
            </View>
            <View
              style={{
                borderRightWidth: 2,
                borderRightColor: 'rgb(15,15,15)',
                paddingHorizontal: spacing.PADDING_16,
                alignItems: 'center',
              }}>
              <Text style={{color: colors.white}}>Known for</Text>
              <Text style={{color: colors.white}}>
                {person?.known_for_department}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: spacing.PADDING_16,
                alignItems: 'center',
              }}>
              <Text style={{color: colors.white}}>Popularity</Text>
              <Text style={{color: colors.white}}>
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: spacing.MARGIN_10,
              marginTop: spacing.MARGIN_12,
            }}>
            <Text style={{color: colors.white, fontSize: textScale(14)}}>
              Biography
            </Text>
            <Text style={{color: colors.grey400, letterSpacing: 2}}>
              {person?.biography || 'NA'}
            </Text>
          </View>
          <MovieList data={personMovie} hideSeeAll={true} title={'Movies'} />
        </View>
      )}
    </VirtualizedView>
  );
};

export default PersonScreen;
