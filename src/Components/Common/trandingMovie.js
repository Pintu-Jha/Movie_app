import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useCallback} from 'react';
import {spacing} from '../../Styles/spacing';
import {height, textScale, width} from '../../Styles/responsiveStyles';
import colors from '../../Utility/colors';
import {APP_PADDING_HORIZONTAL} from '../../Styles/commonStyle';
import {Constants} from '../../Utility/imdex';
import {useNavigation} from '@react-navigation/native';
import {image500} from '../../API/movieDB';

const TrandingMovie = ({data, onEndReached, listFooterComponent}) => {
  const navigation = useNavigation();
  const handleClick = item => {
    navigation.navigate(Constants.SCREEN_MOVIE, item);
  };

  return (
    <View style={{marginBottom: spacing.MARGIN_10, flex: 1}}>
      <Text
        style={{
          fontSize: textScale(14),
          color: colors.white,
          marginHorizontal: spacing.MARGIN_8,
        }}>
        Tranding
      </Text>
      <FlatList
        horizontal
        // pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={data}
        onEndReached={onEndReached}
        listFooterComponent={listFooterComponent}
        renderItem={({item, index}) => {
          return <MovieCard item={item} key={'Tranding_data'+index}  handleClick={handleClick} />;
        }}
        keyExtractor={(item, index) => String(index)}
        
      />
      
    </View>
  );
};

export default memo(TrandingMovie);

const MovieCard = ({handleClick, item,}) => {
  // console.log('item',item.poster_path)
  return (
    <TouchableOpacity
      style={{
        marginLeft: spacing.MARGIN_10,
        marginRight: spacing.MARGIN_10,
        marginVertical: spacing.MARGIN_10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => handleClick(item)}
      activeOpacity={1}
      >
      <Image
        // source={require('../../Assets/Images/img.jpg')}
        source={{uri: image500(item.poster_path)}}
        style={{
          width: spacing.FULL_WIDTH * 0.77,
          height: spacing.FULL_HEIGHT * 0.46,
          borderRadius: spacing.RADIUS_12,
        }}
      />
    </TouchableOpacity>
  );
};
