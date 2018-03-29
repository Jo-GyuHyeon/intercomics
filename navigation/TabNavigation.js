import React from "react";

import {
  TabNavigator,
  StackNavigation,
  TabBarTop,
  Alert
} from "react-navigation";
import { Platform, Dimensions } from "react-native";
import {
  HomeRoute,
  SubscribeRoute,
  DailyRoute,
  NewRoute,
  FinishRoute,
  RankRoute,
  Dimentions
} from "../routes";
const { width, height } = Dimensions.get("window");
if (Platform.OS === "ios" || Platform.OS === "Simulator") {
  model = Expo.Constants.platform.ios.model;
} else {
  model = "android";
}
//Alert.alert(model);

const TabNavigation = TabNavigator(
  {
    홈: {
      screen: HomeRoute
    },
    구독: {
      screen: SubscribeRoute
    },

    연재: {
      screen: DailyRoute
    },

    신작: {
      screen: NewRoute
    },

    완결: {
      screen: FinishRoute
    },

    랭킹: {
      screen: RankRoute
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    initialRouteName: "홈",
    lazy: false,
    ...Platform.select({
      android: {
        tabBarOptions: {
          activeTintColor: "white",
          indicatorStyle: {
            backgroundColor: "white"
          },
          labelStyle: {
            fontSize: 14,
            padding: 0,
            margin: 0
          },
          tabStyle: {
            marginTop:
              Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight - 5,
            paddingVertical: -1
          },
          style: {
            elevation: 1.6,
            height: 50,
            borderTopWidth: 0,
            borderBottomWidth: 0.1,
            backgroundColor: "#212833"
          }
        }
      },
      ios: {
        tabBarPosition: "top",
        tabBarOptions: {
          activeTintColor: "white",
          inactiveTintColor: "#bdc3c7",
          labelStyle: {
            fontSize: 14
          },
          tabStyle: {
            padding: 10,
            marginTop: model == "iPhone X" || model == "Simulator" ? 40 : 0
          },
          style: {
            backgroundColor: "#212833",
            borderTopWidth: 0,
            borderBottomWidth: 0.5,
            height: model == "iPhone X" || model == "Simulator" ? 30 : 38
          }
        }
      }
    })
  }
);

export default TabNavigation;
