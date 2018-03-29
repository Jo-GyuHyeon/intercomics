import React from "react";
import RootNavigation from "./RootNavigation";
import { Platform, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { DrawerNavigator } from "react-navigation";
import { DrawerContent } from "../components";
import {
  InfoRoute,
  NotificationListRoute,
  SettingRoute,
  SearchRoute
} from "../routes";

const DrawerNavigation = DrawerNavigator(
  {
    home: {
      screen: RootNavigation,
      navigationOptions: {
        drawerLabel: "홈",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name={"ios-home"} color={"black"} size={30} />
        )
      }
    },
    info: {
      screen: InfoRoute,
      navigationOptions: {
        header: {
          visible: false
        },
        drawerLabel: "내 정보",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name={"md-person"} color={"black"} size={30} />
        )
      }
    },
    notification: {
      screen: NotificationListRoute,
      navigationOptions: {
        drawerLabel: "공지사항",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name={"ios-information-circle"} color={"black"} size={30} />
        )
      }
    },
    setting: {
      screen: SettingRoute,
      navigationOptions: {
        mode: "card",
        headerMode: "float",
        drawerLabel: "환경설정",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name={"md-settings"} color={"black"} size={30} />
        )
      }
    }
  },
  {
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    initialRouterName: "home",
    contentOptions: {
      activeTintColor: "#e91e63",
      style: {
        flex: 1,
        paddingTop: 15
      }
    },
    contentComponent: props => <DrawerContent {...props} />
  }
);

export default DrawerNavigation;
