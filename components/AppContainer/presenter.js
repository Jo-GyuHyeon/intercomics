import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { AppLoading } from "expo";
import { LogInNavigation } from "../../navigation";
import DrawerNavigation from "../../navigation/DrawerNavigation";
const days = ["월", "화", "수", "목", "금", "토", "일", "그외"];
const date = new Date();
const d = date.getDay() != 0 ? date.getDay() : 6;

class AppContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
  };
  state = {
    isLodding: false
  };
  componentDidMount() {
    console.log("AppContainer did mount.");
    if (this.props.isLoggedIn == true) {
      this.props.RecentActions.getRecent();
      this.props.RankActions.getRank();
      this.props.SubscribeActions.getSubscribe(d);
      this.props.InitializeActions.getPlatforms()
        .then(() => {
          this.props.WebtoonActions.getWebtoon("all", d, "newupdate").then(
            () => {
              this.props.WebtoonActions.getWebtoon("all", 8, "newupdate")
                .then(() => {
                  this.props.WebtoonActions.getWebtoon("all", 9, "newupdate");
                })
                .then(() => {
                  this.setState({ isLodding: true });
                });
            }
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReciveProps");
    if (nextProps.isLoggedIn == true) {
      this.props.RecentActions.getRecent();
      this.props.RankActions.getRank();
      this.props.InitializeActions.getPlatforms()
        .then(() => {
          this.props.WebtoonActions.getWebtoon("all", d, "newupdate").then(
            () => {
              this.props.WebtoonActions.getWebtoon("all", 8, "newupdate")
                .then(() => {
                  this.props.WebtoonActions.getWebtoon("all", 9, "newupdate");
                })
                .then(() => {
                  this.setState({ isLodding: true });
                });
            }
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { isLoggedIn, isPendding, id, name, token } = this.props;
    if (!this.state.isLodding && isLoggedIn) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#212833"
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {isLoggedIn ? <DrawerNavigation /> : <LogInNavigation />}
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default AppContainer;
