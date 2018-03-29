import React, { Component } from "react";
import InfoScreen from "./presenter";
import { Platform } from "react-native";
import { NavButton } from "../../components";

class Container extends Component {
  static navigationOptions = ({ navigation }) => ({
    ...Platform.select({
      ios: {
        headerLeft: (
          <NavButton
            iconName={"ios-arrow-back"}
            size={30}
            color="white"
            onPress={() => navigation.goBack(null)}
          />
        )
      },
      android: {
        headerLeft: (
          <NavButton
            iconName={"md-arrow-back"}
            size={24}
            color="white"
            onPress={() => navigation.goBack(null)}
          />
        )
      }
    })
  });
  componentDidMount() {
    const { UserActions } = this.props;
    UserActions.getStatistics();
  }

  render() {
    const { navigation, isPending, statistics, email, name } = this.props;
    return (
      <InfoScreen
        navigation={navigation}
        isPending={isPending}
        statistics={statistics}
        email={email}
        name={name}
      />
    );
  }
}

export default Container;
