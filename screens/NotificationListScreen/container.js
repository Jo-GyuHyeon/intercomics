import React, { Component } from "react";
import NotificationListScreen from "./presenter";
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
            onPress={() => navigation.navigate("menu")}
          />
        )
      },
      android: {
        headerLeft: (
          <NavButton
            iconName={"md-arrow-back"}
            size={24}
            color="white"
            onPress={() => navigation.navigate("menu")}
          />
        )
      }
    })
  });

  componentDidMount() {
    this.props.NotificationActions.getNotification();
  }
  render() {
    const {
      NotificationActions,
      isLoggedIn,
      notificationList,
      navigation,
      isPending
    } = this.props;
    return (
      <NotificationListScreen
        submit={this._submit}
        navigation={navigation}
        notificationList={notificationList}
        NotificationActions={NotificationActions}
        isPending={isPending}
      />
    );
  }
}

export default Container;
