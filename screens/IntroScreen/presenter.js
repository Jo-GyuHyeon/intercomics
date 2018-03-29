import React, { Component } from "react";
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View, // Container component
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IntroButton from "../../components/IntroButton";
import Swiper from "../../components/Swiper";

export default class IntroScreen extends Component {
  componentDidMount() {
    const { isIntro } = this.props;
    if (!isIntro) {
      navigation.navigate("login");
    }
  }
  render() {
    return (
      <View>
        <StatusBar hidden={true} />
        {/* First screen */}
        <Swiper navigation={this.props.navigation}>
          <View style={[styles.slide, { backgroundColor: "#2ecc71" }]}>
            <Image
              style={{ width: 200, resizeMode: "stretch", height: 180 }}
              source={require("../../assets/images/intro1.png")}
            />
            <Text style={styles.header}>EASY</Text>
            <Text style={styles.text}>
              간편하고, 손 쉽게 여러 웹툰을 즐기세요!
            </Text>
          </View>
          {/* Second screen */}
          <View style={[styles.slide, { backgroundColor: "#4AAFEE" }]}>
            <Image
              style={{ width: 200, resizeMode: "stretch", height: 180 }}
              source={require("../../assets/images/intro2.png")}
            />
            <Text style={styles.header}>FAST</Text>
            <Text style={styles.text}>다양한 플랫폼의 웹툰을 한번에!</Text>
          </View>
          {/* Third screen */}
          <View style={[styles.slide, { backgroundColor: "#f1c40f" }]}>
            <Image
              style={{ width: 200, resizeMode: "stretch", height: 180 }}
              source={require("../../assets/images/intro3.png")}
            />
            <Text style={styles.header}>FUN</Text>
            <Text style={styles.text}>재밌는 웹툰들을 즐기세요!</Text>
          </View>
          {/* Forth screen */}
          <View style={[styles.slide, { backgroundColor: "#8750A1" }]}>
            <Image
              style={{ width: 200, resizeMode: "stretch", height: 180 }}
              source={require("../../assets/images/intro4.png")}
            />
            <Text style={styles.header}>START</Text>
            <Text style={styles.text}>Intercomics와 함께하세요!</Text>
          </View>
        </Swiper>
      </View>
    );
  }
}
const { width, height } = Dimensions.get("window");
const iconStyles = {
  size: 100,
  color: "#FFFFFF"
};
const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center" // Center horizontally
  },
  // Header styles
  header: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15
  },
  // Text below header
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    marginHorizontal: 40,
    fontWeight: "400",
    textAlign: "center"
  }
});
