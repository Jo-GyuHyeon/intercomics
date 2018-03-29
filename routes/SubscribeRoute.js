import { StackNavigator } from "react-navigation";
import SubscribeScreen from "../screens/SubscribeScreen";

const SubscribeRoute = StackNavigator(
  {
    SubscribeScreen: {
      screen: SubscribeScreen,
      navigationOptions: {}
    }
  },
  {
    headerMode: "none"
  }
);

export default SubscribeRoute;
