import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './LandingPage.style';
import {Button, Text, TextInput, View} from 'react-native';
import {emit} from '../../service/Socket.service';
import {musicPlayer} from '../../service/Music.service';
import {noop} from 'lodash/noop';

class LandingPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roomName: '',
      clientName: ''
    };
  }

  componentDidMount = () => {
    console.log('hi');
    musicPlayer();
  }

  onButtonPress = () => {
    emit('joinRoom', this.state.roomName);
    this.props.navigation.navigate('ChatPage', {
      roomName: this.state.roomName,
      clientName: this.state.clientName
    });
  }

  onRoomChangeText = (text) => {
    this.setState({
      roomName: text
    });
  }

  onNameChangeText = (text) => {
    this.setState({
      clientName: text
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to the game</Text>
        <Text style={styles.instructions}>To get started, enter the name of the room you want to play in.</Text>
        <TextInput style={styles.input} onChangeText={this.onRoomChangeText}/>
        <Text style={styles.instructions}>To get started, enter your name.</Text>
        <TextInput style={styles.input} onChangeText={this.onNameChangeText}/>
        <Button color = {styles.button.color} title= 'Press me please' onPress={this.onButtonPress}/>
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
