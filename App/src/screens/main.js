/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, FlatList, Text, LayoutAnimation, Platform, UIManager, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  fetchWeatherAction,
  clearApiState,
} from './../actions';

import Geolocation from '@react-native-community/geolocation';
import en from '../config/en';

const WEEK_DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const Main = (props) => {
  const {
    apiState,
    currentTemp,
    fiveDays,
    loading,
    city,
  } = props.main;
  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  }, [loading]);

  const fetchWeather = () => {
    Geolocation.getCurrentPosition(({ coords }) => {
      props.actions.fetchWeatherAction(coords.latitude, coords.longitude);
    }, (error) => {
      Alert.alert('', error.message);
    });
  };

  if (loading) {
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
  }

  if (apiState.isError || (apiState.isSuccess && !currentTemp)) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{en.error}</Text>
        <Pressable onPress={fetchWeather} style={[styles.button, ({ pressed }) => pressed ? styles.pressed : null]}>
          <Text>{en.retry}</Text>
        </Pressable>
      </View>
    );
  }

  const renderListItem = ({ item, index }) => {
    const d = new Date();
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>{en[WEEK_DAYS[(d.getDay() + index + 1) % 7]]}</Text>
        <Text style={styles.listItemText}>{item}</Text>
      </View>
    );
  };
  if (apiState.isSuccess) {
    return (
      <View style={styles.flex}>
        <View style={[styles.container]}>
          <Text style={styles.currentTemp}>{currentTemp + ''}</Text>
          <Text style={styles.city}>{city + ''}</Text>
        </View>
        <View style={styles.flex}>
          <FlatList
            bounces={false}
            keyExtractor={item => '' + item}
            data={fiveDays}
            renderItem={renderListItem}
          />
        </View>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  loader: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.2,
  },
  error: {
    color: '#333',
    fontSize: 60,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 100,
  },
  currentTemp: {
    fontSize: 100,
  },
  city: {
    fontSize: 20,
  },
  listItem: {
    borderTopColor: '#000',
    borderTopWidth: 1,
    paddingVertical: 16,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  listItemText: {
    fontSize: 20,
  },
});

const mapStateToProps = ({ MainReducer }) => ({
  main: MainReducer,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ fetchWeatherAction, clearApiState }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
