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

class NotificationListScreen extends Component {
  state = {
    page: 1,
    isVisible: false
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#283442" }}>
        <FlatList
          style={{ flex: 1 }}
          data={this.props.notificationList}
          onEndReached={this.handleEnd}
          onEndReachedThreshold={0}
          keyExtractor={(x, i) => i}
          ListFooterComponent={() =>
            this.props.isPending ? (
              <ActivityIndicator size="large" color="white" animating />
            ) : null
          }
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subtitle={item.regdate}
              onPress={() =>
                this.props.navigation.navigate("notificationContent", {
                  notification: item
                })
              }
              titleStyle={{ color: "white", fontSize: 18 }}
              subtitleStyle={{ color: "white", fontSize: 14 }}
              chevronColor="white"
              underlayColor="#2d2d2d"
            />
          )}
        />
      </View>
    );
  }
}
const { width, height } = Dimensions.get("window");

export default NotificationListScreen;
