const porcentage = require("./porcentage");

const calculationOrder = {

typeOrder: (orderArray, priceCurrent) => {

    for(i = 0; i < orderArray.length; i++){
        if(orderArray[i].value < priceCurrent){
            orderArray[i].typeOrder = "BUY";
        }else{
            orderArray[i].typeOrder = "SELL";
        }
    }
    return orderArray;
},
porcentageBetweenOrdersAbove: (orderArray) => {
    for(i = 0; i < orderArray.length - 1; i++){
        orderArray[i+1].porcentageAboveOrder = porcentage.porcentage(orderArray[i+1].value,orderArray[i].value);
    }
    return orderArray;
},
calculationPositonLot: (orderArray, informationOrder) => {
    function calculateSizeOrder(valuePosition, informationOrder, sizeLostOrder){
            if(informationOrder.typeOrderGlobal == "BUY"){
                return sizeLostOrder / (valuePosition - informationOrder.stop);
            }else{
                return sizeLostOrder / (informationOrder.stop -valuePosition);
            }
    }

    function calculateLostOrder(valuePosition, informationOrder, sizePosition){
        if(informationOrder.typeOrderGlobal == "BUY"){
            return (valuePosition - informationOrder.stop) * sizePosition;
        }else{
            return (informationOrder.stop -valuePosition) * sizePosition;
        }
    }

    if(informationOrder.typePositonLot == 0){
        let countPosition = 0;

        for(i = 0;i < orderArray.length; i++){
            if(orderArray[i].typeOrder == informationOrder.typeOrderGlobal){
                countPosition ++;
            }
        }

        let sizeLostOrder = informationOrder.lostHigh / countPosition;

        for(i = 0; i < orderArray.length; i++){
            if(orderArray[i].typeOrder == informationOrder.typeOrderGlobal){
                let sizeOrder = calculateSizeOrder(orderArray[i].value, informationOrder, sizeLostOrder);
                //console.log(sizeOrder);
                if(sizeOrder >= informationOrder.minimumSizePosition){
                    orderArray[i].sizePosition = sizeOrder;
                }else{
                    orderArray[i].sizePosition = informationOrder.minimumSizePosition;
                    countPosition -1;
                    let sizeLostRemaining = calculateLostOrder(orderArray[i].value, informationOrder, sizeOrder);
                    //console.log(sizeLostRemaining);
                    sizeLostOrder = (sizeLostRemaining / countPosition);                   
                }
            }
        }

        return orderArray;        
    }

},
calculationAll: (orderArray, priceCurrent, informationOrder) => {
    let typeOrder = calculationOrder.typeOrder(orderArray, priceCurrent);
    let porcentageBetweenOrders = calculationOrder.porcentageBetweenOrdersAbove(typeOrder);
    calculationOrder.calculationPositonLot(orderArray, informationOrder);
    return porcentageBetweenOrders;
}
    
};

module.exports = calculationOrder;

//test

/* let array = [
    {"value": 1200},
    {"value": 1150},
    {"value": 1090},
    {"value": 1000},
    {"value": 950},
    {"value": 920}
]; */
let array = [
    {"value": 1090},
    {"value": 1000},
    {"value": 950},
    {"value": 920}
];

let informationOrder = {
    "typeOrderGlobal": "BUY",
    "stop": 900,
    "lostHigh": 2,
    "typePositonLot": 0,
    "minimumSizePosition": 0.005
}

console.log(calculationOrder.calculationAll(array, 1095, informationOrder));