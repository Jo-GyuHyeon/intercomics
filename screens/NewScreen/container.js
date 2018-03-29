import React, { Component } from "react";
import NewScreen from "./presenter";

class Container extends Component {
  render() {
    const {
      WebtoonActions,
      isLoggedIn,
      newList,
      navigation,
      isPending,
      isLast,
      toonList
    } = this.props;
    return (
      <NewScreen
        submit={this._submit}
        navigation={navigation}
        newbieList={newList["newbie"].list}
        WebtoonActions={WebtoonActions}
        isPending={isPending}
        isLast={newList["newbie"].isLast}
        toonList={toonList}
      />
    );
  }
}

export default Container;
