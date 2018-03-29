import { StackNavigator } from "react-navigation";
import FinishScreen from "../screens/FinishScreen";

const FinishRoute = StackNavigator(
  {
    FinishScreen: {
      screen: FinishScreen,
      navigationOptions: {}
    }
  },
  {
    headerMode: "none"
  }
);

export default FinishRoute;
