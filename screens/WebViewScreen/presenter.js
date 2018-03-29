import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  Button,
  Images,
  Platform,
  WebView,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  NetInfo
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NavButton } from "../../components/NavButton";

const WEBVIEW_REF = "WEBVIEW_REF";
const first = 0;
const seconde = 0;

class WebViewScreen extends Component {
  state = {
    canGoBack: false,
    abc: true,
    isHeader: true,
    isChange: false
  };

  //헤더에 변경이 있을때만 리렌더링한다.
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isHeader !== nextState.isHeader;
  }

  _handleChange = webViewState => {
    const { navigation, episodeList, EpisodeActions } = this.props;
    const params = navigation.state.params;
    const webtoon = params.webtoon;
    const targetList = episodeList.epRoot[webtoon.platform][webtoon.webtoonId];

    if (this.state.isChange) {
      targetList.map((data, i) => {
        if (data.episodeLink === webViewState.url) {
          EpisodeActions.patchEpisode(webtoon.webtoonId, data.episodeNo);
        }
      });

      this.setState({
        isChange: false
      });
    }
  };

  _handleFirst(evt) {
    first = evt.nativeEvent.locationY;
  }

  _handleEnd(evt) {
    seconde = evt.nativeEvent.locationY;

    if (seconde - first > 0) {
      //Alert.alert("역방향 스크롤 입니다.");
      //this.setState({ isHeader: true });
    } else if (seconde - first < 0) {
      //Alert.alert("아래로 스크롤 중입니다.");
      this.setState({ isHeader: false });
    } else if (seconde - first === 0) {
      this.setState({
        isHeader: !this.state.isHeader
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const params = navigation.state.params;
    var source = { uri: params.episode.episodeLink };
    return (
      <View style={{ backgroundColor: "#000" }}>
        <StatusBar hidden={true} />
        <ScrollView
          style={{ borderColor: "#000" }}
          bounces={false}
          scrollEnabled={false}
          onTouchStart={evt => {
            this._handleFirst(evt);
          }}
          onTouchEnd={evt => {
            this._handleEnd(evt);
          }}
        >
          <WebView
            ref="webview"
            source={source}
            style={styles.webView}
            onNavigationStateChange={WebView => {
              this._handleChange(WebView);
            }}
            onLoadStart={() =>
              this.setState({
                isChange: true
              })
            }
            bounces={false}
            scrollEnabled={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            injectedJavaScript={this.state.cookie}
            startInLoadingState={false}
          />
        </ScrollView>
        {this.state.isHeader ? (
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignContent: "center" }}>
              <MaterialIcons
                name="arrow-back"
                color="white"
                size={25}
                style={{ marginLeft: 16, flex: 0.1 }}
                onPress={() => {
                  this.props.navigation.goBack(null);
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  flex: 1,
                  fontWeight: "400",
                  textAlign: "center",
                  paddingRight: 42
                }}
              >
                {model != "iPhone X" && model != "Simulator"
                  ? params.webtoon.webtoonName +
                    ": " +
                    params.episode.episodeName
                  : ""}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  }

  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }
}

const { width, height } = Dimensions.get("window");
const barHeight = Expo.Constants.statusBarHeight;
let model = null;

if (Platform.OS === "ios" || Platform.OS === "Simulator") {
  model = Expo.Constants.platform.ios.model;
} else {
  model = "android";
}
//Alert.alert(model);

const styles = StyleSheet.create({
  webView: {
    height: 1000,
    width: width,
    marginTop:
      model == "iPhone X" || model == "Simulator"
        ? 0 //Expo.Constants.statusBarHeight
        : 0
  },
  header: {
    backgroundColor: "#B71A1B",
    position: "absolute",
    width: width,
    elevation: 100,
    elevation: 10,
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 2
    },
    justifyContent: "center",
    height:
      model == "iPhone X" || model == "Simulator"
        ? 49 //Expo.Constants.statusBarHeight + 49
        : 49
  }
});

export default WebViewScreen;
