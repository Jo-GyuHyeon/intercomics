import React from "react";
import { View, Text } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const LockBadge = props => {
  return (
    <View
      style={{
        backgroundColor: "#2980b9",
        marginRight: 5,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 2,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 0
      }}
    >
      <Ionicons name="md-lock" color="white" size={16} style={{ flex: 1 }} />
    </View>
  );
};

export default LockBadge;
