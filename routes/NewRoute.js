import { StackNavigator } from "react-navigation";
import NewScreen from "../screens/NewScreen";

const NewRoute = StackNavigator(
  {
    NewScreen: {
      screen: NewScreen
    }
  },
  {
    headerMode: "none"
  }
);

export default NewRoute;
