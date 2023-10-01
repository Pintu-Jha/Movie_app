import React from 'react';
import {View, ActivityIndicator, Modal, StyleSheet} from 'react-native';
import colors from '../../Utility/colors';

const Loader = () => {
  return (
    <Modal transparent>
      <View style={styles.loaderstyle}>
        <ActivityIndicator size={40} />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  loaderstyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
