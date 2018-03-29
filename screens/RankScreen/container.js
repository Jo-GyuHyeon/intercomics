import React, { Component } from "react";
import RankScreen from "./presenter";

class Container extends Component {
  render() {
    const {
      RankActions,
      isLoggedIn,
      rankList,
      navigation,
      isPending
    } = this.props;
    return (
      <RankScreen
        submit={this._submit}
        navigation={navigation}
        rankList={rankList}
        RankActions={RankActions}
        isPending={isPending}
      />
    );
  }
}

export default Container;
