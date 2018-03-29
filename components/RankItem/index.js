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
import { UpBadge, LockBadge, RankBadge } from "../../components";

class RankItem extends Component {
  render() {
    const { item, navigation, index } = this.props;
    let checked = false;
    return (
      <ListItem
        avatar={
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 20,
                  marginRight: 15
                }}
              >
                {index + 1}
              </Text>
            </View>
            <Avatar
              medium
              activeOpacity={0.7}
              imageProps={{ resizeMode: "stretch" }}
              source={{ uri: item.webtoonThumbnail_s }}
            />
          </View>
        }
        title={item.webtoonName}
        subtitle={item.platform}
        onPress={() => {
          if (!checked) {
            checked = true;
            navigation.navigate("episode", { webtoon: item });
            setTimeout(() => {
              checked = false;
            }, 800);
          }
        }}
        titleStyle={{ color: "white", fontSize: 16 }}
        subtitleStyle={{ color: "white", fontSize: 12, fontWeight: "300" }}
        underlayColor="#353b4899"
        hideChevron={false}
        rightIcon={<RankBadge difference={item.difference} />}
      />
    );
  }
}

const { width, height } = Dimensions.get("window");
export default RankItem;
