import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Images,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
const days = ["월", "화", "수", "목", "금", "토", "일", "그외"];
const date = new Date();
const day = date.getDay() != 0 ? date.getDay() : 6;

class DayTabs extends Component {
  state = {
    day: day
  };

  render() {
    const getColor = i => {
      if (this.state.day === i) {
        return "white";
      } else {
        return "#bdc3c7";
      }
    };

    const mapToComponent = data => {
      return data.map((toon, i) => {
        return (
          <TouchableOpacity
            style={styles.buttonView}
            key={i}
            index={i}
            onPress={() => {
              this.props.handleDay(i);
              this.setState({ day: i });
            }}
          >
            <Text
              data={toon}
              title={toon.webtoonName}
              style={{ color: getColor(i), fontSize: 12 }}
            >
              {days[i]}
            </Text>
          </TouchableOpacity>
        );
      });
    };
    return <View style={styles.buttonContainer}>{mapToComponent(days)}</View>;
  }
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
    height: 36,
    margin: 0,
    padding: 0,
    borderWidth: 0,
    elevation: 3,
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 1
    }
  },
  buttonView: {
    backgroundColor: "#212833",
    width: width / 8,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0.5
  },
  focus: {
    color: "white",
    fontSize: 16
  },
  noFocus: {
    color: "#bdc3c7"
  }
});

export default DayTabs;
