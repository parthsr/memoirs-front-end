import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';
import {Button, Text, TextInput, View} from 'react-native';

class ChatPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roomName: '',
      confirmationRoom: '',
      text: '',
      socket: {},
      message: ''
    };
  }

  componentDidMount=() => {
    const roomName = this.props.navigation.getParam('roomName', 'default');
    const socket = this.props.navigation.getParam('socket', socketIOClient(''));
    this.setState({roomName, socket});
    socket.on('confirmationRoom', (data) => this.setState({confirmationRoom: data}));
  }

  onButtonPress = () => {
    this.state.socket.emit('sendMessageInRoom', this.state.text);
  }

  onChangeText = (text) => {
    this.setState({
      text
    });
  }

  render () {
    this.state.socket.on && this.state.socket.on('forwardMessageToRoom', (message) => {
      this.setState({
        message
      });
    });
    return (
      <View>
        <Text >Welcome to the Chat Room</Text>
        <Text >Enter the chat in the box please</Text>
        <Text>You have entered into{this.state.confirmationRoom}</Text>
        <TextInput onChangeText={this.onChangeText}/>
        <Button title= 'Press me please' onPress={this.onButtonPress}/>
        <Text>{this.state.message}</Text>
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
  