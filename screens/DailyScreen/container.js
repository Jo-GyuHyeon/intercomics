import React, { Component } from "react";
import DailyScreen from "./presenter";

class Container extends Component {
  render() {
    const {
      WebtoonActions,
      toonList,
      navigation,
      isPending,
      RecentActions
    } = this.props;
    return (
      <DailyScreen
        submit={this._submit}
        navigation={navigation}
        toonList={toonList}
        WebtoonActions={WebtoonActions}
        isPending={isPending}
        RecentActions={RecentActions}
      />
    );
  }
}

export default Container;
