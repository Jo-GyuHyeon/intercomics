//import
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import * as cacheActions from "./cache";
import { API_URL } from "../../constants";

//Action
const GET_EPISODE_PENDING = "GET_EPISODE_PENDING";
const GET_EPISODE_SUCCESS = "GET_EPISODE_SUCCESS";
const GET_EPISODE_FAILURE = "GET_EPISODE_FAILURE";

const PATCH_EPISODE_PENDING = "PATCH_EPISODE_PENDING";
const PATCH_EPISODE_SUCCESS = "PATCH_EPISODE_SUCCESS";
const PATCH_EPISODE_FAILURE = "PATCH_EPISODE_FAILURE";

const SET_PLATFORM = "SET_PLATFORM";
const SET_SUBSCRIBE = "SET_SUBSCRIBE";

const SORT = "SORT";
//Action Creator
export const get_episode_pending = createAction("GET_EPISODE_PENDING");
export const get_episode_success = createAction("GET_EPISODE_SUCCESS");
export const get_episode_failure = createAction("GET_EPISODE_FAILURE");
export const set_subcribe = createAction("SET_SUBSCRIBE");
export const sort = createAction("SORT");

//initialState
const initialState = {
  isPending: false,
  isError: false,
  isSubscribe: false,
  lastNum: 0,
  isLast: false,
  webtoonId: "",
  orderBy: "",
  epRoot: {},
  recentEpisodeNo: 0
};

function getEpisodeAPI(webtoonId, lastNum, orderBy, jwt) {
  console.log("호출되었습니다 getEpisodeAPI");
  console.log(`${API_URL}/episode/${webtoonId}/${lastNum}?orderby=${orderBy}`);
  console.log(jwt);

  return axios.get(
    `${API_URL}/episode/${webtoonId}/${lastNum}?orderby=${orderBy}`,
    {
      headers: {
        "x-token": jwt,
        "Content-Type": "application/json"
      }
    }
  );
}

export const putPlatForm = (platform, dispatch) => {
  console.log(platform);
  dispatch({ type: SET_PLATFORM, platform: platform });
};

const patchEpisodeAPI = (webtoonId, num, jwt) => {
  console.log("@patchEpisodeAPI");
  console.log(`${API_URL}/episode/${webtoonId}/${num}`);
  console.log(jwt);
  return axios.patch(`${API_URL}/episode/${webtoonId}/${num}`, "a", {
    headers: {
      "x-token": jwt,
      "Content-Type": "application.json"
    }
  });
};

export const getEpisode = (webtoonId, platform, orderBy, lastNum, init) => (
  dispatch,
  getState
) => {
  // 먼저, 요청이 시작했다는것을 알립니다
  dispatch({ type: GET_EPISODE_PENDING });
  const { user, episode } = getState();

  if (lastNum != 0) {
    lastNum = episode.epRoot[platform][webtoonId]
      ? episode.epRoot[platform][webtoonId].length
      : 0;
  }

  orderBy = orderBy ? "asc" : "desc";
  orderBy = "all";
  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getEpisodeAPI(webtoonId, lastNum, orderBy, user.access_token)
    .then(response => {
      // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
      if (response.data.episodeList == 0) {
        dispatch({
          type: GET_EPISODE_SUCCESS,
          webtoonId: webtoonId,
          isSubscribe: response.data.isSubscribe,
          recentEpisodeNo: response.data.recentEpisodeNo,
          isLast: response.data.isLast,
          platform: platform,
          lastNum: -1,
          payload: []
        });
      }
      return cacheActions
        .cacheEpisodeImage(response.data.episodeList, dispatch, orderBy)
        .then(changeList => {
          dispatch({
            type: GET_EPISODE_SUCCESS,
            webtoonId: webtoonId,
            isSubscribe: response.data.isSubscribe,
            recentEpisodeNo: response.data.recentEpisodeNo,
            isLast: response.data.isLast,
            platform: platform,
            lastNum: lastNum,
            length: response.data.lastNum,
            payload: changeList,
            orderBy: orderBy
          });
        });
    })
    .catch(error => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
      console.log(error);
      dispatch({ type: GET_EPISODE_FAILURE });
    });
};

