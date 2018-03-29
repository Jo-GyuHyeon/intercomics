//import
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import * as cacheActions from "./cache";
import { API_URL } from "../../constants";

//Action
const GET_SEARCH_PENDING = "GET_SEARCH_PENDING";
const GET_SEARCH_SUCCESS = "GET_SEARCH_SUCCESS";
const GET_SEARCH_FAILURE = "GET_SEARCH_FAILURE";
const INIT_SEARCH = "INIT_SEARCH";

export const setInitSearh = createAction("INIT_SEARCH");

const initialState = {
  isPending: false,
  isError: false,
  scroll: 0,
  text: "",
  searchList: []
};

function getSearchAPI(text, scroll) {
  console.log("@getSearchAPI");
  console.log(`${API_URL}/search/${text}/${scroll}`);
  return axios.get(`${API_URL}/search/${text}/${scroll}`);
}

export const getSearch = text => (dispatch, getState) => {
  // 먼저, 요청이 시작했다는것을 알립니다
  console.log("@getSearch");
  const { search } = getState();
  const scroll = text == search.text ? search.scroll : 0;

  dispatch({ type: GET_SEARCH_PENDING });

  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getSearchAPI(text, scroll)
    .then(response => {
      return cacheActions
        .cacheWebtoonImage(response.data.webtoons, dispatch)
        .then(changeList => {
          dispatch({
            type: GET_SEARCH_SUCCESS,
            payload: changeList,
            scroll: scroll,
            text: text,
            isLast: response.data.isLast
          });
        });
    })
    .catch(error => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
      console.log(error);
      dispatch({ type: GET_SEARCH_FAILURE, payload: error });
    });
};

export default handleActions(
  {
    [INIT_SEARCH]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: false,
        isLast: false,
        searchList: []
      };
    },
    [GET_SEARCH_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: true,
        isError: false,
        isLast: false,
        searchList: []
      };
    },
    [GET_SEARCH_SUCCESS]: (state, action) => {
      if (action.scroll == 0) {
        return {
          ...state,
          isPending: false,
          text: action.text,
          scroll: action.scroll,
          searchList: action.payload,
          isLast: action.isLast
        };
      }
      if (action.searchList.length == 0) {
        return {
          ...state,
          isPending: false,
          text: action.text,
          scroll: action.scroll,
          searchList: state.searchList.concat(action.payload),
          isLast: action.isLast
        };
      } else {
        return {
          ...state,
          isPending: false,
          text: action.text,
          scroll: action.scroll + 1,
          searchList: state.searchList.concat(action.payload),
          isLast: action.isLast
        };
      }
    },
    [GET_SEARCH_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true
      };
    }
  },
  initialState
);
