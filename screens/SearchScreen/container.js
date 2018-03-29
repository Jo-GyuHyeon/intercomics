import React, { Component } from "react";
import { Platform } from "react-native";
import NavButton from "../../components/NavButton";
import SearchScreen from "./presenter";

class Container extends Component {
  static navigationOptions = ({ navigation }) => ({
    ...Platform.select({
      ios: {
        headerLeft: (
          <NavButton
            iconName={"ios-arrow-back"}
            size={30}
            color="white"
            onPress={() => {
              navigation.goBack(null);
            }}
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
      searchList,
      navigation,
      SearchActions,
      isPending,
      isLast
    } = this.props;
    return (
      <SearchScreen
        submit={this._submit}
        isLast={isLast}
        navigation={navigation}
        searchList={searchList}
        SearchActions={SearchActions}
        isPending={isPending}
      />
    );
  }
}

export default Container;
