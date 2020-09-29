const axios = require('axios');

const search = async (params) => {
    try {
        const res = await axios.get('https://www.yad2.co.il/api/pre-load/getFeedIndex/realestate/forsale?city=8400&property=1&rooms=4-4&price=1700000-2000000&parking=1&elevator=1&renovated=1&compact-req=1',
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            }
        });

        return res;
    } catch (e) {
        return e;
    }
}

module.exports = {
    search: search
}