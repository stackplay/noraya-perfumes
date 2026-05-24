const fs = require('fs');
const content = require('./content.js');

// Produtos que terão opção de 3ml e 5ml (decants)
const productsWithDecants = [
  "Lattafa Yara Rosa 100ml",
  "Lattafa Yara Elixir 100ml",
  "Lattafa Nebras Unissex 100ml",
  "Lattafa Eclaire 100ml",
  "Lattafa Khamrah 100ml",
  "Lattafa Asad Man 100ml"
];

// Calcular preços proporcionais (aproximadamente 30% do valor para 3ml e 50% para 5ml)
// Exemplo: se 100ml custa 31.51€, então 5ml ≈ 1.58€, 3ml ≈ 0.95€

const updates = {
  "Lattafa Yara Rosa 100ml": { price100: 31.51, price5: 1.58, price3: 0.95 },
  "Lattafa Yara Elixir 100ml": { price100: 35.01, price5: 1.75, price3: 1.05 },
  "Lattafa Nebras Unissex 100ml": { price100: 35.67, price5: 1.78, price3: 1.07 },
  "Lattafa Eclaire 100ml": { price100: 42.64, price5: 2.13, price3: 1.28 },
  "Lattafa Khamrah 100ml": { price100: 45.17, price5: 2.26, price3: 1.36 },
  "Lattafa Asad Man 100ml": { price100: 32.90, price5: 1.65, price3: 0.99 }
};

console.log('Produtos que receberão decants:', productsWithDecants);
