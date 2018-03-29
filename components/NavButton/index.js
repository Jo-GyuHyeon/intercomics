import React, { Component } from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

class NavButton extends Component {
  render() {
    const { onPress, iconName, color, size } = this.props;
    let clicked = false;
    return (
      <TouchableWithoutFeedback
        onPressOut={() => {
          if (!clicked) {
            clicked = true;
            onPress();
            setTimeout(() => {
              clicked = false;
            }, 800);
          }
        }}
      >
        <View style={styles.container}>
          <Ionicons name={iconName} color={color} size={size} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginLeft: 8,
    marginRight: 8
  }
});

export default NavButton;
