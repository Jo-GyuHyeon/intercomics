//import
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import * as episodeActions from "./episode";
import { API_URL } from "../../constants";

//Action
const GET_PLATFORMS_PENDING = "GET_PLATFORMS_PENDING";
const GET_PLATFORMS_SUCCESS = "GET_PLATFORMS_SUCCESS";
const GET_PLATFORMS_FAILURE = "GET_PLATFORMS_FAILURE";
const PUT_PLATFORM = "PUT_PLATFORM";

//Action Creator
export const get_platforms_pending = createAction("GET_PLATFORMS_PENDING");
export const get_platforms_success = createAction("GET_PLATFORMS_SUCCESS");
export const get_platforms_failure = createAction("GET_PLATFORMS_FAILURE");
export const put_platform = createAction("PUT_PLATFORM");

//initialState
const initialState = {
  isPending: false,
  isError: false,
  timestamp: "",
  platforms: {},
  platformList: []
};

function getPlatformsAPI() {
  console.log("@getPlatformsAPI");
  return axios.get(`${API_URL}/platforms`);
}

export const getPlatforms = () => (dispatch, getState) => {
  // 먼저, 요청이 시작했다는것을 알립니다
  dispatch({ type: GET_PLATFORMS_PENDING });

  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getPlatformsAPI()
    .then(response => {
      // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
      const { initialize } = getState();
      const platforms = response.data.platforms;
      for (i = 0; i < platforms.length; i++) {
        if (initialize.platforms[platforms[i]] == null) {
          episodeActions.putPlatForm(platforms[i], dispatch);
          dispatch({
            type: PUT_PLATFORM,
            q: platforms[i]
          });
        }
      }

      dispatch({
        type: GET_PLATFORMS_SUCCESS,
        timestamp: response.data.timestamp,
        platformList: platforms
      });
    })
    .catch(error => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
      dispatch({ type: GET_PLATFORMS_FAILURE, payload: error });
    });
};

export default handleActions(
  {
    [GET_PLATFORMS_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: true,
        isError: false
      };
    },
    [GET_PLATFORMS_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        timestamp: action.timestamp,
        platformList: action.platformList
      };
    },
    [GET_PLATFORMS_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true
      };
    },
    [PUT_PLATFORM]: (state, action) => {
      return {
        ...state,
        platforms: {
          ...state.platforms,
          [action.q]: ""
        }
      };
    }
  },
  initialState
);
