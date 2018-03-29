import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Images,
  StyleSheet,
  Dimensions
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { UpBadge } from "../../components";

class WebtoonItem extends Component {
  render() {
    const { item, navigation, RecentActions } = this.props;
    let clicked = false;
    return (
      <ListItem
        avatar={
          <Avatar
            medium
            activeOpacity={0.7}
            imageProps={{ resizeMode: "stretch" }}
            source={{ uri: item.webtoonThumbnail_s }}
          />
        }
        title={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 9,
              marginTop: 4,
              marginBottom: 2
            }}
          >
            {item.isUpdate ? <UpBadge value="UP" /> : <View />}
            {item.isNew ? <UpBadge value="NEW" /> : <View />}
            <Text
              style={{ color: "white", fontSize: 16, width: width / 1.7 }}
              numberOfLines={1}
            >
              {item.webtoonName}
            </Text>
          </View>
        }
        subtitle={item.platform}
        onPress={() => {
          if (!clicked) {
            clicked = true;
            navigation.navigate("episode", { webtoon: item });
            setTimeout(() => {
              clicked = false;
            }, 800);
          }
        }}
        titleStyle={{ color: "white", fontSize: 16 }}
        subtitleStyle={{ color: "white", fontSize: 12, fontWeight: "300" }}
        chevronColor="white"
        underlayColor="#353b4866"
      />
    );
  }
}

const { width, height } = Dimensions.get("window");

export default WebtoonItem;
