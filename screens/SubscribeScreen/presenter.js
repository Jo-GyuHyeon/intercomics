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
import { List, ListItem, Avatar } from "react-native-elements";
import {
  DayTabs,
  FooterModal,
  OrderByModal,
  UpBadge,
  WebtoonItem
} from "../../components";
const dayList = ["mon", "tue", "wed", "thu", "fri", "sat", "sun", "etc"];

const date = new Date();
const d = date.getDay() != 0 ? date.getDay() : 6;

class SubscribeScreen extends Component {
  state = {
    isVisible: false,
    isOvisible: false,
    isScroll: false,
    platformList: "all",
    orderBy: "newupdate",
    day: d
  };

  handleEnd = () => {
    if (
      !this.state.isScroll &&
      !this.props.subscribeList[dayList[this.state.day]].isLast
    ) {
      this.setState({ isScroll: true });

      this.props.SubscribeActions.getSubscribe(this.state.day).then(() => {
        this.setState({
          isScroll: false
        });
      });
    }
  };

  handleDay = day => {
    this.setState({
      day: day
    });
    this.props.SubscribeActions.getSubscribe(day);
  };

  render() {
    const {
      SubscribeActions,
      subscribeList,
      navigation,
      isPending
    } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: "#283442" }}>
        <DayTabs handleDay={this.handleDay} />
        <FlatList
          data={subscribeList[dayList[this.state.day]].list}
          onEndReached={this.handleEnd}
          bounces={!this.props.isPending}
          onEndReachedThreshold={0}
          keyExtractor={(x, i) => i}
          ListFooterComponent={() =>
            isPending ? (
              <ActivityIndicator
                style={{ marginTop: 10 }}
                size="large"
                color="white"
                animating
              />
            ) : null
          }
          renderItem={({ item }) => (
            <WebtoonItem item={item} navigation={navigation} />
          )}
        />
        {isPending ||
        subscribeList[dayList[this.state.day]].list.length != 0 ? null : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              해당 요일에는 구독중인 웹툰이 없습니다.
            </Text>
          </View>
        )}
      </View>
    );
  }
}
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center"
  },
  emptyText: {
    fontSize: 18,
    color: "white",
    opacity: 0.7
  }
});
export default SubscribeScreen;
