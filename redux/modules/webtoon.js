//import
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import * as cacheActions from "./cache";
import { API_URL } from "../../constants";

//Action
const GET_WEBTOON_PENDING = "GET_WEBTOON_PENDING";
const GET_WEBTOON_SUCCESS = "GET_WEBTOON_SUCCESS";
const GET_WEBTOON_FAILURE = "GET_WEBTOON_FAILURE";

//Action Creator
export const get_webtoon_pending = createAction("GET_WEBTOON_PENDING");
export const get_webtoon_success = createAction("GET_WEBTOON_SUCCESS");
export const get_webtoon_failure = createAction("GET_WEBTOON_FAILURE");

const dayList = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
  "etc",
  "finish",
  "newbie"
];

const initialState = {
  isPending: false,
  isError: false,
  day: "",
  toonList: {
    platform: "all",
    mon: {
      isLast: false,
      list: [],
      scroll: 1,
      timestamp: ""
    },
    tue: {
      isLast: false,
      list: [],
      scroll: 1,
      timestamp: ""
    },
    wed: {
      isLast: false,
      list: [],
      scroll: 1,
      timestamp: ""
    },
    thu: {
      isLast: false,
      list: [],
      scroll: 1,
      timestamp: ""
    },
    fri: {
      isLast: false,
      list: [],
      scroll: 1,
      timestamp: ""
    },
    sat: {
      isLast: false,
      list: [],
      scroll: 1,
      timestamp: ""
    },
    sun: {
      isLast: false,
      list: [],
      scroll: 1,
      timestamp: ""
    },
    etc: {
      isLast: false,
      list: [],
      scroll: 1,
      timestamp: ""
    },
    finish: {
      isLast: false,
      platform: "all",
      list: [],
      scroll: 1,
      timestamp: ""
    },
    newbie: {
      isLast: false,
      platform: "all",
      list: [],
      scroll: 1,
      timestmp: ""
    }
  }
};

function getWebtoonAPI(platform, day, scroll, orderby, timestamp) {
  console.log("호출되었습니다 getWebtoonAPI");
  console.log(day);
  console.log(
    `${API_URL}/webtoon/${platform}/${orderby}/${
      dayList[day]
    }/${scroll}?timestamp=${timestamp}`
  );
  return axios.get(
    `${API_URL}/webtoon/${platform}/${orderby}/${
      dayList[day]
    }/${scroll}?timestamp=${timestamp}`
  );
}

export const getWebtoon = (platform, day, orderby) => (dispatch, getState) => {
  // 먼저, 요청이 시작했다는것을 알립니다
  dispatch({ type: GET_WEBTOON_PENDING });
  const { webtoon } = getState();
  let { timestamp, scroll } = webtoon.toonList[dayList[day]];

  if (webtoon.toonList[dayList[day]].platform != platform) {
    scroll = 1;
  }
  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getWebtoonAPI(platform, day, scroll, orderby, timestamp)
    .then(response => {
      return cacheActions
        .cacheWebtoonImage(response.data.webtoons, dispatch)
        .then(changeList => {
          dispatch({
            type: GET_WEBTOON_SUCCESS,
            isLast: response.data.isLast,
            isUpdate: response.data.isUpdate,
            day: day,
            platform: platform,
            payload: changeList,
            scroll: scroll,
            prev_timestamp: timestamp,
            current_timestamp: response.data.timestamp
          });
        });
    })
    .catch(error => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
      console.log(error);
      dispatch({ type: GET_WEBTOON_FAILURE, payload: error });
    });
};

export default handleActions(
  {
    [GET_WEBTOON_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: true,
        isError: false
      };
    },
    [GET_WEBTOON_SUCCESS]: (state, action) => {
      action.payload.sort(function(a, b) {
        if (a.episodeNo) {
          return -1;
        }
        if (!b.episodeNo) {
          return +1;
        }
        // a must be equal to b
        return 0;
      });

      if (
        action.prev_timestamp != action.current_timestamp ||
        state.toonList[dayList[action.day]].platform != action.platform
      ) {
        return {
          ...state,
          isPending: false,
          isUpdate: action.isUpdate,
          toonList: {
            ...state.toonList,
            [dayList[action.day]]: {
              isLast: action.isLast,
              list: action.payload,
              timestamp: action.current_timestamp,
              platform: action.platform,
              scroll: 2
            }
          }
        };
      } else if (action.payload.length == 0) {
        return {
          ...state,
          isPending: false,
          toonList: {
            ...state.toonList,
            [dayList[action.day]]: {
              ...state.toonList[dayList[action.day]],
              isLast: action.isLast
            }
          }
        };
      } else {
        return {
          ...state,
          isPending: false,
          toonList: {
            ...state.toonList,
            [dayList[action.day]]: {
              isLast: action.isLast,
              list: state.toonList[dayList[action.day]].list.concat(
                action.payload
              ),
              scroll: action.scroll + 1,
              timestamp: action.current_timestamp,
              platform: action.platform
            }
          }
        };
      }
    },
    [GET_WEBTOON_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true
      };
    }
  },
  initialState
);
