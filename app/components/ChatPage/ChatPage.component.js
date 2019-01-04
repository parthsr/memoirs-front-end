import backgroundMapping from '../../config/backgroundMapping.config';
import Chat from '../Chat/Chat.component';
import musicMapping from '../../config/musicMapping.config';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './ChatPage.style';
import {Button, Image, Text, TextInput, View} from 'react-native';
import {emit, on} from '../../service/Socket.service';
import {musicPlayer} from '../../service/Music.service';

class ChatPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roomName: '',
      confirmationRoom: '',
      text: '',
      message: '',
      messages: [],
      clientName: '',
      songDetails: {}
    };
    on('forwardMessageToRoom', (message) => {
      this.recieveMessages(message);
    });
    on('forwardSongToRoom', (songDetails) => {
      this.setState({songDetails});
      musicPlayer(musicMapping[songDetails.itemIndex]);
    });
  }

  componentDidMount = () => {
    const roomName = this.props.navigation.getParam('roomName', '');
    const clientName = this.props.navigation.getParam('clientName', '');
    this.setState({roomName, clientName});
    on('confirmationRoom', (data) => this.setState({confirmationRoom: data}));
  }

  onButtonPress = () => {
    const message = {
      owner: this.state.clientName,
      text: this.state.text
    };
    const messages = this.state.messages;
    messages.push(message);
    this.setState({messages});
    emit('sendMessageInRoom', message);      
  }

  onChangeText = (text) => {
    this.setState({
      text: text
    });
  }

  recieveMessages = (message) => {
    const messages = this.state.messages;
    if (message.owner !== this.state.clientName)
      messages.push(message);
    this.setState({messages});
  }

  onPressNavigate = () => {
    this.props.navigation.navigate('MoodImprove');
  }

  render () {
    return (
      <View style={styles.overlappedContainer}>        
        <View style={styles.backgroundView}>
          <Image style={styles.image} source={{uri: backgroundMapping[this.props.screenProps.backgroundIndex].uri}}/>
        </View>
        <Text style={styles.welcome}>Welcome to the Chat Room   {this.state.confirmationRoom}</Text>
        <Text style={styles.instructions}>Enter the chat in the box please</Text>
        <Button color = {styles.button.color} title= 'Change Mood' onPress={this.onPressNavigate}/>
        <Chat messages = {this.state.messages} clientName={this.state.clientName}/>
        <TextInput style={styles.input} onChangeText={this.onChangeText}/>
        <Button color = {styles.button.color} title= 'Press me please' onPress={this.onButtonPress}/>
      </View>
    );
  }
}
export default ChatPage;

ChatPage.defaultProps = {
  navigation: {
    getParam: noop,
    navigate: noop
  },
  screenProps: {
    backgroundIndex: 0,
    changeBackgroundAcrossApp: noop
  }
};

ChatPage.propTypes = {
  navigation: PropTypes.object,
  screenProps: PropTypes.object
};
  