import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { DayTabs, FooterModal, SmallCard } from "../../components";

class HomeScreen extends Component {
  state = {
    isVisible: true
  };
  render() {
    const { id, name, token, isLoggedIn, recentList, isPending } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#283442" }}>
        <View style={styles.bannerContainer}>
          <Image
            style={{ flex: 1, width: null, height: null }}
            resizeMode="cover"
            source={require("../../assets/images/banner.png")}
          />
        </View>
        <View style={styles.subscribeContainer}>
          <Text style={{ color: "white", marginBottom: 5, marginLeft: 5 }}>
            최근 본
          </Text>
          <FlatList
            horizontal={true}
            data={recentList}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            keyExtractor={(x, i) => i}
            ListFooterComponent={() =>
              isPending ? (
                <ActivityIndicator size="large" color="white" animating />
              ) : null
            }
            renderItem={({ item }) => (
              <SmallCard
                webtoonName={item.webtoonName}
                thumb={item.webtoonThumbnail_s}
                platform={item.platform}
                handleOnClick={() =>
                  this.props.navigation.navigate("episode", {
                    webtoon: item
                  })
                }
              />
            )}
          />
        </View>
      </View>
    );
  }
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  bannerContainer: {
    flex: 0.76
  },
  subscribeContainer: {
    marginTop: 10,
    flex: 0.36
  }
});
export default HomeScreen;
