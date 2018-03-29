import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Images,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import { CheckBox } from "react-native-elements";

class FooterModal extends Component {
  state = {
    initialize: false,
    prev: {}
  };

  componentDidMount() {
    if (!this.state.initialize) {
      const platformList = this.props.platformList;
      platformList.map((data, i) => {
        return this.setState(prevState => ({
          ...prevState,
          tempList: ["All", ...platformList],
          All: true,
          [data]: true,
          num: platformList.length,

          ...prevState.prev,
          prev: {
            ...prevState.prev,
            All: true,
            [data]: true,
            num: platformList.length
          }
        }));
      });
    }
  }

  handleToggle = platform => {
    const length = this.props.platformList.length;

    if (this.state[platform]) {
      this.setState({
        All: false,
        [platform]: false,
        num: this.state.num - 1
      });
    } else {
      if (this.state.num + 1 == length) {
        this.setState({
          [platform]: true,
          All: true,
          num: this.state.num + 1
        });
      } else if (this.state.num != length) {
        this.setState({
          [platform]: true,
          num: this.state.num + 1
        });
      } else if (this.state.num == length) {
        this.setState({
          [platform]: true,
          num: this.state.num + 1
        });
      }
    }
  };

  handleCancle() {
    this.props.platformList.map(data => {
      this.state.tempList.map(data => {
        return this.setState({
          All: this.state.prev.All,
          num: this.state.prev.num,
          [data]: this.state.prev[data]
        });
      });
    });
  }

  handleSuccess() {
    const tempList = [];
    let platforms = "";

    this.state.tempList.map(data => {
      if (this.state[data] == true) {
        tempList.push(data);
      }
    });

    if (this.state.All) {
      platforms = "all";
    } else {
      for (i = 0; i < tempList.length; i++) {
        platforms = tempList[i] + " ";
      }
      platforms.trim();
      platforms.split(" ", ",");
    }

    this.props.platformList.map(data => {
      return this.setState(prevState => ({
        ...prevState,
        prev: {
          ...prevState.prev,
          All: this.state.All,
          num: this.state.num,
          [data]: this.state[data]
        }
      }));
    });

    return platforms;
  }

  render() {
    const { platformList } = this.props;
    const mapToButton = buttonList => {
      return buttonList.map((data, i) => {
        if (this.state != null) {
          return (
            <CheckBox
              center
              key={i}
              title={data}
              checked={this.state[data]}
              onPress={() => {
                this.handleToggle(data);
              }}
              center={true}
              containerStyle={{
                borderWidth: 1,
                width: width / 2 - 30,
                backgroundColor: "#283442"
              }}
              textStyle={{ color: "white" }}
              checkedColor="#2ecc71"
            />
          );
        }
      });
    };

    return (
      <Modal isVisible={this.props.isVisible} style={styles.bottomModal}>
        <View style={{ backgroundColor: "#212833" }}>
          <Text
            style={{
              color: "white",
              textAlign: "left",
              paddingLeft: 20,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            웹툰 플랫폼
          </Text>
        </View>
        <View style={{ backgroundColor: "#283442", padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap"
            }}
          >
            <CheckBox
              center
              title="ALL"
              checked={this.state.All}
              onPress={() => {
                platformList.map(data => {
                  if (this.state.All) {
                    return this.setState({
                      All: false,
                      [data]: false,
                      num: 0
                    });
                  } else if (!this.state.All) {
                    return this.setState({
                      All: true,
                      [data]: true,
                      num: platformList.length
                    });
                  }
                });
              }}
              center={true}
              containerStyle={{
                borderWidth: 1,
                width: width / 2 - 30,
                backgroundColor: "#283442"
              }}
              textStyle={{ color: "white" }}
              checkedColor="#2ecc71"
            />
            {mapToButton(platformList)}
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#212833",
            flexDirection: "row",
            justifyContent: "space-between",
            height: 40
          }}
        >
          <TouchableOpacity
            style={{
              width: width / 2,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              this.props.handleModal();
              this.handleCancle();
            }}
          >
            <Text style={{ color: "white" }}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: width / 2,
              alignItems: "center",
              justifyContent: "center",
              borderLeftWidth: 1
            }}
            onPress={() => {
              if (this.state.num == 0) {
                Alert.alert("하나 이상의 플랫폼을 선택해주세요");
                this.handleCancle();
              } else {
                this.props.handleModal();
                this.props.handlePlatform(this.handleSuccess());
              }
            }}
          >
            <Text style={{ color: "white" }}>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const { width, hieght } = Dimensions.get("window");
const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  }
});

export default FooterModal;
