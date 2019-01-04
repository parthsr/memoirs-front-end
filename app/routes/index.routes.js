import ChatPage from '../components/ChatPage/ChatPage.component';
import LandingPage from '../components/LandingPage/LandingPage.component';
import MoodImprove from '../components/MoodImprovePage/MoodImprovePage.component';
import {createAppContainer, createStackNavigator} from 'react-navigation';

const AppNavigator = createStackNavigator({
  LandingPage: {
    screen: LandingPage
  },
  ChatPage: {
    screen: ChatPage
  },
  MoodImprove: {
    screen: MoodImprove
  }
}, {
  initialRouteName: 'LandingPage'
});
  
export default createAppContainer(AppNavigator);
