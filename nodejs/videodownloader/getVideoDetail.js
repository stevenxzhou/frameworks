const puppeteer = require('puppeteer');
const axios = require('axios');

// With the main page url, we are extracting a uri from the outgoing requests that contains the video details
async function getVideoDetailsUri(videoPageUrl) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    const page = await browser.newPage();

    let videoDetailsUrl = '';

    // Enable request interception.
    await page.setRequestInterception(true);

    // Add a listener to print all requests.
    page.on('request', (req) => {
        if (req.url().startsWith('https://api.olelive.com/v1/pub/vod/detail')) {
            if (req.url().includes('true')) {
                videoDetailsUrl = req.url();
            } else {
                videoDetailsUrl = req.url().replace('false', 'true');
            }
        }
        req.continue();
    });

    // Navigate to the page to trigger the outgoing requests.
    await page.goto(videoPageUrl);

    // Wait for 5 seconds.
    await new Promise(resolve => setTimeout(resolve, 5000));

    await browser.close();

    return videoDetailsUrl;
}

// With the main page url, we are retrieving the video details json object via the uri extracted from above.
async function getVideoDetail(videoPageUrl) {

    try {
        let videoDetailsUrl = await getVideoDetailsUri(videoPageUrl);

        //console.log('videoDetailsUrl', videoDetailsUrl);

        // get the video details json object from the uri
        const response = await axios.get(videoDetailsUrl);
        //console.log('response', response);

        const jsonData = JSON.parse(JSON.stringify(response.data));
        //console.log('jsonData', jsonData);
        return jsonData;
    } catch (error) {
        console.error('Error fetching video details:', error);
        throw error;
    }
}

// export getVodDetails function
module.exports = getVideoDetail;