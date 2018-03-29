import { StackNavigator } from "react-navigation";
import { Platform } from "react-native";
import NotificationListScreen from "../screens/NotificationListScreen";

const NotificationListRoute = StackNavigator(
  {
    NotificationScreen: {
      screen: NotificationListScreen,
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

export default NotificationListRoute;
