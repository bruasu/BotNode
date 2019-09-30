const fibonacci = {
    fibo: (higt, low) => {
        const valDifference = higt - low;
        const valueFibinacciPorcentages = calculateFibo.porcentagesDifference(valDifference);
        const fibonacci = calculateFibo.fiboSum(higt, low, valueFibinacciPorcentages);


        console.log(fibonacci);
        
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
        const jsonFibonacci = {
            fibonacciUP: {
                f0000: high,
                f0236: high - json.f0236,
                f0382: high - json.f0382,
                f0500: high - json.f0500,
                f0618: high - json.f0618,
                f0786: high - json.f0786,
                f1000: low,
                f1236: high + json.f0236,
                f1382: high + json.f0382,
                f1500: high + json.f0500,
                f1618: high + json.f0618,
                f1786: high + json.f0786,
                f2000: high + (json.f0618 + json.f0382)
            },
            fibonacciDown: {
                f0000: low,
                f0236: low + json.f0236,
                f0382: low + json.f0382,
                f0500: low + json.f0500,
                f0618: low + json.f0618,
                f0786: low + json.f0786,
                f1000: high,
                f1236: low - json.f0236,
                f1382: low - json.f0382,
                f1500: low - json.f0500,
                f1618: low - json.f0618,
                f1786: low - json.f0786,
                f2000: low - (json.f0618 + json.f0382)
            }
        }

        return jsonFibonacci;
    }
    
};

fibonacci.fibo(8451,7716);
module.exports = fibonacci;