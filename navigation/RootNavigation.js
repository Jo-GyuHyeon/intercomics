import React from "react";

import { Platform, StatusBar } from "react-native";
import { StackNavigator } from "react-navigation";
import DrawerNavigation from "./DrawerNavigation";
import TabNavigation from "./TabNavigation";
import NavButton from "../components/NavButton";
import {
  EpisodeRoute,
  WebViewRoute,
  SearchRoute,
  SettingRoute,
  NotificationRoute
} from "../routes";
const RootNavigation = StackNavigator(
  {
    menu: {
      screen: TabNavigation,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <NavButton
            iconName={"ios-menu"}
            size={30}
            onPress={() => navigation.navigate("DrawerOpen")}
            color="white"
          />
        ),
        headerRight: (
          <NavButton
            iconName={"ios-search"}
            size={30}
            onPress={() => navigation.navigate("search")}
            color="white"
          />
        ),
        headerStyle: {
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
          borderBottomWidth: 0,
          elevation: 0,
          backgroundColor: "#212833"
        }
      })
    },
    episode: {
      screen: EpisodeRoute
    },
    webview: {
      screen: WebViewRoute,
      navigationOptions: {
        header: null
      }
    },
    search: {
      screen: SearchRoute,
      navigationOptions: {
        headerStyle: {
          //marginTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
          borderBottomWidth: 0,
          elevation: 0,
          backgroundColor: "#212833"
        }
      }
    },
    notificationContent: {
      screen: NotificationRoute,
      navigationOptions: {
        header: null,
        drawerLabel: "공지사항",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name={"ios-information-circle"} color={"black"} size={30} />
        )
      }
    }
  },

  {}
);

export default RootNavigation;
