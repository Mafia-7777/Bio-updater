const fetch = require('node-fetch').default;
const { api_link, token } = require('./config.json');

const getPrice = async () => {
    const res = await (await fetch(api_link)).json();
    return res;
};

const updateBio = (price) => {
    const messsage = `BTC Price: ${price.data.prices.find(x => x.price_base == 'USD').price} USD, As of ${new Date(price.data.prices.find(x => x.price_base == 'USD').time)}`;
    
    fetch('https://api.github.com/user', {
        headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({bio: messsage}),
        method: 'PATCH'
    }).then(res => {
        if(res.status == 200) console.log(`New Bio: ${messsage}`);
        else console.log('Looks like I failed to update your bio :(');
    });
};


getPrice().then(p => updateBio(p));
setInterval(() => {
    getPrice().then(p => updateBio(p));
}, 1000*60*10);