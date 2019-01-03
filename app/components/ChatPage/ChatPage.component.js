import Chat from '../Chat/Chat.component';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './ChatPage.style';
import {Button, Text, TextInput, View} from 'react-native';
import {emit, on} from '../../service/Socket.service';

class ChatPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roomName: '',
      confirmationRoom: '',
      text: '',
      message: '',
      messages: [],
      clientName: ''
    };
    on('forwardMessageToRoom', (message) => {
      this.recieveMessages(message);
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

  render () {
    return (
      <View>
        <Text style={styles.welcome}>Welcome to the Chat Room   {this.state.confirmationRoom}</Text>
        <Text style={styles.instructions}>Enter the chat in the box please</Text>
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
    getParam: noop
  }
};

ChatPage.propTypes = {
  navigation: PropTypes.object
};
  