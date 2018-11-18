import React, {Component} from 'react';
import styles from './LandingPage.style';
import {Button, Text, TextInput, View} from 'react-native';

export default class LandingPage extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to the game</Text>
        <Text style={styles.instructions}>To get started, enter the name of the room you want to play in.</Text>
        <TextInput style={styles.input}/>
        <Button color = {styles.button.color} title= 'Press me please'/>
      </View>
    );
  }
}