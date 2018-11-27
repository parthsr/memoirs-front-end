import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, View} from 'react-native';

class Chat extends Component {
  render () {
    const messages = this.props.messages;
    const messagesView = [];
    for (const i in messages) {
      if (messages[i].owner === 'mine') {
        messagesView.push(<Text key={messages[i].text + i}>{messages[i].text}</Text>); 
      } else {
        messagesView.push(<Text key={messages[i].text + i}>{messages[i].text}</Text>); 
      }
    }
    return (<View>
      {messagesView}
    </View>);
  }
}

export default Chat;

Chat.propTypes = {
  messages: PropTypes.array
};