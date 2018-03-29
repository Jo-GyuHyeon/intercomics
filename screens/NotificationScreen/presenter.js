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

class NotificationScreen extends Component {
  render() {
    const { navigation } = this.props;
    const notification = navigation.state.params.notification;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#283442",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            backgroundColor: "#212833",
            width: width - 40,
            height: height / 2,
            padding: 20,
            borderRadius: 8
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "400",
              color: "white",
              marginBottom: 10
            }}
          >
            {notification.title}
          </Text>
          <Divider style={{ backgroundColor: "white" }} />
          <Text style={{ fontSize: 18, textAlign: "left", color: "white" }}>
            {notification.content}
          </Text>
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flex: 1
            }}
          >
            <Text style={{ color: "white", textAlign: "right" }}>
              {notification.regdate}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const { width, height } = Dimensions.get("window");

export default NotificationScreen;
