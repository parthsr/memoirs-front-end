import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './DhoomFeaturePage.style';
import {Button, Picker, Text, TextInput, View} from 'react-native';
import {noop} from 'lodash/noop';

class DhoomFeaturePage extends Component {

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

DhoomFeaturePage.propTypes = {
  navigation: PropTypes.object
};
DhoomFeaturePage.defaultProps = {
  callForNamespace: noop,
  navigation: {
    navigate: noop
  }
};

export default DhoomFeaturePage;
