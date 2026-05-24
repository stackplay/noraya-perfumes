const fs = require('fs');
let content = fs.readFileSync('content.js', 'utf8');

// Apenas 10 produtos para ÚLTIMAS TENDÊNCIAS
const trendsProducts = [
  { image: "/images/Lattafa_Asad_Elixir_1.png" },
  { image: "/images/Atheeri_1.png" },
  { image: "/images/Mayar_Cherry_1.png" },
  { image: "/images/Ameerat_Al_Arab_1.png" },
  { image: "/images/Dalal_1.png" },
  { image: "/images/Afeef_1.png" },
  { image: "/images/Al_Noble_Wazeer_1.png" },
  { image: "/images/Yara_Tous_1.png" },
  { image: "/images/Emaan_1.png" },
  { image: "/images/Lattafa - Asad Zanzibar.png" }
];

// Construir o array de produtos
let productsArray = '  products: [\n';
trendsProducts.forEach(p => {
  productsArray += `    { image: "${p.image}" },\n`;
});
productsArray = productsArray.slice(0, -2) + '\n  ]';

// Substituir a seção trends
const trendsPattern = /export const trends = {\s+kicker: "NÃO FIQUE SEM",\s+titleLine1: "Últimas",\s+titleItalic: "tendências",\s+products: \[[\s\S]*?\],/;
const newTrends = `export const trends = {\n  kicker: "NÃO FIQUE SEM",\n  titleLine1: "Últimas",\n  titleItalic: "tendências",\n${productsArray},`;

content = content.replace(trendsPattern, newTrends);
fs.writeFileSync('content.js', content);
console.log('✅ Trends atualizado com 10 produtos!');
