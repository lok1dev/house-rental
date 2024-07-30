const getNumberFromString = (string) => {
    return +string.match(/\d+/)[0];
};

export default getNumberFromString;
