import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Images,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { List, ListItem, Avatar, Divider } from "react-native-elements";
import { DayTabs, FooterModal } from "../../components";

class SettingScreen extends Component {
  state = {
    page: 1,
    isVisible: false
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#283442" }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", height: 62 }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              this.props.UserActions.facebookWithdrawal();
            }}
          >
            <MaterialIcons
              style={{ margin: 16 }}
              name="block"
              color="white"
              size={26}
            />
            <Text style={{ color: "white", fontSize: 18 }}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 62 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              console.log(this.props.UserActions);
              this.props.UserActions.facebookLogout();
            }}
          >
            <Ionicons
              style={{ margin: 16 }}
              name="md-power"
              color="white"
              size={26}
            />
            <Text style={{ color: "white", fontSize: 18 }}>로그 아웃</Text>
          </TouchableOpacity>
        </View>
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
export default SettingScreen;
