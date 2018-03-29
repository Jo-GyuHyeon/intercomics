import React, { Component } from "react";
import Expo from "expo";
import LogInScreen from "./presenter";

async function getToken() {
  // Remote notifications do not work in simulators, only on device

  let { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS
  );
  if (status !== "granted") {
    return;
  }
  token = await Expo.Notifications.getExpoPushTokenAsync();
  //console.log("Our token", token);
  /// Send this to a server
}

class Container extends Component {
  componentDidMount() {
    this.listener = Expo.Notifications.addListener(this.handleNotification);
    //this.props.UserActions.setLogOut();
    //this.props.UserActions.facebookLogOut();
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };

  render() {
    return (
      <LogInScreen submit={this._submit} isPending={this.props.isPending} />
    );
  }

  _submit = () => {
    const { UserActions, name } = this.props;
    //getToken();
    Expo.Notifications.getExpoPushTokenAsync().then(token => {
      UserActions.facebookLogin(token);
    });
  };
}

export default Container;
