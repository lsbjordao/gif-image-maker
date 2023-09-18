const { execSync } = require('child_process');
const fs = require('fs');

const outputGIF = './output/animated.gif';
const convertPath = 'C:/Program Files/ImageMagick-7.1.1-Q16-HDRI/convert';
const imagePath = './input';

try {
  // Obtém a lista de arquivos no diretório de imagens
  const files = fs.readdirSync(imagePath);

  // Filtra apenas os arquivos PNG
  const pngFiles = files.filter(file => file.endsWith('.PNG'));

  // Ordena os nomes dos arquivos numericamente
  const sortedPngFiles = pngFiles.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0]);
    const numB = parseInt(b.match(/\d+/)[0]);
    return numA - numB;
  });

  // Gera a lista de arquivos ordenados
  const fileList = sortedPngFiles.map(file => `"${imagePath}/${file}"`).join(' ');

  // Executa o comando convert com a lista ordenada de arquivos
  execSync(`"${convertPath}" -delay 90 -loop 1 ${fileList} ${outputGIF}`);
  console.log('GIF gerado com sucesso.');
} catch (error) {
  console.error('Erro ao criar o GIF:', error.message);
}
