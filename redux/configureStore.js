import { combineReducers, applyMiddleware, createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import user from "./modules/user";
import cache from "./modules/cache";
import webtoon from "./modules/webtoon";
import subscribe from "./modules/subscribe";
import episode from "./modules/episode";
import initialize from "./modules/initialize";
import search from "./modules/search";
import recent from "./modules/recent";
import rank from "./modules/rank";
import notification from "./modules/notification";

const middlewares = [thunk];

const persistConfig = {
  key: "s676765",
  storage,
  blacklist: [
    // "webtoon",
    // "subscribe",
    // "search",
    // "recent",
    // "rank",
    // "notification",
    // "episode",
    // "initialize",
    // "user"
  ]
};

const reducers = persistCombineReducers(persistConfig, {
  user,
  webtoon,
  cache,
  episode,
  initialize,
  subscribe,
  search,
  recent,
  rank,
  notification
});

const configureStore = () => {
  let store = createStore(reducers, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