export const patchEpisode = (webtoonId, num) => (dispatch, getState) => {
  console.log("@patchEpisode");

  const { user } = getState();
  dispatch({ type: PATCH_EPISODE_PENDING });

  return patchEpisodeAPI(webtoonId, num, user.access_token)
    .then(response => {
      dispatch({ type: PATCH_EPISODE_SUCCESS, recentEpisodeNo: num });
    })
    .catch(error => {
      console.log(error);
    });
};

export const sortEpisodeList = (webtoon, orderBy) => dispatch => {
  console.log(webtoon.webtoonName);
  console.log(orderBy);
  dispatch({
    type: SORT,
    webtoon: webtoon,
    orderBy: orderBy
  });
};

export default handleActions(
  {
    [GET_EPISODE_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: true,
        isError: false,
        isSubscribe: state.isSubscribe || false,
        isLast: false
      };
    },
    [GET_EPISODE_SUCCESS]: (state, action) => {
      console.log("에피소드 데이터 불러오는중 입니다. ######################");
      if (action.lastNum == 0) {
        return {
          ...state,
          isPending: false,
          webtoonId: action.webtoonId,
          isSubscribe: action.isSubscribe,
          recentEpisodeNo: action.recentEpisodeNo,
          orderBy: action.orderBy,
          isLast: action.isLast,
          lastNum: action.length,
          epRoot: {
            ...state.epRoot,
            [action.platform]: {
              ...state.epRoot[action.platform],
              [action.webtoonId]: action.payload
            }
          }
        };
      } else {
        return {
          ...state,
          isPending: false,
          webtoonId: action.webtoonId,
          isSubscribe: action.isSubscribe,
          recentEpisodeNo: action.recentEpisodeNo,
          orderBy: action.orderBy,
          isLast: action.isLast,
          lastNum: action.length,
          epRoot: {
            ...state.epRoot,
            [action.platform]: {
              ...state.epRoot[action.platform],
              [action.webtoonId]: state.epRoot[action.platform][
                action.webtoonId
              ].concat(action.payload)
            }
          }
        };
      }
    },
    [GET_EPISODE_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true,
        recentEpisodeNo: 0
      };
    },
    [SET_PLATFORM]: (state, action) => {
      return {
        ...state,
        epRoot: {
          ...state.epRoot,
          [action.platform]: {}
        }
      };
    },
    [PATCH_EPISODE_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: true,
        isError: false
      };
    },
    [PATCH_EPISODE_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        recentEpisodeNo: action.recentEpisodeNo
      };
    },
    [PATCH_EPISODE_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true
      };
    },
    [SET_SUBSCRIBE]: (state, action) => {
      return {
        ...state,
        isSubscribe: !state.isSubscribe
      };
    },
    [SORT]: (state, action) => {
      const { webtoon, orderBy } = action;
      changeList = state.epRoot[webtoon.platform][webtoon.webtoonId];

      if (!orderBy) {
        console.log("desc");
        changeList.sort(function(a, b) {
          if (a.episodeNo > b.episodeNo) {
            return -1;
          }
          if (a.episodeNo < b.episodeNo) {
            return +1;
          }
          // a must be equal to b
          return 0;
        });
      } else {
        console.log("asc");
        changeList.sort(function(a, b) {
          if (a.episodeNo > b.episodeNo) {
            return +1;
          }
          if (a.episodeNo < b.episodeNo) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }

      return {
        ...state,
        epRoot: {
          ...state.epRoot,
          [webtoon.platform]: {
            ...state.epRoot[webtoon.platform],
            [webtoon.webtoonId]: changeList
          }
        }
      };
    }
  },
  initialState
);
