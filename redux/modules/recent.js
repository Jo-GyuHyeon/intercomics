//import
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import * as cacheActions from "./cache";
import { API_URL } from "../../constants";

//Action
const GET_RECENT_PENDING = "GET_RECENT_PENDING";
const GET_RECENT_SUCCESS = "GET_RECENT_SUCCESS";
const GET_RECENT_FAILURE = "GET_RECENT_FAILURE";

const PATCH_RECENT_PENDING = "PATCH_RECENT_PENDING";
const PATCH_RECENT_SUCCESS = "PATCH_RECENT_SUCCESS";
const PATCH_RECENT_FAILURE = "PATCH_RECENT_FAILURE";

const initialState = {
  isPending: false,
  isError: false,
  recentList: []
};

function getRecentAPI(jwt) {
  console.log("@patchRecentAPI");
  console.log(`${API_URL}/recentWebtoon`);
  return axios.get(`${API_URL}/recentWebtoon`, {
    headers: {
      "x-token": jwt,
      "Content-Type": "application/json"
    }
  });
}

function patchRecentAPI(webtoonId, jwt) {
  console.log("@patchRecentAPI");
  console.log(`${API_URL}/recentWebtoon/${webtoonId}`);
  console.log(jwt);
  return axios.patch(`${API_URL}/recentWebtoon/${webtoonId}`, "", {
    headers: {
      "x-token": jwt,
      "Content-Type": "application/json"
    }
  });
}

export const patchRecent = webtoonId => (dispatch, getState) => {
  console.log("@patchRecent");
  const { user } = getState();
  dispatch({ type: PATCH_RECENT_PENDING });
  return patchRecentAPI(webtoonId, user.access_token).then(response => {
    return cacheActions
      .cacheWebtoonImage(response.data, dispatch)
      .then(changeList => {
        dispatch({ type: PATCH_RECENT_SUCCESS, payload: changeList });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: PATCH_RECENT_FAILURE });
      });
  });
};

export const getRecent = () => (dispatch, getState) => {
  // 먼저, 요청이 시작했다는것을 알립니다
  const { user } = getState();
  dispatch({ type: GET_RECENT_PENDING });

  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getRecentAPI(user.access_token)
    .then(response => {
      return cacheActions
        .cacheWebtoonImage(response.data, dispatch)
        .then(changeList => {
          dispatch({
            type: GET_RECENT_SUCCESS,
            payload: changeList
          });
        });
    })
    .catch(error => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
      console.log(error);
      dispatch({ type: GET_RECENT_FAILURE, payload: error });
    });
};

export default handleActions(
  {
    [GET_RECENT_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: true,
        isError: false
      };
    },
    [GET_RECENT_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        recentList: action.payload
      };
    },
    [GET_RECENT_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true
      };
    },
    [PATCH_RECENT_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: true,
        isError: false
      };
    },
    [PATCH_RECENT_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        recentList: action.payload
      };
    },
    [PATCH_RECENT_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true
      };
    }
  },
  initialState
);
