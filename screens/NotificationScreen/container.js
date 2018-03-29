import React, { Component } from "react";
import NotificationScreen from "./presenter";
import { Platform } from "react-native";
import { NavButton } from "../../components";

class Container extends Component {
  static navigationOptions = ({ navigation }) => ({
    ...Platform.select({
      ios: {
        headerLeft: (
          <NavButton
            iconName={"ios-arrow-back"}
            size={30}
            color="white"
            onPress={() => navigation.navigate("notification")}
          />
        )
      },
      android: {
        headerLeft: (
          <NavButton
            iconName={"md-arrow-back"}
            size={24}
            color="white"
            onPress={() => navigation.navigate("notification")}
          />
        )
      }
    })
  });
  render() {
    const { navigation } = this.props;
    return <NotificationScreen navigation={navigation} />;
  }
}

export default Container;
