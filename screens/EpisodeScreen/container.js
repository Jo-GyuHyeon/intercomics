import React, { Component } from "react";
import { Platform, Text } from "react-native";
import NavButton from "../../components/NavButton";
import EpisodeScreen from "./presenter";

class Container extends Component {
  static navigationOptions = ({ navigation }) => ({
    ...Platform.select({
      ios: {
        headerLeft: (
          <NavButton
            iconName={"ios-arrow-back"}
            size={30}
            color="white"
            onPress={() => navigation.goBack(null)}
          />
        )
      }
    })
  });

  componentDidMount() {
    const {
      episodeList,
      navigation,
      EpisodeActions,
      recentEpisodeNo,
      RecentActions
    } = this.props;
    const webtoon = navigation.state.params.webtoon;
    RecentActions.patchRecent(webtoon.webtoonId);
  }

  render() {
    const {
      episodeList,
      navigation,
      isPending,
      EpisodeActions,
      SubscribeActions,
      isSubscribe,
      isLast,
      lastNum,
      recentEpisodeNo
    } = this.props;

    return (
      <EpisodeScreen
        isPending={isPending}
        isSubscribe={isSubscribe}
        submit={this._submit}
        recentEpisodeNo={recentEpisodeNo}
        navigation={navigation}
        episodeList={episodeList}
        EpisodeActions={EpisodeActions}
        SubscribeActions={SubscribeActions}
        lastNum={lastNum}
        isLast={isLast}
      />
    );
  }
}

export default Container;
