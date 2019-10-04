const fibonacci = {
    fibo: (higt, low) => {
        const valDifference = higt - low;
        const valueFibinacciPorcentages = calculateFibo.porcentagesDifference(valDifference);
        const fibonacci = calculateFibo.fiboSum(higt, low, valueFibinacciPorcentages);
        return fibonacci;        
    }
};

const calculateFibo = {
    porcentagesDifference: (valDifference) => {
        const f0236 = valDifference * 0.236;
        const f0382 = valDifference * 0.382;
        const f0500 = valDifference * 0.5;
        const f0618 = valDifference * 0.618;
        const f0786 = valDifference * 0.786;

        const json = {
            f0236,
            f0382,
            f0500,
            f0618,
            f0786
        }

        return json;
    },
    fiboSum: (high, low, json) => {
        let High = parseFloat(high);
        let Low = parseFloat(low);
        const jsonFibonacci = {
            fibonacciUP: [
                {"name":"f2000", "value": High + (parseFloat(json.f0618) +  parseFloat(json.f0382))},
                {"name":"f1786", "value": High +  parseFloat(json.f0786)},
                {"name":"f1618", "value": High +  parseFloat(json.f0618)},
                {"name":"f1500", "value": High +  parseFloat(json.f0500)},
                {"name":"f1382", "value": High +  parseFloat(json.f0382)},
                {"name":"f1236", "value": High +  parseFloat(json.f0236)},
                {"name":"f0000", "value": High},
                {"name":"f0236", "value": High -  parseFloat(json.f0236)},
                {"name":"f0382", "value": High -  parseFloat(json.f0382)},
                {"name":"f0500", "value": High -  parseFloat(json.f0500)},
                {"name":"f0618", "value": High -  parseFloat(json.f0618)},
                {"name":"f0786", "value": High -  parseFloat(json.f0786)},
                {"name":"f1000", "value": Low}
            ],
            fibonacciDown: 
            [
                {"name":"f0000", "value": Low},
                {"name":"f0236", "value": Low +  parseFloat(json.f0236)},
                {"name":"f0382", "value": Low +  parseFloat(json.f0382)},
                {"name":"f0500", "value": Low +  parseFloat(json.f0500)},
                {"name":"f0618", "value": Low +  parseFloat(json.f0618)},
                {"name":"f0786", "value": Low +  parseFloat(json.f0786)},
                {"name":"f1000", "value": High},
                {"name":"f2000", "value": Low - (parseFloat(json.f0618) +  parseFloat(json.f0382))},
                {"name":"f1786", "value": Low -  parseFloat(json.f0786)},
                {"name":"f1618", "value": Low -  parseFloat(json.f0618)},
                {"name":"f1500", "value": Low -  parseFloat(json.f0500)},
                {"name":"f1382", "value": Low -  parseFloat(json.f0382)},
                {"name":"f1236", "value": Low -  parseFloat(json.f0236)}
            ]
        }

        return jsonFibonacci;
    }
    
};

console.log(fibonacci.fibo(8500,7820));
module.exports = fibonacci;