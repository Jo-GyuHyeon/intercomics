import { StackNavigator } from "react-navigation";
import { Platform } from "react-native";
import SettingScreen from "../screens/SettingScreen";

const SettingRoute = StackNavigator({
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
        backgroundColor: "#212833"
      },
      tintColor: "white"
    }
  }
});

export default SettingRoute;
