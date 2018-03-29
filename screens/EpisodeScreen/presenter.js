import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Images,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions
} from "react-native";
import { Avatar, Button, List, ListItem, Divider } from "react-native-elements";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { UpBadge, LockBadge, EpisodeItem } from "../../components";
const days = ["", "월", "화", "수", "목", "금", "토", "일", "그외", "완결"];

class EpisodeScreen extends Component {
  state = {
    orderBy: true,
    isScroll: false,
    isReset: false,
    isLodding: false
  };

  componentWillReceiveProps(nextProps) {
    const { navigation, EpisodeActions, isLast, episodeList } = this.props;
    const webtoon = navigation.state.params.webtoon;
    const temp =
      nextProps.episodeList.epRoot[webtoon.platform][webtoon.webtoonId];
    let wait = new Promise(resolve => setTimeout(resolve, 1800)); // Smaller number should work
    if (temp != null && (!this.state.isLodding || this.state.isReset)) {
      this.setState({ isLodding: true, isReset: false });
      const lastNum = nextProps.lastNum;
      const recentEpisodeNo = nextProps.recentEpisodeNo;

      if (temp.length > 0 && recentEpisodeNo > 0) {
        wait.then(() => {
          if (this.state.orderBy) {
            this.refs.listRef.scrollToIndex({
              animated: false,
              index: recentEpisodeNo - 1
            });
          } else {
            this.refs.listRef.scrollToEnd();
          }
        });
      }
    }
  }

  componentDidMount() {
    const { episodeList, EpisodeActions, navigation } = this.props;
    const webtoon = navigation.state.params.webtoon;
    this.setState({ isScroll: true });
    if (!this.state.isLodding) {
      EpisodeActions.getEpisode(webtoon.webtoonId, webtoon.platform, true).then(
        () => {
          this.setState({
            isScroll: false,
            isLodding: true
          });
        }
      );
    }
  }

  getItemLayout = (data, index) => ({ length: 50, offset: 70 * index, index });

  handleEnd = () => {
    const {
      episodeList,
      navigation,
      EpisodeActions,
      isPending,
      isLast
    } = this.props;
    const webtoon = navigation.state.params.webtoon;

    if (!isPending && !this.state.isScroll && !isLast && this.state.isLodding) {
      this.setState({ isScroll: true });
      EpisodeActions.getEpisode(
        webtoon.webtoonId,
        webtoon.platform,
        this.state.orderBy
      ).then(() => {
        this.setState({
          isScroll: false
        });
      });
    }
  };

  handleOnPress = item => {
    const { navigation, EpisodeActions } = this.props;
    const webtoon = navigation.state.params.webtoon;
    EpisodeActions.patchEpisode(webtoon.webtoonId, item.episodeNo);
    navigation.navigate("webview", { episode: item, webtoon: webtoon });
  };

  changeOrderBy(webtoon) {
    this.setState({ orderBy: !this.state.orderBy, isReset: true });
    this.props.EpisodeActions.getEpisode(
      webtoon.webtoonId,
      webtoon.platform,
      !this.state.orderBy,
      0
    ).then(() => {
      this.refs.listRef.scrollToOffset({
        y: 0,
        animated: false
      });
    });
  }

