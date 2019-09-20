const ws = require('ws')
const wPublic = new ws('wss://api-pub.bitfinex.com/ws/2')

const main = {
    start: () => {
        wPublic.on('message', (msg) =>{

            
            console.log(msg);
            var priceBTC = JSON.parse(msg);
        
            if(priceBTC.length == 2 && priceBTC[1].length == 10){
                console.log(priceBTC[1][6]);
            }
        } 
        );
        
        let msg = JSON.stringify({ 
            event: 'subscribe', 
            channel: 'ticker', 
            symbol: 'tBTCUSD' 
        });
        wPublic.on('open', () => wPublic.send(msg));
    }

};

module.exports = main;