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
  Text,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux'


const Root = (props) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>{props.main.loading}</Text>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = ({ MainReducer }) => ({
  main: MainReducer,
});

export default connect(mapStateToProps)(Root);
