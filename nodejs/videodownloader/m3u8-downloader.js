const m3u8ToMp4 = require('m3u8-to-mp4');
const converter = new m3u8ToMp4();

async function downloadM3U8(url, outputFile) {
    await converter
        .setInputFile(url)
        .setOutputFile(outputFile)
        .start();
}

module.exports = downloadM3U8;



