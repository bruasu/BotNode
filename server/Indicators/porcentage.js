const porcentage = {
    porcentage: (valueInit, valueEnd) => {
        let difference = parseFloat(valueInit) - parseFloat(valueEnd);
        let calc = difference / valueInit;
        let percentage = calc * 100;
        return percentage;
    }
};
console.log(porcentage.porcentage(1000,1200));

module.exports = porcentage;
