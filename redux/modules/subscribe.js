//import
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import * as cacheActions from "./cache";
import { API_URL } from "../../constants";

//Action
const POST_SUBSCRIBE_PENDING = "POST_SUBSCRIBE_PENDING";
const POST_SUBSCRIBE_SUCCESS = "POST_SUBSCRIBE_SUCCESS";
const POST_SUBSCRIBE_FAILURE = "POST_SUBSCRIBE_FAILURE";

const GET_SUBSCRIBE_PENDING = "GET_SUBSCRIBE_PENDING";
const GET_SUBSCRIBE_SUCCESS = "GET_SUBSCRIBE_SUCCESS";
const GET_SUBSCRIBE_FAILURE = "GET_SUBSCRIBE_FAILURE";

const DELETE_SUBSCRIBE_PENDING = "DELETE_SUBSCRIBE_PENDING";
const DELETE_SUBSCRIBE_SUCCESS = "DELETE_SUBSCRIBE_SUCCESS";
const DELETE_SUBSCRIBE_FAILURE = "DELETE_SUBSCRIBE_FAILURE";

//ActionCreator
export const post_subscribe_pending = createAction("POST_SUBSCRIBE_PENDING");
export const post_subscribe_success = createAction("POST_SUBSCRIBE_SUCCESS");
export const post_subscribe_failure = createAction("POST_SUBSCRIBE_FAILURE");

export const get_subscribe_pending = createAction("GET_SUBSCRIBE_PENDING");
export const get_subscribe_success = createAction("GET_SUBSCRIBE_SUCCESS");
export const get_subscribe_failure = createAction("GET_SUBSCRIBE_FAILURE");

const dayList = ["mon", "tue", "wed", "thu", "fri", "sat", "sun", "etc"];

const initialState = {
  isPending: false,
  isError: false,
  isSubscribe: false,
  day: "",
  subscribeList: {
    mon: {
      list: [],
      scroll: 1,
      timestamp: "",
      isLast: "false"
    },
    tue: {
      list: [],
      scroll: 1,
      timestamp: "",
      isLast: "false"
    },
    wed: {
      list: [],
      scroll: 1,
      timestamp: "",
      isLast: "false"
    },
    thu: {
      list: [],
      scroll: 1,
      timestamp: "",
      isLast: "false"
    },
    fri: {
      list: [],
      scroll: 1,
      timestamp: "",
      isLast: "false"
    },
    sat: {
      list: [],
      scroll: 1,
      timestamp: "",
      isLast: "false"
    },
    sun: {
      list: [],
      scroll: 1,
      timestamp: "",
      isLast: "false"
    },
    etc: {
      list: [],
      scroll: 1,
      timestamp: "",
      isLast: "false"
    }
  }
};

function postSubscribeAPI(webtoonId, jwt) {
  console.log("@postSubscribeAPI");
  console.log(`${API_URL}/subscribe/${webtoonId}`);
  return axios.post(`${API_URL}/subscribe/${webtoonId}`, "", {
    headers: {
      "x-token": jwt,
      "Content-Type": "application.json"
    }
  });
}

function deleteSubscribeAPI(webtoonId, jwt) {
  console.log("@deleteSubscribeAPI");
  console.log(`${API_URL}/subscribe/${webtoonId}`);
  console.log(jwt);
  return axios.delete(`${API_URL}/subscribe/${webtoonId}`, {
    headers: {
      "x-token": jwt,
      "Content-Type": "application.json"
    }
  });
}

function getWebtoonAPI(webtoonId, timestamp) {
  return axios.get(`${API_URL}/webtoon/${webtoonId}`);
}

function getSubscribeAPI(day, scroll, timestamp, jwt) {
  console.log(
    `${API_URL}/subscribe/${dayList[day]}/${scroll}?timestamp=${timestamp}`
  );
  return axios.get(
    `${API_URL}/subscribe/${dayList[day]}/${scroll}?timestamp=${timestamp}`,
    {
      headers: {
        "x-token": jwt,
        "Content-Type": "application.json"
      }
    }
  );
}

