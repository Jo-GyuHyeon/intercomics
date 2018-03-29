import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Images,
  TouchableOpacity,
  Platform,
  FlatList,
  Dimensions,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { NavButton, WebtoonItem } from "../../components";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SearchBar, Badge, ListItem, Avatar } from "react-native-elements";

class SearchScreen extends Component {
  state = {
    text: "null",
    isScroll: false
  };
  componentDidMount() {
    this.props.SearchActions.setInitSearh();
  }

  handleEnd = () => {
    if (!this.state.isScroll && !this.props.isLast) {
      this.setState({ isScroll: true });

      this.props.SearchActions.getSearch(this.state.text).then(() => {
        this.setState({
          isScroll: false
        });
      });
    }
  };

  render() {
    const { navigation, isPending, searchList, SearchActions } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#283442" }}>
        <SearchBar
          containerStyle={{ backgroundColor: "#212833" }}
          inputStyle={{ color: "white", backgroundColor: "#283442" }}
          placeholder=" 웹툰, 작가 .."
          keyboardType="default"
          returnKeyType="search"
          selectionColor="white"
          onSubmitEditing={() => {
            SearchActions.getSearch(this.state.text);
          }}
          onChangeText={text => {
            this.setState({ text: text });
          }}
        />
        {searchList.length == 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>검색된 웹툰이 없습니다.</Text>
          </View>
        ) : null}
        {isPending ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            style={{ borderWidth: 0 }}
            data={searchList}
            //onEndReached={this.handleEnd}
            bounces={false}
            keyExtractor={(x, i) => i}
            ListFooterComponent={() =>
              isPending ? (
                <ActivityIndicator size="large" color="white" animating />
              ) : null
            }
            renderItem={({ item }) => (
              <WebtoonItem item={item} navigation={navigation} />
            )}
          />
        )}
      </View>
    );
  }
}
const { width, hieght } = Dimensions.get("window");
const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  emptyText: {
    fontSize: 18,
    color: "white",
    opacity: 0.7
  }
});
export default SearchScreen;
