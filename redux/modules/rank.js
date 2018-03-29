//import
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import * as cacheActions from "./cache";
import { API_URL } from "../../constants";

//Action
const GET_RANK_PENDING = "GET_RANK_PENDING";
const GET_RANK_SUCCESS = "GET_RANK_SUCCESS";
const GET_RANK_FAILURE = "GET_RANK_FAILURE";

const initialState = {
  isPending: false,
  isError: false,
  rankList: []
};

function getRankAPI() {
  console.log("호출되었습니다 #getRankAPI");
  console.log(`${API_URL}/rank`);
  return axios.get(`${API_URL}/rank`);
}

export const getRank = () => dispatch => {
  // 먼저, 요청이 시작했다는것을 알립니다
  console.log("@getRank");
  dispatch({ type: GET_RANK_PENDING });

  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getRankAPI()
    .then(response => {
      dispatch({ type: GET_RANK_SUCCESS, payload: response.data });
      //console.log(response);
      /*return cacheActions
        .cacheWebtoonImage(response.data, dispatch)
        .then(changeList => {
          //console.log(changeList);
          dispatch({
            type: GET_RANK_SUCCESS,
            payload: changeList
          });
        });*/
    })
    .catch(error => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
      console.log(error);
      dispatch({ type: GET_RANK_FAILURE, payload: error });
    });
};

export default handleActions(
  {
    [GET_RANK_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: true,
        isError: false
      };
    },
    [GET_RANK_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        rankList: action.payload
      };
    },
    [GET_RANK_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true
      };
    }
  },
  initialState
);
