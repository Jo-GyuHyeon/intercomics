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
  TouchableHighlight,
  Image
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { List, ListItem, Avatar } from "react-native-elements";
import { DayTabs, FooterModal } from "../../components";
import Pie from "react-native-pie";

class InfoScreen extends Component {
  state = {
    page: 1,
    isVisible: false
  };

  render() {
    const { statistics, email, name } = this.props;
    const chart_wh = 180;
    const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#fff"];
    let genre = [];
    let genre_total = 0;
    let platforms = [];
    statistics.genre.map((data, i) => {
      genre.push(data.value);
      genre_total = genre_total + data.value;
    });

    genre.map((data, i) => {
      genre[i] = data / genre_total * 100;
    });

    statistics.platforms.map((data, i) => {
      platforms.push(data.value);
    });

    const sliceColor = ["#F44336", "#2196F3", "#FFEB3B", "#4CAF50", "#FF9800"];
    const nickname = email || name;
    return (
      <View style={{ flex: 1, backgroundColor: "#283442" }}>
        <View
          style={{
            backgroundColor: "#212833",
            justifyContent: "center",
            alignItems: "center",
            elevation: 2,
            shadowOpacity: 0.7,
            shadowOffset: { height: 1 }
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 150,
              height: 150,
              borderRadius: 75
            }}
          >
            <Image
              style={{ width: 150, height: 150, borderRadius: 75 }}
              source={require("../../assets/images/character2.png")}
            />
          </View>
          <Text style={styles.id}>{nickname}</Text>
          <View style={styles.buttonContainer}>
            <Text style={{ color: "white", margin: 10, textAlign: "left" }}>
              정보
            </Text>
          </View>
          <View />
        </View>
        <View style={styles.bodyContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View
              style={{
                width: width / 3 - 15,
                height: 100,
                backgroundColor: "#574b90",
                justifyContent: "center",
                borderRadius: 20
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 20 }}
              >
                구독
              </Text>
              <Text style={{ textAlign: "center", color: "white" }}>
                {statistics.subscribe}
              </Text>
            </View>

            <View
              style={{
                width: width / 3 - 15,
                height: 100,
                backgroundColor: "#212833",
                justifyContent: "center",
                borderRadius: 20
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 20 }}
              >
                에피소드
              </Text>
              <Text style={{ textAlign: "center", color: "white" }}>
                {statistics.episode}
              </Text>
            </View>
            <View
              style={{
                width: width / 3 - 15,
                height: 100,
                borderRadius: 20,
                backgroundColor: "#212833",
                justifyContent: "center"
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 20 }}
              >
                ?
              </Text>
              <Text style={{ textAlign: "center", color: "white" }}>0개</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Pie
              radius={60}
              innerRadius={40}
              series={genre}
              colors={["#e74c3c", "#3498db", "#2ecc71", "#f1c40f"]}
            />
            <View style={{ marginLeft: 80 }}>
              {statistics.genre.map((data, i) => {
                return (
                  <View
                    style={{ flexDirection: "row", alignItems: "center" }}
                    key={i}
                  >
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: colors[i],
                        borderRadius: 5,
                        marginRight: 10
                      }}
                    />
                    <Text style={{ color: "white" }}>{data.type}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#283442"
  },
  headerContainer: {
    flex: 1.2,
    backgroundColor: "#212833"
  },
  avatarContainer: {
    alignItems: "center"
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "white"
  },
  id: {
    color: "white",
    fontSize: 18,
    marginTop: 8
  },
  buttonContainer: {
    backgroundColor: "#212833",
    width: width
  },
  bodyContainer: {
    flex: 2,
    marginTop: 40
  }
});
export default InfoScreen;