  render() {
    const {
      episodeList,
      navigation,
      EpisodeActions,
      SubscribeActions,
      isSubscribe,
      recentEpisodeNo,
      lastNum,
      isLast
    } = this.props;
    const webtoon = navigation.state.params.webtoon;
    let day = webtoon.day;
    let splitDay = day.split(" ");
    let stringDay = "";

    for (i = 0; i < splitDay.length; i++) {
      if (i == 0) {
        stringDay = days[splitDay[i]];
      } else {
        stringDay = stringDay + ", " + days[splitDay[i]];
      }
    }

    if (day == 9) {
      day = 8;
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#212833",
          borderTopColor: "black",
          borderTopWidth: StyleSheet.hairlineWidth
        }}
      >
        <View style={styles.webtoonContainer}>
          <Avatar
            imageProps={{ resizeMode: "stretch" }}
            source={{ uri: webtoon.webtoonThumbnail_s }}
            width={120}
            activeOpacity={0.7}
          />
          <View style={styles.infoContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.title}>{webtoon.webtoonName}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (!isSubscribe) {
                    EpisodeActions.set_subcribe();
                    SubscribeActions.postSubscribe(webtoon.webtoonId, day - 1);
                  } else {
                    EpisodeActions.set_subcribe();
                    SubscribeActions.deleteSubscribe(
                      webtoon.webtoonId,
                      day - 1
                    );
                  }
                }}
              >
                {isSubscribe ? (
                  <Ionicons name="md-star-outline" color="red" size={30} />
                ) : (
                  <Ionicons name="md-star-outline" color="white" size={30} />
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.day}>{"[" + stringDay + "]"}</Text>
              <Text style={styles.writer}>{webtoon.writer}</Text>
              <Text style={styles.genre}>
                {webtoon.genre.replace(" ", "/")}
              </Text>
              <Text style={styles.platform}>{webtoon.platform}</Text>
            </View>
          </View>
        </View>
        <View style={styles.reviewContainer}>
          <View style={styles.leftContainer}>
            <Ionicons name="ios-alert-outline" color="white" size={25} />
          </View>
          <Text style={styles.text}>정식 버전을 기대해주세요!</Text>
          {/*<View style={styles.rightContainer}>
            <Ionicons name="ios-arrow-forward" color="white" size={25} />
              </View>*/}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={
              recentEpisodeNo > 0
                ? `이어보기 (${recentEpisodeNo + 1}화)`
                : "첫 화 보기"
            }
            backgroundColor="#3F51B5"
            onPress={() => {
              if (
                recentEpisodeNo >=
                episodeList.epRoot[webtoon.platform][webtoon.webtoonId].length
              ) {
                Alert.alert(
                  "알림",
                  "더 이상 감상하실 웹툰이 없습니다.",
                  [
                    {
                      text: "확인",
                      onPress: () => console.log("OK Pressed")
                    }
                  ],
                  { cancelable: false }
                );
              } else if (recentEpisodeNo == 0) {
                const length =
                  episodeList.epRoot[webtoon.platform][webtoon.webtoonId]
                    .length;
                let target = null;
                if (!this.state.orderBy) {
                  this.setState({ orderBy: true, isReset: true });
                  this.props.EpisodeActions.getEpisode(
                    webtoon.webtoonId,
                    webtoon.platform,
                    true,
                    0
                  ).then(() => {
                    target =
                      episodeList.epRoot[webtoon.platform][
                        webtoon.webtoonId
                      ][0];
                  });
                }
                target =
                  episodeList.epRoot[webtoon.platform][webtoon.webtoonId][0];

                /*this.props.navigation.navigate("webview", {
                  episode: target,
                  webtoon: webtoon
                });*/
              } else {
                const length =
                  episodeList.epRoot[webtoon.platform][webtoon.webtoonId]
                    .length;
                const target = this.state.orderBy
                  ? episodeList.epRoot[webtoon.platform][webtoon.webtoonId][
                      recentEpisodeNo
                    ]
                  : episodeList.epRoot[webtoon.platform][webtoon.webtoonId][
                      length - recentEpisodeNo - 1
                    ];

                this.props.navigation.navigate("webview", {
                  episode: target,
                  webtoon: webtoon
                });
              }
            }}
          />
        </View>
        <View style={styles.listContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={styles.sortView}
              onPress={() => {
                console.log(this.state.orderBy + "가 반대로 바뀜");
                this.setState({
                  orderBy: !this.state.orderBy,
                  isReset: true
                });
                console.log(!this.state.orderBy + "가 변햇습니다.");
                
                EpisodeActions.sortEpisodeList(webtoon, !this.state.orderBy);
              }}
            >
              <Ionicons
                style={styles.dropIcon}
                name="ios-list"
                color="white"
                size={24}
              />
              <Text style={styles.sort}>정렬 순서</Text>
            </TouchableOpacity>
          </View>
          <List
            containerStyle={{
              flex: 1,
              marginTop: 0,
              backgroundColor: "#283442"
            }}
          >
            <FlatList
              ref="listRef"
              sstyle={
                { flex: 1 } //initialNumToRender={1}
              }
              removeClippedSubviews
              disableVirtualization
              data={episodeList.epRoot[webtoon.platform][webtoon.webtoonId]}
              getItemLayout={this.getItemLayout}
              onEndReached={this.handleEnd}
              onEndReachedThreshold={10}
              keyExtractor={(x, i) => i}
              ListFooterComponent={() =>
                this.props.isPending ? (
                  <ActivityIndicator
                    style={{ marginTop: 10 }}
                    size="large"
                    color="white"
                    animating
                  />
                ) : null
              }
              renderItem={({ item, index }) => (
                <EpisodeItem
                  item={item}
                  isUpdate={webtoon.isUpdate}
                  lastNum={lastNum}
                  index={index}
                  navigation={navigation}
                  EpisodeActions={EpisodeActions}
                  recentEpisodeNo={this.props.recentEpisodeNo}
                  handleOnPress={this.handleOnPress}
                />
              )}
            />
          </List>
        </View>
      </View>
    );
  }
}
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  webtoonContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: "#283442",
    flexDirection: "row"
  },
  infoContainer: {
    marginLeft: 10,
    justifyContent: "space-between",
    flex: 1
  },
  buttonContainer: {
    margin: 10
  },
  listContainer: {
    backgroundColor: "#283442",
    flex: 1
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },
  day: {
    color: "white",
    fontSize: 14
  },
  writer: {
    color: "white",
    fontSize: 14
  },
  genre: {
    color: "white",
    fontSize: 14
  },
  platform: {
    color: "white",
    fontSize: 14
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#283442",
    padding: 10
  },
  text: {
    color: "white",
    marginLeft: 16
  },
  leftContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 8
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: "contain",
    backgroundColor: "white"
  },
  sortView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  sort: {
    color: "white",
    fontSize: 14,
    textAlign: "right",
    marginRight: 10
  },
  dropIcon: {
    marginRight: 6
  }
});
export default EpisodeScreen;
