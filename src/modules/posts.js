import * as postsAPI from "../api/posts"; // api/posts 안의 함수 모두 불러오기
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
  handleAsyncActionsById,
} from "../lib/asyncUtils";

/* 액션 타입 */
// 프로미스가 시작, 성공, 실패했을때 따른 액션을 디스패치해야 된다.
// 포스트 여러개 조회하기
const GET_POSTS = "GET_POSTS"; // 요청 시작
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS"; // 요청 성공
const GET_POSTS_ERROR = "GET_POSTS_ERROR"; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = "GET_POST"; // 요청 시작
const GET_POST_SUCCESS = "GET_POST_SUCCESS"; // 요청 성공
const GET_POST_ERROR = "GET_POST_ERROR"; // 요청 실패

// 포스트 비우기 - 포스트 조회시 재로딩 문제 해결하기
const CLEAR_POST = "CLEAR_POST";

// thunk를 사용할 때, 꼭 모든 액션들에 대하여 생성함수를 만들 필요 없음
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮음

/* thunk 함수 */
/*
export const getPosts = () => async (dispatch) => {
  dispatch({ type: GET_POSTS }); // 요청이 시작됨
  try {
    const posts = await postsAPI.getPosts(); // API 호출
    dispatch({ type: GET_POSTS_SUCCESS, posts }); // 성공
  } catch (e) {
    dispatch({ type: GET_POSTS_ERROR, error: e }); // 실패
  }
};

// thunk 함수에서도 파라미터를 받아와서 사용 할 수 있음
export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST }); // 요청이 시작됨
  try {
    const post = await postsAPI.getPostById(id); // API 호출
    dispatch({ type: GET_POST_SUCCESS, post }); // 성공
  } catch (e) {
    dispatch({ type: GET_POST_ERROR, error: e }); // 실패
  }
};
*/

/* thunk 함수 리팩토링 - 아주 쉽게 thunk 함수를 만들 수 있게 되었음 */
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

export const clearPost = () => ({ type: CLEAR_POST });

/*
const initialState = {
  posts: {
    loading: false,
    data: null,
    error: null,
  },
  post: {
    loading: false,
    data: null,
    error: null,
  },
};
 */

/* initialState 리팩토링 */
const initialState = {
  posts: reducerUtils.initial(),
  //   post: reducerUtils.initial(), // 기존의 CLEAR_POST 액션은 더이상 필요하지 않으므로 제거
  post: {},
};

/* 리듀서 */
/*
export default function posts(state = initialState, action) {
  switch (action.type) {
    // 여기는 POSTS
    case GET_POSTS: // 요청 시작
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_POSTS_SUCCESS: // 요청 성공
      return {
        ...state,
        posts: {
          loading: true,
          data: action.posts,
          error: null,
        },
      };
    case GET_POSTS_ERROR: // 요청 실패
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: action.error,
        },
      };
    // 여기는 POSTS

    // 여기는 POST
    case GET_POST: // 요청 시작
      return {
        ...state,
        post: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_POST_SUCCESS: // 요청 성공
      return {
        ...state,
        post: {
          loading: true,
          data: action.post,
          error: null,
        },
      };
    case GET_POST_ERROR: // 요청 실패
      return {
        ...state,
        post: {
          loading: true,
          data: null,
          error: action.error,
        },
      };
    // 여기는 POST

    default:
      return state;
  }
}
 */

/* 리듀서 리팩토링 */
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, "posts", true)(state, action); // 수정
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      //   return handleAsyncActions(GET_POST, "post")(state, action);
      return handleAsyncActionsById(GET_POST, "post", true)(state, action); // 수정 - 만약 요청은 하지만 로딩중은 다시 보여주지 않는 방식으로 해결
    // 기존의 CLEAR_POST 액션은 더이상 필요하지 않으므로 제거
    /*
      case CLEAR_POST:
        return {
          ...state,
          post: reducerUtils.initial(),
        };
       */
    default:
      return state;
  }
}

/*
// 이렇게 표현도 가능
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      const postsReducer = handleAsyncActions(GET_POSTS, 'posts');
      return postsReducer(state, action);
 */

// 3번째 인자를 사용하면 withExtraArgument 에서 넣어준 값들을 사용 할 수 있습니다.
// export const goToHome =
//   () =>
//   (dispatch, getState, { history }) => {
//     history.push("/");
//   };

// export const goToHome = (navigate) => (dispatch, getState) => {
//   navigate("/");
// };

export const goToHome = (navigate) => (dispatch, getState) => {
  console.log(getState().posts);
  dispatch({ type: "GET_POSTS" });
  navigate("/");
};
