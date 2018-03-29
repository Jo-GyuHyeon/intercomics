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
  ScrollView,
  Dimensions
} from "react-native";
import { Avatar, Button, List, ListItem } from "react-native-elements";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { RankItem } from "../../components";

const businesses = [
  {
    name: "인기순 top10",
    ranks: [
      { webtoonName: "신의탑" },
      { webtoonName: "드래곤볼" },
      { webtoonName: "나이트런" },
      { webtoonName: "갓오브하이스쿨" },
      { webtoonName: "조규현노답" }
    ]
  },
  {
    name: "인기순 top10",
    ranks: [
      { webtoonName: "신의탑" },
      { webtoonName: "드래곤볼" },
      { webtoonName: "나이트런" },
      { webtoonName: "갓오브하이스쿨" },
      { webtoonName: "조규현노답" }
    ]
  },
  {
    name: "인기순 top10",
    ranks: [
      { webtoonName: "신의탑" },
      { webtoonName: "드래곤볼" },
      { webtoonName: "나이트런" },
      { webtoonName: "갓오브하이스쿨" },
      { webtoonName: "조규현노답" }
    ]
  }
];

class RankScreen extends Component {
  state = {
    index: 0
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.index !== nextState.index;
  }

  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={3}
        activeDotIndex={this.state.index}
        containerStyle={{ backgroundColor: "#283442" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 4,
          backgroundColor: "rgba(255, 255, 255, 0.92)"
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  renderItem = (object, index) => (
    <View
      style={{
        width: width / 1.2,
        height: height / 1.5
      }}
      key={index}
    >
      <View
        style={{
          height: 40,
          backgroundColor: "#283442",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            marginTop: 10,
            fontWeight: "100"
          }}
        >
          {object.item.name}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          backgroundColor: "#212833",
          padding: 10,
          borderRadius: 4
        }}
      >
        <List
          containerStyle={{
            borderTopWidth: 0,
            backgroundColor: "#212833",
            marginTop: 0
          }}
        >
          <FlatList
            data={object.item.ranks}
            bounces={false}
            keyExtractor={(x, i) => i}
            renderItem={({ item, index }) => (
              <RankItem
                item={item}
                index={index}
                navigation={this.props.navigation}
              />
            )}
          />
        </List>
      </View>
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          firstItem={0}
          sliderWidth={width}
          itemWidth={width / 1.2}
          data={this.props.rankList}
          renderItem={this.renderItem}
          containerCustomStyle={styles.carousel}
          onSnapToItem={index => this.setState({ index: index })}
        />
        {this.pagination}
      </View>
    );
  }
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  carousel: {
    backgroundColor: "#283442"
  },
  webtoonContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  infoContainer: {
    justifyContent: "space-between"
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },
  writer: {
    color: "white"
  },
  genre: {
    color: "white",
    fontSize: 12
  },
  platform: {
    color: "white"
  }
});
export default RankScreen;
