import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React from 'react';
import {spacing} from '../../Styles/spacing';
import colors from '../../Utility/colors';
import {textScale} from '../../Styles/responsiveStyles';
import {APP_PADDING_HORIZONTAL} from '../../Styles/commonStyle';
import {Constants} from '../../Utility/imdex';
import {useNavigation} from '@react-navigation/native';
import { fallbackMoviePoster, image185, image342 } from '../../API/movieDB';

const MovieList = ({title, data, hideSeeAll}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: spacing.MARGIN_10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: APP_PADDING_HORIZONTAL,
        }}>
        <Text style={{color: colors.white, fontSize: textScale(16)}}>
          {title}
        </Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={{color: colors.orange500, fontSize: textScale(14)}}>
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: spacing.PADDING_4}}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              key={'MovieList'+ index}
              onPress={() => navigation.push(Constants.SCREEN_MOVIE, item)}
              activeOpacity={1}>
              <View style={{marginTop: spacing.MARGIN_12}}>
                <Image
                  // source={require('../../Assets/Images/img.jpg')}
                  source={{uri: image185(item.poster_path) || fallbackMoviePoster}}
                  style={{
                    width: spacing.FULL_WIDTH * 0.33,
                    height: spacing.FULL_HEIGHT * 0.27,
                    marginLeft: spacing.MARGIN_10,
                    marginRight: spacing.MARGIN_10,
                    borderRadius: spacing.RADIUS_12,
                  }}
                />
                <Text
                  style={{
                    fontSize: textScale(10),
                    color: colors.white,
                    marginTop: spacing.MARGIN_6,
                    alignSelf: 'center',
                  }}>
                  {item.title.length>14
                    ? item.title.slice(0, 14) + '...'
                    : item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
