import React from "react";

import { Platform, StatusBar } from "react-native";
import { StackNavigator } from "react-navigation";
import { LogInScreen, IntroScreen } from "../screens";

const LogInNavigation = StackNavigator(
  {
    소개: {
      screen: IntroScreen,
      navigationOptions: {
        title: "INTRO",
        header: null
      }
    },
    login: {
      screen: LogInScreen,
      navigationOptions: {
        title: "Log In",
        header: null,
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
          borderBottomWidth: 0,
          elevation: 0
        }
      }
    },
  },
  {
    mode: "card",
    headerMode: "float"
  }
);

export default LogInNavigation;
