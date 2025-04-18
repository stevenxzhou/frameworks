const axios = require('axios');
const getVideoDetail = require('./getVideoDetail.js');
const { spawn } = require('child_process');
const m3u8ToMp4 = require('m3u8-to-mp4');
const converter = new m3u8ToMp4();
const fs = require('fs');
const downloadM3U8 = require('./m3u8-downloader');

// params
// const vodPageUrl = 'https://www.iqiyi.com/v_19ry9z5z5o.html';
// const folderName = 'In_Between';
// const season = 01;
// const start = 1;
// const end = 1;
async function downloadVideos(videoPageUrl, folderName, season, start, end) {

    let filePrefix = folderName + '_S' + season + '_EP';

    const downloadFolder = "./downloads";

    const jsonData = await getVideoDetail(videoPageUrl);
    const urls = jsonData.data.urls;

    if (urls === undefined || urls.length === 0) { 
        console.log('No video urls found');
        return;
    }

    // 中文名称
    // let folderName = jsonData.data.name.trim().split(" ").join("_");
    // let filePrefix = folderName + '_EP';

    urls.forEach((url) => {
        if (url.index < start || url.index > end) {
            return;
        }

        const path = `${downloadFolder}/${folderName}/`;
        
        // Check if the directory exists
        if (!fs.existsSync(path)) {
          // Create the directory
          fs.mkdirSync(path, { recursive: true });
          console.log(`Directory ${path} created successfully!`);
        } else {
          console.log(`Directory ${path} already exists.`);
        }
        
        const outputFile = `${downloadFolder}/${folderName}/${filePrefix}${url.index}.mp4`;

        downloadM3U8(url.url, outputFile)
            .then(() => {
                console.log(`Download completed for ${url.url}`);
            })
            .catch((error) => {
                console.error(`Failed to download ${url.url}:`, error);
            });

        console.log(`Starting download for ${url.url}`);
 
    });
}

module.exports = downloadVideos;

// For command line use:
// const args = process.argv.slice(2);
// const vodPageUrl = args[0];
// const folderName = args[1];
// const season = args[2];
// const start = args[3];
// const end = args[4];
// example: node downloadVideos.js https://www.olevod.com/details-1-43001.html In_Between 02 21 30
