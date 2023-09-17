const fs = require('fs');
const csv = require('csv-parser');


async function getCsvData(csvFilePath) {
  return new Promise((resolve, reject) => {
    const data = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = { getCsvData };
