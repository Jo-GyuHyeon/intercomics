//import
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import { FileSystem } from "expo";
import md5 from "react-native-md5";

//Action
const IMAGE_CACHE_DOWNLOAD = "IMAGE_CACHE_DOWNLOAD";
const IMAGE_CACHE_SUCCESS = "IMAGE_CACHE_SUCCESS";
const IMAGE_CACHE_FAILURE = "IMAGE_CACHE_FAILURE";

const initialState = {
  pending: false,
  error: false
};

function downloadWebtoonImage(list) {
  let webtoonList = [];
  return Promise.all(
    list.map((toon, i) => {
      const folder = `${FileSystem.documentDirectory}/webtoon`;
      const url = toon.webtoonThumbnail_s;
      const file = folder + md5.hex_md5(url) + ".jpg";
      return FileSystem.getInfoAsync(file).then(obj => {
        if (obj.exists === 1 || obj.exists === true) {
          //console.log("있음ㅋ");
          toon.webtoonThumbnail_s = file;
          webtoonList.push(toon);
        } else {
          //console.log("없음");
          FileSystem.downloadAsync(url, file)
            .then(({ uri }) => {
              //console.log("다운완료:" + uri);
              toon.webtoonThumbnail_s = uri;
              webtoonList.push(toon);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    })
  ).then(() => {
    return webtoonList;
  });
}

function downloadEpisodeImage(list, orderBy) {
  //console.log("에피소드 이미지 다운로드");
  changeList = [];
  return Promise.all(
    list.map(async (toon, i) => {
      const folder = `${FileSystem.documentDirectory}/episode`;
      const url = toon.episodeThumbnail_s;
      const file = folder + md5.hex_md5(url) + ".jpg";
      await FileSystem.getInfoAsync(file).then(obj => {
        //console.log("이번타겟은?:" + i);
        if (obj.exists === 1 || obj.exists === true) {
          //console.log("있음");
          toon.episodeThumbnail_s = file;
          changeList.push(toon);
        } else {
          //console.log("없음");
          return FileSystem.downloadAsync(url, file)
            .then(({ uri }) => {
              //console.log("다운완료:" + i);
              toon.episodeThumbnail_s = uri;
              changeList.push(toon);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    })
  ).then(() => {
    if (orderBy == "desc") {
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
    return changeList;
  });
}
export const cacheWebtoonImage = (list, dispatch) => {
  // 먼저, 요청이 시작했다는것을 알립니다
  dispatch({ type: IMAGE_CACHE_DOWNLOAD });
  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return downloadWebtoonImage(list)
    .then(response => {
      // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
      dispatch({ type: IMAGE_CACHE_SUCCESS, payload: response });
      return response;
    })
    .catch(error => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
      dispatch({ type: IMAGE_CACHE_FAILURE, payload: error });
    });
};

export const cacheEpisodeImage = (list, dispatch, orderBy) => {
  // 먼저, 요청이 시작했다는것을 알립니다

  dispatch({ type: IMAGE_CACHE_DOWNLOAD });
  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return downloadEpisodeImage(list, orderBy)
    .then(response => {
      //console.log(response);
      // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
      dispatch({ type: IMAGE_CACHE_SUCCESS, payload: response });
      return response;
    })
    .catch(error => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
      dispatch({ type: IMAGE_CACHE_FAILURE, payload: error });
    });
};

export default handleActions(
  {
    [IMAGE_CACHE_DOWNLOAD]: (state, action) => {
      return {
        ...state,
        isPending: true,
        error: false
      };
    },
    [IMAGE_CACHE_SUCCESS]: (state, action) => {
      if (state.day !== action.day) {
        return {
          ...state,
          isPending: false,
          cache: action.payload.data
        };
      }
    },
    [IMAGE_CACHE_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        isError: true
      };
    }
  },
  initialState
);
