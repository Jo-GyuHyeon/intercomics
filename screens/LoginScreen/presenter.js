import React, { Component } from "react";
import { SocialIcon, Divider } from "react-native-elements";

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Alert
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class IntroScreen extends Component {
  state = { clicked: false };
  render() {
    const { submit, isPending } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />

        <View style={{ alignItems: "center", justifyContent: "space-around" }}>
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../../assets/images/logo2.png")}
            resizeMode={"contain"}
          />
          <Image
            style={{ width: 200, height: 20 }}
            source={require("../../assets/images/logo_text.png")}
            resizeMode={"contain"}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.logo} />
        </View>
        <Divider
          style={{
            backgroundColor: "white",
            marginLeft: 24,
            marginRight: 24,
            marginBottom: 20
          }}
        />
        <View style={styles.content}>
          <SocialIcon
            title="Sign In With Facebook"
            button
            type="facebook"
            style={{ marginLeft: 25, marginRight: 25 }}
            onPress={() => {
              if (!this.state.clicked) {
                this.setState({ clicked: true });
                submit();
                setTimeout(() => {
                  this.setState({ clicked: false });
                }, 1000);
              }
            }}
            loading={isPending}
            disabled={isPending}
          />
          <Text
            style={styles.caseText}
            onPress={() => Alert.alert("현재 지원하지 않습니다.")}
          >
            - 다른 방법으로 로그인하기
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212833",
    justifyContent: "center"
  },
  header: {
    paddingTop: 10
  },
  logo: {
    textAlign: "center",
    color: "#fff",
    fontSize: 26,
    fontWeight: "300"
  },
  content: { marginBottom: 150 },
  caseText: {
    color: "white",
    textAlign: "right",
    marginRight: 24,
    marginTop: 8
  }
});