export const postSubscribe = (webtoonId, day) => (dispatch, getState) => {
  console.log("@postSubscribe");
  const { user, subscribe } = getState();
  const { timestamp, scroll } = subscribe.subscribeList[dayList[day]];
  const jwt = user.access_token;
  dispatch({ type: POST_SUBSCRIBE_PENDING });

  return postSubscribeAPI(webtoonId, jwt)
    .then(() => {
      return getSubscribeAPI(day, scroll, timestamp, jwt).then(response => {
        return cacheActions
          .cacheWebtoonImage(response.data.subscribe, dispatch)
          .then(changeList => {
            dispatch({
              type: GET_SUBSCRIBE_SUCCESS,
              day: day,
              payload: changeList,
              scroll: scroll,
              prev_timestamp: timestamp,
              current_timestamp: response.data.timestamp
            });
          });
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: POST_SUBSCRIBE_FAILURE });
    });
};

export const deleteSubscribe = (webtoonId, day) => (dispatch, getState) => {
  console.log("@deleteSubscribe");

  dispatch({ type: DELETE_SUBSCRIBE_PENDING });
  const { user, subscribe } = getState();
  const { timestamp, scroll } = subscribe.subscribeList[dayList[day]];
  const jwt = user.access_token;

  return deleteSubscribeAPI(webtoonId, jwt)
    .then(response => {
      return getSubscribeAPI(day, scroll, "123", jwt)
        .then(response => {
          return cacheActions
            .cacheWebtoonImage(response.data.subscribe, dispatch)
            .then(changeList => {
              dispatch({
                type: GET_SUBSCRIBE_SUCCESS,
                day: day,
                payload: changeList,
                scroll: scroll,
                prev_timestamp: "",
                current_timestamp: response.data.timestamp
              });
            });
        })
        .catch(error => {
          console.log(error);
          dispatch({ type: GET_SUBSCRIBE_FAILURE });
        });
    })
    .catch(error => console.log(error));
};

export const getSubscribe = day => (dispatch, getState) => {
  console.log("@getSubscribe");
  dispatch({ type: GET_SUBSCRIBE_PENDING });
  const { user, subscribe } = getState();
  const { timestamp, scroll } = subscribe.subscribeList[dayList[day]];
  const jwt = user.access_token;

  return getSubscribeAPI(day, scroll, timestamp, jwt)
    .then(response => {
      return cacheActions
        .cacheWebtoonImage(response.data.subscribe, dispatch)
        .then(changeList => {
          dispatch({
            type: GET_SUBSCRIBE_SUCCESS,
            day: day,
            isLast: response.data.isLast,
            payload: changeList,
            scroll: scroll,
            prev_timestamp: timestamp,
            current_timestamp: response.data.timestamp
          });
        });
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: GET_SUBSCRIBE_FAILURE });
    });
};

export default handleActions(
  {
    [DELETE_SUBSCRIBE_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: true,
        isSubscribe: false
      };
    },
    [DELETE_SUBSCRIBE_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isSubscribe: false
      };
    },
    [DELETE_SUBSCRIBE_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true
      };
    },
    [POST_SUBSCRIBE_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: true
      };
    },
    [POST_SUBSCRIBE_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isSubscribe: true
      };
    },
    [POST_SUBSCRIBE_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true
      };
    },
    [GET_SUBSCRIBE_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: true,
        isSubscribe: true
      };
    },
    [GET_SUBSCRIBE_SUCCESS]: (state, action) => {
      if (action.prev_timestamp != action.current_timestamp) {
        return {
          ...state,
          isPending: false,
          isSubscribe: true,
          subscribeList: {
            ...state.subscribeList,
            [dayList[action.day]]: {
              isLast: action.isLast,
              list: action.payload,
              timestamp: action.current_timestamp,
              scroll: 2
            }
          }
        };
      } else if (action.payload.length == 0) {
        return {
          ...state,
          isPending: false,
          isSubscribe: true,
          subscribeList: {
            ...state.subscribeList,
            [dayList[action.day]]: {
              ...state.subscribeList[dayList[action.day]],
              isLast: action.isLast,
              timestamp: action.current_timestamp
            }
          }
        };
      } else {
        return {
          ...state,
          isPending: false,
          isSubscribe: true,
          subscribeList: {
            ...state.subscribeList,
            [dayList[action.day]]: {
              isLast: action.isLast,
              list: state.subscribeList[dayList[action.day]].list.concat(
                action.payload
              ),
              scroll: action.scroll + 1,
              timestamp: action.current_timestamp
            }
          }
        };
      }
    },
    [GET_SUBSCRIBE_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true
      };
    }
  },
  initialState
);
