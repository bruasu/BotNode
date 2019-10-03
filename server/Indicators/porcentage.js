const porcentage = {
    porcentage: (valueInit, valueEnd) => {
        let difference = parseFloat(valueEnd) - parseFloat(valueInit);
        let calc = difference / valueInit;
        let percentage = calc * 100;
        return percentage.toFixed(2);
    }
};

module.exports = porcentage;
