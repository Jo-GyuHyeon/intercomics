import React, { Component } from "react";
import HomeScreen from "./presenter";

class Container extends Component {
  render() {
    const {
      RecentActions,
      isLoggedIn,
      recentList,
      navigation,
      isPending,
      name,
      id,
      token
    } = this.props;
    return (
      <HomeScreen
        submit={this._submit}
        navigation={navigation}
        recentList={recentList}
        RecentActions={RecentActions}
        isPending={isPending}
        token={token}
        name={name}
        id={id}
      />
    );
  }
}

export default Container;
