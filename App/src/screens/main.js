import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import { fetchWeather } from '../services/weather';
import Geolocation from '@react-native-community/geolocation';

const Main = () => {

  useEffect(() => {
    Geolocation.getCurrentPosition(({ coords }) => {
      fetchWeather(coords.latitude, coords.longitude)
        .then((data) => {
           console.log(data);
        });
    });
  });

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/splashy-loader.json')}
        style={styles.loader}
        autoPlay
        loop={true}
        resizeMode="contain"
        onAnimationFinish={() => { }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = ({ MainReducer }) => ({
  main: MainReducer,
});

export default connect(mapStateToProps)(Main);
