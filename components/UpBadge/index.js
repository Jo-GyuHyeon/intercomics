import React from "react";
import { View, Text } from "react-native";

const UpBadge = props => {
  return (
    <View
      style={{
        backgroundColor: "#c0392b",
        marginRight: 5,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 2
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 10,
          padding: 2,
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        {props.value}
      </Text>
    </View>
  );
};

export default UpBadge;
