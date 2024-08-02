import actionTypes from "./actionTypes";
import * as apis from "../../services";

export const getPosts = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPosts();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_POSTS,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS,
            posts: null,
        });
    }
};

export const getPostsLimit = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetPostsLimit(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts: response.data.response?.rows,
                count: response.data.response?.count,
            });
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT,
            posts: null,
        });
    }
};

export const getNewPosts = () => async (dispatch) => {
    try {
        const response = await apis.apiGetNewPosts();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_POSTS,
                newPosts: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POSTS,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POSTS,
            newPosts: null,
        });
    }
};
