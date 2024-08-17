import { getNumbersPrice, getNumbersAcreage } from "./getNumbers";

export const codePriceFromMinMax = (totals, min, max) => {
    return totals?.map((item) => {
        let arrMinMax = getNumbersPrice(item.value);
        return {
            ...item,
            min: arrMinMax.length === 2 ? arrMinMax[0] : arrMinMax[0] === min ? 0 : arrMinMax[0],
            max:
                arrMinMax.length === 2
                    ? arrMinMax[1]
                    : arrMinMax[0] === max
                    ? 999999
                    : arrMinMax[0],
        };
    });
};

export const codeAcreageFromMinMax = (totals, min, max) => {
    return totals?.map((item) => {
        let arrMinMax = getNumbersAcreage(item.value);
        return {
            ...item,
            min: arrMinMax.length === 2 ? arrMinMax[0] : arrMinMax[0] === min ? 0 : arrMinMax[0],
            max:
                arrMinMax.length === 2
                    ? arrMinMax[1]
                    : arrMinMax[0] === max
                    ? 999999
                    : arrMinMax[0],
        };
    });
};

export const getPriceCode = (entry, prices, min, max) => {
    const pricesWithMinMax = codePriceFromMinMax(prices, min, max);
    return pricesWithMinMax.filter((item) => item.min <= entry && entry < item.max);
};

export const getAcreageCode = (entry, acreage, min, max) => {
    const acreageWithMinMax = codeAcreageFromMinMax(acreage, min, max);
    return acreageWithMinMax.filter((item) => item.min <= entry && entry < item.max);
};
