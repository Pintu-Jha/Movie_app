import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {spacing} from '../../Styles/spacing';
import colors from '../../Utility/colors';
import {APP_PADDING_HORIZONTAL} from '../../Styles/commonStyle';
import {textScale} from '../../Styles/responsiveStyles';
import {Constants} from '../../Utility/imdex';
import {fallbackPersonImage, image185, image342} from '../../API/movieDB';

const Cast = ({cast, navigation}) => {
  return (
    <View style={{marginVertical: spacing.MARGIN_6}}>
      <Text
        style={{
          color: colors.white,
          marginHorizontal: APP_PADDING_HORIZONTAL,
          marginBottom: spacing.MARGIN_6,
          fontSize: textScale(18),
        }}>
        Top Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: APP_PADDING_HORIZONTAL,
        }}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={'cast' + index}
                style={{marginRight: spacing.MARGIN_10}}
                onPress={() =>
                  navigation.navigate(Constants.Screen_PERSON, person)
                }>
                <View
                  style={{
                    alignItems: 'center',
                    borderColor: ' rgb(115 115 115)',
                    width: spacing.WIDTH_80,
                    height: spacing.HEIGHT_80,
                    overflow: 'hidden',
                  }}>
                  <Image
                    // source={require('../../Assets/Images/image.jpeg')}
                    source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                    style={{
                      borderRadius: spacing.RADIUS_100,
                      width: spacing.WIDTH_80,
                      height: spacing.HEIGHT_80,
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: colors.white,
                    marginTop: spacing.MARGIN_2,
                    fontSize: textScale(10),
                    alignSelf: 'center',
                  }}>
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + '...'
                    : person?.character}
                </Text>
                <Text
                  style={{
                    color: ' rgb(163 163 163)',
                    marginTop: spacing.MARGIN_2,
                    fontSize: textScale(10),
                    alignSelf: 'center',
                  }}>
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + '...'
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
