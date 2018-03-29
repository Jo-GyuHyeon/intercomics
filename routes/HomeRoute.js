import { StackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";

const HomeRoute = StackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    }
  },
  {
    headerMode: "none"
  }
);

export default HomeRoute;
