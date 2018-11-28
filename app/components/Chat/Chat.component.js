import PropTypes from 'prop-types';
import React, {Component} from 'react';
import style from '../Chat/Chat.style';
import {Text, View} from 'react-native';

class Chat extends Component {
  render () {
    const messages = this.props.messages;
    const clientName = this.props.clientName;
    const messagesView = [];
    for (const i in messages) {
      messagesView.push(<View style={messages[i].owner === clientName ? style.messageContainerMine : style.messageContainerYours} key={messages[i].text + i}>
        <Text style={messages[i].owner === clientName ? style.ownerMine : style.ownerYours}>{messages[i].owner}</Text>
        <Text style={style.owner}>{messages[i].text}</Text>
      </View>); 
    }
    return (<View>
      {messagesView}
    </View>);
  }
}

export default Chat;

Chat.propTypes = {
  messages: PropTypes.array,
  clientName: PropTypes.string
};