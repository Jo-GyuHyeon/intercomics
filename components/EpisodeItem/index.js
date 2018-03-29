import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Images,
  StyleSheet,
  Dimensions,
  Alert
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { UpBadge, LockBadge } from "../../components";

class EpisodeItem extends Component {
  state = {
    clicked: false
  };

  render() {
    const getColor = index => {
      if (this.props.recentEpisodeNo === index) {
        return "red";
      } else {
        return "white";
      }
    };
    const { item, navigation, EpisodeActions, lastNum, isUpdate } = this.props;
    return (
      <ListItem
        avatar={
          <Avatar
            medium
            imageProps={{ resizeMode: "stretch" }}
            source={{ uri: item.episodeThumbnail_s }}
          />
        }
        title={
          <View
            style={{
              flexDirection: "row",
              marginLeft: 9,
              marginTop: 4,
              marginBottom: 4
            }}
          >
            {isUpdate && item.episodeNo == lastNum ? (
              <UpBadge value="UP" />
            ) : (
              <View />
            )}
            {item.charge == 1 ? <LockBadge /> : <View />}
            <Text
              style={{ color: "white", fontSize: 16, width: width / 1.7 }}
              numberOfLines={1}
            >
              {item.episodeName}
            </Text>
          </View>
        }
        subtitle={item.episodeDate + " (" + item.episodeNo + "화)"}
        onPress={() => {
          if (!this.state.clicked) {
            this.setState({ clicked: true });
            this.props.handleOnPress(item);
            setTimeout(() => {
              this.setState({ clicked: false });
            }, 800);
          }
        }}
        titleStyle={{ color: "white", fontSize: 16 }}
        subtitleStyle={{ color: "white", fontSize: 12, fontWeight: "300" }}
        chevronColor="white"
        underlayColor="#353b4866"
        rightIcon={{ name: "bookmark-border", color: getColor(item.episodeNo) }}
      />
    );
  }
}

const { width, height } = Dimensions.get("window");
export default EpisodeItem;
