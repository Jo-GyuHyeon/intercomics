import React, { Component } from "react";
import { View, Text } from "react-native";

class RankBadge extends Component {
  render() {
    const { difference } = this.props;
    let item = null;
    switch (difference) {
      case 0:
        item = (
          <View>
            <Text style={{ color: "white", fontSize: 28 }}> - </Text>
          </View>
        );
        break;
      case 99:
        item = (
          <View>
            <Text style={{ color: "white", fontSize: 16 }}> New </Text>
          </View>
        );
        break;

      case difference > 0:
        item = (
          <View>
            <Text style={{ color: "white", fontSize: 16 }}>
              {" "}
              + {difference}{" "}
            </Text>
          </View>
        );
        break;

      case difference < 0:
        item = <View>
            <Text style={{ color: "white", fontSize: 16 }}>
              {" "}
              - {difference}{" "}
            </Text>
          </View>;
        break;
    }
    return <View>{item}</View>;
  }
}
export default RankBadge;
