import React, { Component } from "react";
import SubscribeScreen from "./presenter";

class Container extends Component {
  componentDidMount() {}
  render() {
    const {
      SubscribeActions,
      subscribeList,
      navigation,
      isPending
    } = this.props;
    return (
      <SubscribeScreen
        submit={this._submit}
        navigation={navigation}
        subscribeList={subscribeList}
        SubscribeActions={SubscribeActions}
        isPending={isPending}
      />
    );
  }
}

export default Container;
