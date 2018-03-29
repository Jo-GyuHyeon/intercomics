import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  NetInfo,
  BackAndroid,
  BackHandler,
  Platform,
  ActivityIndicator
} from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./redux/configureStore";
import { AppContainer } from "./components";

const { persistor, store } = configureStore();

export default class App extends React.Component {
  state = { isLoadingComplete: false, isNetError: false, isPending: false };

  componentDidMount() {
    this._checkNetWork();
  }

  _checkNetWork() {
    this.setState({ isPending: true });
    fetch("https://google.com")
      .then(response => {
        this.setState({ isNetError: false });
      })
      .catch(error => {
        this.setState({ isPending: true });
        console.log(error);
      });
  }
  _exitApp() {
    BackHandler.exitApp();
  }
  _isError() {
    return Platform.OS == "android"
      ? Alert.alert(
          "네트워크 오류",
          "인터넷 연결을 확인해 주세요.",
          [
            {
              text: "종료",
              onPress: () => {
                this._exitApp();
              }
            }
          ],
          { cancelable: false }
        )
      : Alert.alert(
          "네트워크 오류",
          "인터넷 연결을 확인해 주세요.",
          [
            {
              text: "다시시도",
              onPress: () => {
                this._checkNetWork();
              }
            }
          ],
          { cancelable: false }
        );
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar hidden={false} barStyle="light-content" />
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
_loadingAssetsAsync = async () => {
  return Promise.all([
    Asset.loadAsync([
      require("./assets/images/splash.jpeg"),
      require("./assets/images/banner.png"),
      require("./assets/images/logo.png"),
      require("./assets/images/intro1.png"),
      require("./assets/images/intro2.png"),
      require("./assets/images/intro3.png")
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      ...MaterialIcons.font
    })
  ]);
};

_handleLoadingError = error => {
  console.log(error);
};

_handleLoadingFinish = async () => {
  this.setState({ isLoadingComplete: true });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
