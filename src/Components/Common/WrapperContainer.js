import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import colors from '../../Utility/colors';
import Loader from './Loader';
import {spacing} from '../../Styles/spacing';

const android = Platform.OS == 'android';
const WrapperContainer = ({
  barStyle = 'dark-content',
  barstylecolor = colors.white,
  children,
  isLoading,
  color = colors.transparentBlackHard,
}) => {
  return (
    <View
      style={{...styles.container, backgroundColor: color}}>
      <StatusBar barStyle={barStyle} backgroundColor={barstylecolor} />
      <SafeAreaView
        style={
          android
            ? {marginBottom: spacing.MARGIN_4}
            : {marginBottom: spacing.MARGIN_2}
        }>
        {children}
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WrapperContainer;
