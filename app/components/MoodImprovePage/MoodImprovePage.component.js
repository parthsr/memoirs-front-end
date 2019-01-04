import musicMapping from '../../config/musicMapping.config';
import React, {Component} from 'react';
import styles from './MoodImprovePage.style';
import {emit, on} from '../../service/Socket.service';
import {musicPlayer} from '../../service/Music.service';
import {Picker, View} from 'react-native';

class MoodImprovePage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      songDetails: {}
    };
    on('forwardSongToRoom', (songDetails) => {
      this.setState({songDetails});
      console.log('asdasdasdas', songDetails);
      musicPlayer(musicMapping[songDetails.itemIndex]);
    });
  }
  selectValueChange = (itemValue, itemIndex) => {
    const songDetails = {
      itemValue, itemIndex
    };
    this.setState({
      songDetails
    });
    musicPlayer(musicMapping[itemIndex]); 
    emit('sendSongInRoom', songDetails);  
  }
  values = () => {
    const items = musicMapping.map((item) => <Picker.Item key={item} label={item.title} value={item.title}/>);
    return items;
  }

  render () {
    return (
      <View style={styles.container}>
        <Picker
          itemStyle={{fontSize: 20}}
          selectedValue={this.state.songDetails.itemValue}
          style={{width: '100%'}}
          onValueChange={this.selectValueChange}>
          {this.values()}
        </Picker>
      </View>
    );
  }
}

export default MoodImprovePage;
