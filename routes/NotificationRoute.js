import { StackNavigator } from "react-navigation";
import { Platform } from "react-native";
import NotificationScreen from "../screens/NotificationScreen";

const NotificationRoute = StackNavigator(
  {
    NotificationScreen: {
      screen: NotificationScreen,
      navigationOptions: {
        title: "공지사항",
        headerTintColor: "white",
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          backgroundColor: "#212833"
        }
      }
    }
  },
  {}
);

export default NotificationRoute;
