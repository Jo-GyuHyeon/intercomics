//import
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import { API_URL } from "../../constants";

//Action
const SET_INTRO = "SET_INTRO";
const SET_LOG_IN = "SET_LOG_IN";
const SET_LOG_OUT = "SET_LOG_OUT";
const SET_WITHDRAWL = "SET_WITHDRAWL";
const SET_FACEBOOK_PENDING = "SET_FACEBOOK_PENDING";
const SET_FACEBOOK_SUCCESS = "SET_FACEBOOK_SUCCESS";
const SET_FACEBOOK_ERROR = "SET_FACEBOOK_ERROR";
const SET_STATISTICS_PENDING = "SET_STATISTICS_PENDING";
const GET_STATISTICS_SUCCESS = "GET_STATISTICS_SUCCESS";
const GET_STATISTICS_ERROR = "SET_STATISTICS_ERROR";

//Action Creator
export const setIntro = createAction("SET_INTRO");
export const setLogIn = createAction("SET_LOG_IN");
export const setLogOut = createAction("SET_LOG_OUT");
export const set_facebook_pending = createAction("SET_FACEBOOK_PENDING");
export const set_facebook_success = createAction("SET_FACEBOOK_SUCCESS");

const initialState = {
  isLoggedIn: false,
  isPending: false,
  isError: false,
  isIntro: true,
  id: null,
  name: "nope",
  access_token: "",
  refresh_token: "",
  fb_token: "",
  email: "",
  picture_url: "",
  statistics: {
    genre: [],
    platforms: [],
    episode: 0,
    subscribe: 0
  }
};

const getStatisticsAPI = jwt => {
  console.log("@getStatisticsAPI");
  console.log(`${API_URL}/statistics`);
  return axios.get(`${API_URL}/statistics`, {
    headers: {
      "x-token": jwt,
      "Content-Type": "application.json"
    }
  });
};

const logOutAPI = jwt => {
  console.log("@logOutAPI");
  console.log(`${API_URL}/jwt/token`);
  console.log(jwt);

  return axios.patch(`${API_URL}/jwt/token`, "", {
    headers: {
      "x-token": jwt,
      "Content-Type": "application/json"
    }
  });
};

const withdrawalAPI = jwt => {
  console.log("@withdrawalAPI");
  console.log(`${API_URL}/jwt/token`);
  console.log(jwt);
  return axios.delete(`${API_URL}/jwt/token`, {
    headers: {
      "x-token": jwt,
      "Content-Type": "application.json"
    }
  });
};

export function facebookLogin(token) {
  let mac_token = token;
  return async dispatch => {
    dispatch({ type: SET_FACEBOOK_PENDING });
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "1991512684455348",
      {
        permissions: ["public_profile", "email"]
      }
    );
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      axios
        .get(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`
        )
        .then(response => {
          const facebook = response.data;
          //jwt토큰발행을 요청합니다.
          axios
            .post(`${API_URL}/jwt/token`, {
              username: response.data.id,
              password: "1234",
              client_id: "facebook_id",
              profile: {
                id: facebook.id,
                name: facebook.name,
                access_token: token,
                email: facebook.email,
                picture_url: facebook.picture_url,
                mac_token: mac_token
              }
            })
            .then(response => {
              //받아온 페이스북 프로필정보와 jwt토큰 정보를 dispatch합니다.
              dispatch({
                type: SET_FACEBOOK_SUCCESS,
                fb_tokne: facebook.token,
                id: facebook.id,
                name: facebook.name,
                email: facebook.email,
                picture_url: facebook.picture_url,
                payload: response
              });
            })
            .catch(error => {
              dispatch({ type: SET_FACEBOOK_ERROR });
            });
        })
        .catch(error => {
          dispatch({ type: SET_FACEBOOK_ERROR });
        });
    } else {
      dispatch({ type: SET_FACEBOOK_PENDING });
    }
  };
}

export const facebookLogout = () => (dispatch, getState) => {
  const { user, subscribe } = getState();
  const jwt = user.access_token;
  return logOutAPI(jwt).then(() => {
    dispatch({ type: SET_LOG_OUT });
  });
};

export const facebookWithdrawal = () => (dispatch, getState) => {
  const { user, subscribe } = getState();
  const jwt = user.access_token;
  return withdrawalAPI(jwt).then(() => {
    dispatch({ type: SET_WITHDRAWL });
  });
};

export const getStatistics = () => (dispatch, getState) => {
  console.log("@getStatistics");
  const { user } = getState();
  const jwt = user.access_token;
  dispatch({ type: SET_STATISTICS_PENDING });

  return getStatisticsAPI(jwt).then(response => {
    dispatch({
      type: "GET_STATISTICS_SUCCESS",
      payload: response.data
    });
  });
};

export default handleActions(
  {
    [SET_LOG_IN]: (state, action) => {
      return {
        ...state,
        isLoggedIn: true
      };
    },
    [SET_LOG_OUT]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isLoggedIn: false,
        fb_token: "",
        jwt: "",
        id: "",
        name: "",
        access_token: "",
        refresh_token: ""
      };
    },
    [SET_WITHDRAWL]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isLoggedIn: false,
        fb_token: "",
        jwt: "",
        id: "",
        name: "",
        access_token: "",
        refresh_token: ""
      };
    },
    [SET_FACEBOOK_PENDING]: (state, action) => {
      return {
        ...state,
        isPending: !state.isPending,
        isError: false
      };
    },
    [SET_FACEBOOK_SUCCESS]: (state, action) => {
      return {
        ...state,
        setIntro: false,
        isLoggedIn: true,
        isPending: false,
        fb_token: action.fb_token,
        id: action.id,
        name: action.name,
        email: action.email,
        access_token: action.payload.data.access_token,
        refresh_token: action.payload.data.refresh_token
      };
    },
    [SET_FACEBOOK_ERROR]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isLoggedIn: false,
        isError: true
      };
    },
    [GET_STATISTICS_SUCCESS]: (state, action) => {
      return {
        ...state,
        statistics: action.payload
      };
    }
  },
  initialState
);
