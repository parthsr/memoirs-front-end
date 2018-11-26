import PropTypes from 'prop-types';
import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';
import styles from './LandingPage.style';

import {Button, Text, TextInput, View} from 'react-native';
import {noop} from 'lodash/noop';

class LandingPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roomName: '',
      errorApi: '',
      socket: socketIOClient('http://localhost:8080/game')
    };
  }

  onButtonPress = () => {
    this.state.socket.emit('joinRoom', this.state.roomName);
    this.setState({errorApi: ''});
    // this.state.socket.on('confirmationRoom', (data) => console.log(data));
    this.props.navigation.navigate('ChatPage', {
      roomName: this.state.roomName,
      socket: this.state.socket
    });
  }

  onChangeText = (text) => {
    const roomName = text;
    this.setState({
      roomName
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to the game</Text>
        <Text style={styles.instructions}>To get started, enter the name of the room you want to play in.</Text>
        <TextInput style={styles.input} onChangeText={this.onChangeText}/>
        <Button color = {styles.button.color} title= 'Press me please' onPress={this.onButtonPress}/>
        <Text style={styles.instructions}>{this.state.errorApi}</Text>
      </View>
    );
  }
}

LandingPage.propTypes = {
  navigation: PropTypes.object
};
LandingPage.defaultProps = {
  callForNamespace: noop,
  navigation: {
    navigate: noop
  }
};

export default LandingPage;
