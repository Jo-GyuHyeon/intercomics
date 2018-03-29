import { StackNavigator } from "react-navigation";
import { Platform } from 'react-native';
import SearchScreen from "../screens/SearchScreen";

const SearchRoute = StackNavigator(
  {
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: {
        headerStyle: {
          borderBottomWidth: 0.1,
          elevation: 0
        },
        mode: "card",
        transitionConfig: {
          isModal: false
        }
      }
    }
  },
  {
    headerMode:'none'
  }
);

export default SearchRoute;
