import ChatPage from '../components/ChatPage/ChatPage.component';
import LandingPage from '../components/LandingPage/LandingPage.component';
import {createAppContainer, createStackNavigator} from 'react-navigation';

const AppNavigator = createStackNavigator({
  LandingPage: {
    screen: LandingPage
  },
  ChatPage: {
    screen: ChatPage
  }
}, {
  initialRouteName: 'LandingPage'
});
  
export default createAppContainer(AppNavigator);
