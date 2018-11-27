import Chat from '../Chat/Chat.component';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';
import styles from './ChatPage.style';
import {Button, Text, TextInput, View} from 'react-native';

class ChatPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roomName: '',
      confirmationRoom: '',
      text: '',
      socket: {},
      message: '',
      messages: []
    };

  }

  componentDidMount = () => {
    const roomName = this.props.navigation.getParam('roomName', 'default');
    const socket = this.props.navigation.getParam('socket', socketIOClient(''));
    this.setState({roomName, socket});
    console.log('component did mount');
    socket.on('confirmationRoom', (data) => this.setState({confirmationRoom: data}));
  }

  onButtonPress = () => {
    const messages = this.state.messages;
    messages.push({
      owner: 'mine',
      text: this.state.text
    });
    this.setState({messages});
    this.state.socket.emit('sendMessageInRoom', this.state.text);      
  }

  onChangeText = (text) => {
    this.setState({
      text: text
    });
  }

  recieveMessages = (message) => {
    const messages = this.state.messages;
    console.log('in function recievemessages');
    messages.push({
      owner: 'others',
      text: message
    });
    this.setState({messages});
  }

  render () {
    console.log(this.state.messages);
    this.state.socket.on && this.state.socket.on('forwardMessageToRoom', (message) => {
      console.log('recieved ' + Date.now());
      this.recieveMessages(message);
    });
    return (
      <View>
        <Text style={styles.welcome}>Welcome to the Chat Room</Text>
        <Text style={styles.instructions}>Enter the chat in the box please</Text>
        <Text style={styles.instructions}>You have entered into {this.state.confirmationRoom}</Text>
        <TextInput style={styles.input} onChangeText={this.onChangeText}/>
        <Button color = {styles.button.color} title= 'Press me please' onPress={this.onButtonPress}/>
        <Chat messages = {this.state.messages}/>
      </View>
    );
  }
}
export default ChatPage;

ChatPage.defaultProps = {
  navigation: {
    getParam: noop
  }
};

ChatPage.propTypes = {
  navigation: PropTypes.object
};
  