import { StackNavigator } from "react-navigation";
import DailyScreen from "../screens/DailyScreen";

const DailyRoute = StackNavigator(
  {
    DailyScreen: {
      screen: DailyScreen,
      navigationOptions: {}
    }
  },
  {
    headerMode: "none"
  }
);

export default DailyRoute;
