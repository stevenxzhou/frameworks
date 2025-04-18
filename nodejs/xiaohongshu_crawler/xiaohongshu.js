// get web content given url using nodejs, puppeteer
const axios = require('axios');
const fs = require('fs');

async function getWebContent(url) {
    // create header to fake user agent
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    };

    const res = await axios.get(url, { headers });
    const content = res.data;

    // save content to file name as temp.html
    fs.writeFile('temp.html', content, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File saved successfully');
        }
    });
}

getWebContent('https://www.xiaohongshu.com/user/profile/5cd43041000000001602f52b');