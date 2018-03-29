import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { DrawerView, DrawerItems } from "react-navigation";
import { Divider } from "react-native-elements";

class DrawerContent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image
            style={{width:160}}
            source={require("../../assets/images/logo.png")}
            resizeMode={"contain"}
          />
        </View>
        <DrawerItems {...this.props} />
        <Divider style={{ marginBottom: 20, marginTop: 10 }} />
        <Text
          //onPress={() => this.props.UserActions.setLogOut()}
          style={styles.logOutItem}
        >
          평가하러 가기
        </Text>
        <Text
          //onPress={() => this.props.UserActions.setLogOut()}
          style={styles.logOutItem}
        >
          문의 사항
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    height: 250,
    backgroundColor: "#212833",
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
    backgroundColor: "white"
  },
  userName: {
    fontSize: 16,
    fontWeight: "400",
    color: "#fff"
  },
  name: {
    fontSize: 18,
    fontWeight: "300",
    color: "#fff"
  },
  logOutItem: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E73536",
    padding: 10,
    margin: 5,
    borderRadius: 2,
    borderColor: "#E73536",
    borderWidth: 1,
    textAlign: "center"
  }
});

export default DrawerContent;
