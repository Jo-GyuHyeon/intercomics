import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Images,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import Modal from "react-native-modal";
import { CheckBox } from "react-native-elements";

class OrderByModal extends Component {
  render() {
    return (
      <Modal isVisible={this.props.isVisible} style={styles.bottomModal}>
        <View style={{ backgroundColor: "#22313F" }}>
          <Text
            style={{
              color: "white",
              textAlign: "left",
              paddingLeft: 20,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            정렬 순서
          </Text>
        </View>
        <View style={{ backgroundColor: "#2c3e50", padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap"
            }}
          >
            <CheckBox
              center
              title="최신 순"
              checked={true}
              onPress={() => {}}
              center={true}
              containerStyle={{
                width: width / 2 - 30,
                backgroundColor: "#2c3e50"
              }}
              textStyle={{ color: "white" }}
              checkedColor="#2ecc71"
            />
            {/*<CheckBox
              center
              title="인기 순"
              checked={true}
              onPress={() => {}}
              center={true}
              containerStyle={{
                width: width / 2 - 30,
                backgroundColor: "#2c3e50"
              }}
              textStyle={{ color: "white" }}
              checkedColor="#2ecc71"
            />*/}
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#22313F",
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
              //this.handleCancle();
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
              this.props.handleModal();
              //this.props.handlePlatform(this.handleSuccess());
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

export default OrderByModal;
