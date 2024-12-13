const fs = require('fs');
const path = require('path');
const axios = require('axios');
const readline = require('readline'); // readline 모듈 추가

const filePath = path.join(__dirname, 'input.csv');
const outputFilePath = path.join(__dirname, 'output.csv');

async function processCsv(inputFile, outputFile) {
  const fileStream = fs.createReadStream(inputFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const output = fs.createWriteStream(outputFile);
  for await (const line of rl) {
    const columns = line.split(',');
    const address = columns[1];

    try {
      const response = await axios.get(
        `https://sgisapi.kostat.go.kr/OpenAPI3/addr/geocodewgs84.json?accessToken=977c70a2-ad82-4a01-be8e-a5efce6a1004&address=${address}`
      );
      console.log('🚀 ~ forawait ~ response:', response.data);
      const additionalData =
        response.data.result.resultdata[0].x +
        ',' +
        response.data.result.resultdata[0].y;
      output.write(`${line},${additionalData}\n`);
    } catch (error) {
      console.error(`Error fetching data for address ${address}:`, error);
    }
  }

  output.end();
}

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  processCsv(filePath, outputFilePath);
});
