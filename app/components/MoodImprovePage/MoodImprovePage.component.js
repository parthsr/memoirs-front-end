import backgroundMapping from '../../config/backgroundMapping.config';
import musicMapping from '../../config/musicMapping.config';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './MoodImprovePage.style';
import stylesForBackground from '../ChatPage/ChatPage.style';
import {emit, on} from '../../service/Socket.service';
import {Image, Picker, View} from 'react-native';
import {musicPlayer} from '../../service/Music.service';

class MoodImprovePage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      songDetails: {}
    };
    on('forwardSongToRoom', (songDetails) => {
      this.setState({songDetails});
      musicPlayer(musicMapping[songDetails.itemIndex]);
    });
  }

  selectMusicChange = (itemValue, itemIndex) => {
    const songDetails = {
      itemValue, itemIndex
    };
    this.setState({
      songDetails
    });
    musicPlayer(musicMapping[itemIndex]); 
    emit('sendSongInRoom', songDetails);  
  }

  selectBackgroundChange = (itemValue, itemIndex) => {
    emit('sendBackgroundInRoom', itemIndex);  
    this.props.screenProps.changeBackgroundAcrossApp(itemIndex);
  }

  musicValues = () => {
    const items = musicMapping.map((item) => <Picker.Item key={item} label={item.title} value={item.title}/>);
    return items;
  }

  backgroundValues = () => {
    const items = backgroundMapping.map((item) => <Picker.Item key={item} label={item.title} value={item.title}/>);
    return items;
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={stylesForBackground.backgroundView}>
          <Image style={stylesForBackground.image} source={{uri: backgroundMapping[this.props.screenProps.backgroundIndex].uri}}/>
        </View>
        <Picker
          itemStyle={{fontSize: 20}}
          selectedValue={this.state.songDetails.itemValue}
          style={{width: '100%'}}
          onValueChange={this.selectMusicChange}>
          {this.musicValues()}
        </Picker>
        <Picker
          itemStyle={{fontSize: 20}}
          selectedValue={backgroundMapping[this.props.screenProps.backgroundIndex].title}
          style={{width: '100%'}}
          onValueChange={this.selectBackgroundChange}>
          {this.backgroundValues()}
        </Picker>
      </View>
    );
  }
}
MoodImprovePage.defaultProps = {
  screenProps: {
    backgroundIndex: 0,
    changeBackgroundAcrossApp: noop
  }
};
MoodImprovePage.propTypes = {
  screenProps: PropTypes.object
};

export default MoodImprovePage;
