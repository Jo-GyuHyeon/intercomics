import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Images,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import { Avatar } from "react-native-elements";

class SmallCard extends Component {
  render() {
    let clicked = false;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (!clicked) {
              clicked = true;
              this.props.handleOnClick();
              setTimeout(() => {
                clicked = false;
              }, 800);
            }
          }}
        >
          <Avatar
            imageProps={{ resizeMode: "stretch" }}
            source={{ uri: this.props.thumb }}
            activeOpacity={0.7}
            width={width / 3 - 10}
            containerStyle={{ width: width / 3 }}
          />
          <Text
            style={{
              color: "white",
              textAlign: this.props.align || "left",
              marginTop: 5,
              marginLeft: 5,
              fontSize: 14,
              width: width / 3.5
            }}
            numberOfLines={1}
          >
            {this.props.webtoonName}
          </Text>
          <Text
            style={{
              color: "white",
              textAlign: this.props.align || "left",
              marginBottom: 10,
              marginLeft: 5,
              fontSize: 12
            }}
          >
            {this.props.platform}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const { width, height } = Dimensions.get("window");
export default SmallCard;
