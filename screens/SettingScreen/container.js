import React, { Component } from "react";
import SettingScreen from "./presenter";
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
  render() {
    const {
      UserActions,
      isLoggedIn,
      webtoonList,
      navigation,
      isPending
    } = this.props;
    return (
      <SettingScreen
        submit={this._submit}
        navigation={navigation}
        webtoonList={webtoonList}
        UserActions={UserActions}
        isPending={isPending}
      />
    );
  }

  _submit = () => {
    const { WebtoonActions, isLoggedIn } = this.props;
    //WebtoonActions.getWebtoon();
  };
}

export default Container;
