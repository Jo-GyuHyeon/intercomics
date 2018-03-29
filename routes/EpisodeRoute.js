import React from "react";
import { StackNavigator } from "react-navigation";
import { Platform } from "react-native";
import { EpisodeScreen } from "../screens";
import NavButton from "../components/NavButton";

const EpisodeRoute = StackNavigator(
  {
    webtoonScreen: {
      screen: EpisodeScreen,
      navigationOptions: {
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          elevation: 0,
          backgroundColor: "#212833"
        },
        headerTintColor: "white",
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

export default EpisodeRoute;
