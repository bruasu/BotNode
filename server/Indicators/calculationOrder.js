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
porcentageStopLost: (orderArray, informationOrder) => {
    for(i = 0; i < orderArray.length; i++){
        if(informationOrder.typeOrderGlobal == "BUY"){
            orderArray[i].porcentageStopLost = porcentage.porcentage(orderArray[i].value, informationOrder.stop);
        }else{
            orderArray[i].porcentageStopLost = (porcentage.porcentage(orderArray[i].value, informationOrder.stop))*(-1);
        }
    }
    return orderArray;
},
calculationPositonLot: (orderArray, informationOrder) => {
    function calculateSizeOrderPosition(valuePosition, informationOrder, sizeLostOrder){
            if(informationOrder.typeOrderGlobal == "BUY"){
                return sizeLostOrder / (valuePosition - informationOrder.stop);
            }else{
                return sizeLostOrder / (informationOrder.stop -valuePosition);
            }
    };
    function calculateRiskStopLost(valuePosition, informationOrder, sizePosition){
        if(informationOrder.typeOrderGlobal == "BUY"){
            return (valuePosition - informationOrder.stop) * sizePosition;
        }else{
            return (informationOrder.stop - valuePosition) * sizePosition;
        }
    };
    function calculateSizeOrder(valuePosition, sizePosition){
        return sizePosition * valuePosition;
    };
    function calculateValueCommission(sizePosition, informationOrder){
        return sizePosition * (informationOrder.valueCommissionLimit / 100);
    }

    if(informationOrder.typePositonLot == 0){
        let countPosition = 0;

        for(i = 0;i < orderArray.length; i++){
            if(orderArray[i].typeOrder == informationOrder.typeOrderGlobal){
                countPosition ++;
            }
        }

        let sizeLostOrder = informationOrder.lostHigh / countPosition;
        let SumPositionOpen = 0;

        if(informationOrder.typeOrderGlobal == "BUY"){
            for(i = 0; i < orderArray.length; i++){
                calculationPositionLoop(orderArray[i]);
            }
        }else{
            for(i = orderArray.length -1; i >= 0; i--){
                calculationPositionLoop(orderArray[i]);
            }
        }

        function calculationPositionLoop(order){
            if(order.typeOrder == informationOrder.typeOrderGlobal){
                let sizeOrder = calculateSizeOrderPosition(order.value, informationOrder, sizeLostOrder);
                if(sizeOrder >= informationOrder.minimumSizePosition){
                    order.sizeLotePosition = sizeOrder;
                }else{
                    order.sizeLotePosition = informationOrder.minimumSizePosition;
                    countPosition -= 1;
                    let sizeLostRemaining = calculateRiskStopLost(order.value, informationOrder, informationOrder.minimumSizePosition);
                    SumPositionOpen += sizeLostRemaining;
                    sizeLostOrder = (informationOrder.lostHigh - SumPositionOpen) / countPosition; 
                }
                
                order.sizePosition = parseFloat(calculateSizeOrder(order.value, order.sizeLotePosition).toFixed(2));
                order.valueCommission = parseFloat(calculateValueCommission(order.sizePosition, informationOrder).toFixed(2));
                order.riskStopLost = parseFloat(calculateRiskStopLost(order.value, informationOrder, order.sizeLotePosition).toFixed(2));
            }
        }

        return orderArray;        
    }

},
calculationAll: (orderArray, priceCurrent, informationOrder) => {
    let typeOrder = calculationOrder.typeOrder(orderArray, priceCurrent);
    let porcentageStopLost = calculationOrder.porcentageStopLost(typeOrder, informationOrder)
    let porcentageBetweenOrders = calculationOrder.porcentageBetweenOrdersAbove(porcentageStopLost);
    calculationOrder.calculationPositonLot(porcentageBetweenOrders, informationOrder);
    return porcentageBetweenOrders;
}
    
};

module.exports = calculationOrder;

//test

let array = [
    {"value": 8434},
    {"value": 8248},
    {"value": 8134},
    {"value": 8042},
    {"value": 7950},
    {"value": 7818},
    {"value": 7650}
];

let informationOrder = {
    "typeOrderGlobal": "BUY",
    "stop":7480,
    "lostHigh": 1.5,
    "typePositonLot": 0,
    "minimumSizePosition": 0.0005,
    "valueCommissionLimit": 0.10
}

console.log(calculationOrder.calculationAll(array, 8200, informationOrder));