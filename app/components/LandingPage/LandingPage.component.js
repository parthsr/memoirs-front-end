import musicMapping from '../../config/musicMapping.config';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './LandingPage.style';
import {Button, Picker, Text, TextInput, View} from 'react-native';
import {emit} from '../../service/Socket.service';
import {musicPlayer} from '../../service/Music.service';
import {noop} from 'lodash/noop';

class LandingPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roomName: '',
      clientName: '',
      selectedMusic: {}
    };
  }
componentDidMount = () => {
  // musicPlayer(musicMapping[0].file);  
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
  
  selectValueChange = (itemValue, itemIndex) => {
    this.setState({
      selectedMusic: itemValue
    });
    musicPlayer(musicMapping[itemIndex]);  
  }

  values = () => {
    const items = musicMapping.map((item) => <Picker.Item key={item} label={item.title} value={item.title}/>);
    return items;
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
        <Picker
          selectedValue={this.state.selectedMusic}
          style={{height: 50, width: '100%'}}
          onValueChange={this.selectValueChange}>
          {this.values()}
        </Picker>
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
