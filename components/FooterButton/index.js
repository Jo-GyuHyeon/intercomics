import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

class FooterButton extends Component {
  render() {
    const { item, navigation, platformList } = this.props;
    let size = "";
    if (platformList != "all") {
      size = platformList.split(",").length;
    }

    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={this.props.handleModal}
        >
          <Ionicons name="ios-book-outline" color="white" size={24} />
          <Text style={styles.footerText}>
            {platformList == "all" ? "모든 웹툰" : size + "개 선택"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={this.props.handleOderModal}
        >
          <Ionicons name="ios-list" color="white" size={24} />
          <Text style={styles.footerText}>최신순</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#212833",
    height: 50,
    flexDirection: "row",
    paddingTop: 4,
    paddingBottom: 8
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  footerText: {
    color: "white",
    fontSize: 12,
    fontWeight: "100"
  }
});

export default FooterButton;
