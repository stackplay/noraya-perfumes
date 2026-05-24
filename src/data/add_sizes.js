const fs = require('fs');
const content = fs.readFileSync('content.js', 'utf8');

// Função para adicionar tamanhos menores a um produto
function addSmallSizes(match) {
  const originalSizes = match.match(/sizes: \[.*?\]/s);
  if (originalSizes) {
    const has3ml = originalSizes[0].includes('3ml');
    const has5ml = originalSizes[0].includes('5ml');
    
    if (!has3ml || !has5ml) {
      // Extrair preço original (primeiro tamanho)
      const priceMatch = originalSizes[0].match(/price: ([\d.]+)/);
      const originalPrice = priceMatch ? parseFloat(priceMatch[1]) : 30;
      
      const newSizes = [];
      if (!has3ml) newSizes.push(`{ size: "3ml", price: ${(originalPrice * 0.15).toFixed(2)} }`);
      if (!has5ml) newSizes.push(`{ size: "5ml", price: ${(originalPrice * 0.25).toFixed(2)} }`);
      
      const allSizes = [...newSizes, ...(originalSizes[0].match(/{[^}]+}/g) || [])];
      return match.replace(originalSizes[0], `sizes: [${allSizes.join(', ')}]`);
    }
  }
  return match;
}

// Atualizar o conteúdo
let newContent = content.replace(/"sizes": \[[^\]]+\]/gs, (match) => addSmallSizes(match));

fs.writeFileSync('content_with_sizes.js', newContent);
console.log('Arquivo gerado: content_with_sizes.js');
