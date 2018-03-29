//import
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import * as episodeActions from "./episode";
import { API_URL } from "../../constants";

//Action
const GET_NOTIFICATION_PENDING = "GET_NOTIFICATION_PENDING";
const GET_NOTIFICATION_SUCCESS = "GET_NOTIFICATION_SUCCESS";
const GET_NOTIFICATION_FAILURE = "GET_NOTIFICATION_FAILURE";

//initialState
const initialState = {
  isPending: false,
  isError: false,
  notificationList: []
};

function getNotificationAPI() {
  console.log("@getNotification");
  return axios.get(`${API_URL}/notification`);
}

export const getNotification = () => (dispatch, getState) => {
  // 먼저, 요청이 시작했다는것을 알립니다
  dispatch({ type: GET_NOTIFICATION_PENDING });

  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getNotificationAPI()
    .then(response => {
      //console.log(response);
      // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
      dispatch({
        type: GET_NOTIFICATION_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
      dispatch({ type: GET_NOTIFICATION_FAILURE, payload: error });
    });
};

export default handleActions(
  {
    [GET_NOTIFICATION_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: true,
        isError: false
      };
    },
    [GET_NOTIFICATION_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        notificationList: action.payload
      };
    },
    [GET_NOTIFICATION_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true
      };
    }
  },
  initialState
);
