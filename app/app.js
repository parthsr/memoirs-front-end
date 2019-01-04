import React, {Component} from 'react';
import Routes from './routes/index.routes';
import {on} from './service/Socket.service';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      backgroundIndex: 0
    };
    on('forwardBackgroundToRoom', (backgroundIndex) => {
      this.setState({backgroundIndex});
    });
  }
  changeBackgroundAcrossApp = (backgroundIndex) => {
    this.setState({
      backgroundIndex
    });
  }
  render () {
    return (
      <Routes screenProps={{
        backgroundIndex: this.state.backgroundIndex,
        changeBackgroundAcrossApp: this.changeBackgroundAcrossApp
      }}/>
    );
  }
}