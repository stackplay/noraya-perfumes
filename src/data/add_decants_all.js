const fs = require('fs');

// Ler o arquivo content.js
let content = fs.readFileSync('content.js', 'utf8');

// Função para calcular preços dos decants baseado no preço de 100ml
function calculateDecantPrices(price100) {
  if (!price100 || isNaN(price100)) return { price3: 0.99, price5: 1.65 };
  // 3ml = aproximadamente 3% do valor (mas com valor mínimo)
  // 5ml = aproximadamente 5% do valor (mas com valor mínimo)
  let price3 = Math.max(0.99, (price100 * 0.03));
  let price5 = Math.max(1.65, (price100 * 0.05));
  return { price3: Math.round(price3 * 100) / 100, price5: Math.round(price5 * 100) / 100 };
}

// Encontrar todos os padrões de sizes
// Padrão: sizes: [{ size: "100ml", price: XX.XX }]
const sizePattern = /sizes: \[\{ size: "(\d+)ml", price: ([\d.]+) \}\]/g;

let match;
let modified = false;
let newContent = content;

while ((match = sizePattern.exec(content)) !== null) {
  const originalSize = match[1];
  const originalPrice = parseFloat(match[2]);
  const { price3, price5 } = calculateDecantPrices(originalPrice);
  
  const originalText = match[0];
  const newText = `sizes: [{ size: "3ml", price: ${price3} }, { size: "5ml", price: ${price5} }, { size: "${originalSize}ml", price: ${originalPrice} }]`;
  
  newContent = newContent.replace(originalText, newText);
  modified = true;
  console.log(`Atualizado: ${originalSize}ml (€${originalPrice}) -> adicionados 3ml (€${price3}) e 5ml (€${price5})`);
}

if (modified) {
  fs.writeFileSync('content.js', newContent);
  console.log('\n✅ Todos os produtos foram atualizados com opções de 3ml e 5ml!');
} else {
  console.log('Nenhum produto encontrado para atualizar.');
}
