import { StackNavigator } from "react-navigation";
import { Platform} from 'react-native';
import InfoScreen from "../screens/InfoScreen";

const InfoRoute = StackNavigator(
  {
    DailyScreen: {
      screen: InfoScreen,
      navigationOptions: {
        headerStyle: {
         // marginTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
          borderBottomWidth: 0,
          elevation: 0,
          backgroundColor: "#212833"
        }
      }
    }
  },
  {
    mode: "card",
    headerMode: "float"
  }
);

export default InfoRoute;
