import axios from "axios";
import authHeader from "../../authHeader";

const BASE_URL = process.env.REACT_APP_BASE_URL;


export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/api/v1/post/${id}`, authHeader());
    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/post/comment/${id}`,
      {
        comment,
      },
     authHeader(),
    );
    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });

    const { data } = await axios.delete(`${BASE_URL}/api/v1/post/comment/${id}`,
      authHeader(),
       {
      data: { commentId },
      
    });
    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const createNewPost = (postData) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/post/upload`,
      postData,
     authHeader(),
    );
    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePost = (caption,location,tags, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/post/${id}`,
      {
        caption,
        location,
        tags
      },
      authHeader(),
     
    );
    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios.delete(`${BASE_URL}/api/v1/post/${id}`,authHeader());
    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};
