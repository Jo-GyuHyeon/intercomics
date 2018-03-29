import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { List, ListItem, Avatar } from "react-native-elements";
import {
  DayTabs,
  FooterModal,
  OrderByModal,
  UpBadge,
  WebtoonItem,
  FooterButton
} from "../../components";

const dayList = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
  "etc",
  "finish"
];

const date = new Date();
const d = date.getDay() != 0 ? date.getDay() : 6;

class DailyScreen extends Component {
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
      !this.props.toonList[dayList[this.state.day]].isLast
    ) {
      this.setState({ isScroll: true });

      this.props.WebtoonActions.getWebtoon(
        this.state.platformList,
        this.state.day,
        this.state.orderBy
      ).then(() => {
        this.setState({
          isScroll: false
        });
      });
    }
  };

  handleModal = () => {
    this.setState({
      isVisible: !this.state.isVisible
    });
  };

  handleOderModal = () => {
    this.setState({
      isOvisible: !this.state.isOvisible
    });
  };

  handlePlatform = platformList => {
    if (platformList != this.state.platformList) {
      this.setState({ platformList: platformList });
      this.props.WebtoonActions.getWebtoon(
        platformList,
        this.state.day,
        this.state.orderBy
      );
    }
  };

  handleOrderBy = orderBy => {
    this.setState({
      orderBy
    });
  };

  handleDay = day => {
    this.setState({
      day: day
    });
    this.props.WebtoonActions.getWebtoon(
      this.state.platformList,
      day,
      this.state.orderBy
    );
  };

  render() {
    const {
      toonList,
      navigation,
      isPending,
      isUpdate,
      RecentActions
    } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#283442" }}>
        <DayTabs handleDay={this.handleDay} />
        <OrderByModal
          isVisible={this.state.isOvisible}
          handleModal={this.handleOderModal}
          handlePlatform={this.handleOrderBy}
        />
        <FooterModal
          isVisible={this.state.isVisible}
          handleModal={this.handleModal}
          handlePlatform={this.handlePlatform}
        />
        <FlatList
          data={toonList[dayList[this.state.day]].list}
          onEndReached={this.handleEnd}
          bounces={!isPending}
          onEndReachedThreshold={0.1}
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
          renderItem={({ item, index }) => (
            <WebtoonItem
              item={item}
              navigation={navigation}
              RecentActions={RecentActions}
            />
          )}
        />
        <FooterButton
          handleModal={this.handleModal}
          handleOderModal={this.handleOderModal}
          platformList={this.state.platformList}
        />
      </View>
    );
  }
}

export default DailyScreen;
