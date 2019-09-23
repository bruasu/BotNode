const ws = require('ws')
const wPublic = new ws('wss://api-pub.bitfinex.com/ws/2')

const main = {
    SubscribeBTCUSD: false,
    start: () => {
        wPublic.on('message', (msg) =>{
            main.checkResponse(msg);            
        } 
        );        
        
    },
    btcusd: () => {
        let msg = JSON.stringify({ 
            event: 'subscribe', 
            channel: 'ticker', 
            symbol: 'tBTCUSD' 
        });
        wPublic.on('open', () => wPublic.send(msg));
    },
    checkResponse: (msg) => {
        var jsonMsg = JSON.parse(msg);

        if(jsonMsg){
            if(jsonMsg.pair){
                if(jsonMsg.pair == "BTCUSD"){
                    main.SubscribeBTCUSD = true;
                }
            }
        }   
        
        if(main.SubscribeBTCUSD){
            main.printPriceBTC(jsonMsg);
        }
        
    },
    printPriceBTC: (priceBTC) => {
        if(priceBTC.length == 2 && priceBTC[1].length == 10){
            console.log(priceBTC[1][6]);
        }
    }

};

module.exports = main;