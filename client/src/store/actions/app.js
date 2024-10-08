import actionTypes from "./actionTypes";
import * as apis from "../../services";

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCategories();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                categories: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                msg: response.data.msg,
                categories: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            posts: null,
        });
    }
};

export const getPrices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPrices();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRICES,
                prices: response.data.response.sort((a, b) => {
                    return a.order - b.order;
                }),
            });
        } else {
            dispatch({
                type: actionTypes.GET_PRICES,
                msg: response.data.msg,
                prices: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRICES,
            prices: null,
            msg: error,
        });
    }
};

export const getAcreage = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAcreage();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ACREAGE,
                acreage: response.data.response.sort((a, b) => {
                    return a.order - b.order;
                }),
            });
        } else {
            dispatch({
                type: actionTypes.GET_ACREAGE,
                msg: response.data.msg,
                acreage: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ACREAGE,
            acreage: null,
            msg: error,
        });
    }
};

export const getProvinces = () => async (dispatch) => {
    try {
        const response = await apis.apiGetProvinces();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PROVINCE,
                provinces: response.data.response,
                msg: "",
            });
        } else {
            dispatch({
                type: actionTypes.GET_PROVINCE,
                msg: response.data.msg,
                provinces: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PROVINCE,
            provinces: null,
            msg: error,
        });
    }
};
