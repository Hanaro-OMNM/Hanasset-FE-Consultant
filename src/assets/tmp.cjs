const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '법정동코드 전체자료.txt');
const outputFilePath = path.join(__dirname, 'input.csv');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split('\n');
  const 폐지여부Count = { 존재: 0, 폐지: 0 };
  const 존재Lines = [];

  lines.forEach((line) => {
    const columns = line.split('\t').map((col) => col.trim());
    const 폐지여부 = columns[2];
    if (폐지여부 === '존재' || 폐지여부 === '폐지') {
      폐지여부Count[폐지여부]++;
      if (폐지여부 === '존재') {
        존재Lines.push(`${columns[0]},${columns[1]}`);
      }
    }
  });

  fs.writeFile(outputFilePath, 존재Lines.join('\n'), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('존재 법정동코드 CSV 파일이 성공적으로 작성되었습니다.');
  });

  console.log('존재:', 폐지여부Count.존재);
  console.log('폐지:', 폐지여부Count.폐지);
});
