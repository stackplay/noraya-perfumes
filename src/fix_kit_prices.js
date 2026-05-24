const fs = require('fs');
let content = fs.readFileSync('App.js', 'utf8');

// Adicionar a função de adicionar ao kit no HomePage
const addToKitHomeFunction = `
  const addToKitFromProduct = (product) => {
    if (!selectedKit) {
      toast.error('Primeiro selecione um kit (3ml ou 5ml) no botão "Kit Decants"');
      return false;
    }
    if (selectedPerfumes.length >= 10) {
      toast.error('Limite de 10 perfumes atingido');
      return false;
    }
    if (selectedPerfumes.find(p => p.id === product.id)) {
      toast.info(`${product.name} já está na seleção`);
      return false;
    }
    setSelectedPerfumes([...selectedPerfumes, { id: product.id, name: product.name, image: product.image }]);
    toast.success(`${product.name} adicionado! (${selectedPerfumes.length + 1}/10)`);
    return true;
  };`;

// Inserir no HomePage
content = content.replace(/const resetKit = \(\) => {[\s\S]*?};/, (match) => {
  return match + '\n\n  ' + addToKitHomeFunction;
});

// Adicionar props para o ProductDetail
content = content.replace(/<ProductDetail \/>/, '<ProductDetail onAddToKit={addToKitFromProduct} selectedKit={selectedKit} selectedPerfumes={selectedPerfumes} />');

fs.writeFileSync('App.js', content);
console.log('✅ Sistema de kit corrigido!');
