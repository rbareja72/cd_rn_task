/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Main from './main';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

const Root = (props) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.flex}>
        <Main />
      </SafeAreaView>
    </>
  );
};



export default Root;
