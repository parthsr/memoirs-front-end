import LandingPage from './LandingPage/LandingPage';
import React, {Component} from 'react';
import styles from './app.style';
import {View} from 'react-native';

export default class App extends Component {
  render () {
    return (
      <View style={styles.container} >
        <LandingPage/>
      </View>
    );
  }
}