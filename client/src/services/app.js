import axiosConfig from "../axiosConfig";
import axiosDefault from "axios";

export const apiGetPrices = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/price/all",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetAcreage = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/acreage/all",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetProvinces = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/province/all",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetPublicProvinces = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: "get",
                url: "https://vapi.vnappmob.com/api/province/",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetPublicDistrict = (provinceId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: "get",
                url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
