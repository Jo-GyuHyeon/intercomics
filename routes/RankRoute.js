import { StackNavigator } from "react-navigation";
import RankScreen from "../screens/RankScreen";

const RankRoute = StackNavigator(
  {
    RankScreen: {
      screen: RankScreen,
      navigationOptions: {}
    }
  },
  {
    headerMode: "none"
  }
);

export default RankRoute;
