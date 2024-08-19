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

export const getOutstandingPost = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPostsLimit({
            limitPost: 5,
            order: ["star", "DESC"],
        });
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_OUTSTANDING,
                outStandingPost: response.data.response.rows,
            });
        } else {
            dispatch({
                type: actionTypes.GET_OUTSTANDING,
                msg: response.data.msg,
                outStandingPost: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_OUTSTANDING,
            outStandingPost: null,
        });
    }
};

export const getPostsManager = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPostsManager();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_MANAGER,
                posts: response.data.response?.rows,
                count: response.data.response?.count,
            });
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_MANAGER,
                msg: response.data.msg,
                posts: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_MANAGER,
            posts: null,
        });
    }
};

export const editData = (dataEdit) => ({
    type: actionTypes.EDIT_DATA,
    dataEdit,
});

export const resetEditData = () => ({
    type: actionTypes.RESET_DATA_EDIT,
});
