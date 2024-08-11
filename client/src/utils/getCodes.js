import { getNumbersPrice, getNumbersAcreage } from "./getNumbers";

export const getPriceCode = (totals) => {
    let arr = [];
    return totals.map((item) => {
        let arrMinMax = getNumbersPrice(item.value);
        if (arrMinMax.length === 1) arr.push(arrMinMax[0]);
        let sortedArr = arr.sort();
        return {
            ...item,
            min: sortedArr.indexOf(arrMinMax[0]) === 0 ? 0 : arrMinMax[0],
            max:
                sortedArr.indexOf(arrMinMax[0]) === 0
                    ? arrMinMax[0]
                    : sortedArr.indexOf(arrMinMax[0]) === 1
                    ? 999999
                    : arrMinMax[1],
        };
    });
};

export const getAcreageCode = (totals) => {
    let arr = [];
    return totals.map((item) => {
        let arrMinMax = getNumbersAcreage(item.value);
        if (arrMinMax.length === 1) arr.push(arrMinMax[0]);
        let sortedArr = arr.sort();
        return {
            ...item,
            min: sortedArr.indexOf(arrMinMax[0]) === 0 ? 0 : arrMinMax[0],
            max:
                sortedArr.indexOf(arrMinMax[0]) === 0
                    ? arrMinMax[0]
                    : sortedArr.indexOf(arrMinMax[0]) === 1
                    ? 999999
                    : arrMinMax[1],
        };
    });
};

export const getCodes = (arrMinMax, type) => {
    const typeWithMinMax = type === "prices" ? getPriceCode(type) : getAcreageCode(type);
    return typeWithMinMax.filter(
        (item) =>
            (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) ||
            (item.max >= arrMinMax[0] && item.max <= arrMinMax[1])
    );
};
