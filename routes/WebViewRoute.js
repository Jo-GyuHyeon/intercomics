import React from "react";
import { StackNavigator } from "react-navigation";
import { Platform } from "react-native";
import { WebViewScreen } from "../screens";
import NavButton from "../components/NavButton";

const WebViewRoute = StackNavigator(
  {
    webtoonScreen: {
      screen: WebViewScreen,
      navigationOptions: {
        title: "hahunwoo",
        header: null,
        headerStyle: {
          borderBottomWidth: 0.1,
          elevation: 0
        },
        mode: "card",
        transitionConfig: {
          isModal: false
        }
      }
    }
  },
  {
    headerMode: "none",
    mode: "card"
  }
);

export default WebViewRoute;
