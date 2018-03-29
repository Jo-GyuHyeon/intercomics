import React, { Component } from "react";
import FinishScreen from "./presenter";

class Container extends Component {
  render() {
    const {
      WebtoonActions,
      isLoggedIn,
      finishList,
      navigation,
      isPending,
      toonList
    } = this.props;
    return (
      <FinishScreen
        submit={this._submit}
        navigation={navigation}
        finishList={finishList["finish"].list}
        WebtoonActions={WebtoonActions}
        isPending={isPending}
        isLast={finishList["finish"].isLast}
        toonList={toonList}
      />
    );
  }
}

export default Container;
