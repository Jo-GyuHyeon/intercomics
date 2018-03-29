import React, { Component } from "react";
import { View, Text } from "react-native";
import WebViewScreen from "./presenter";

class Container extends Component {
  render() {
    const { navigation, episodeList, EpisodeActions } = this.props;
    return (
      <WebViewScreen
        navigation={navigation}
        episodeList={episodeList}
        EpisodeActions={EpisodeActions}
      />
    );
  }
}

export default Container;
