const fs = require('fs');
let content = fs.readFileSync('App.js', 'utf8');

// Adicionar a função handleAddToKit no ProductDetail
const addToKitFunction = `
  const handleAddToKit = () => {
    if (!user) return toast.error('Faça login para adicionar ao kit');
    // Aqui você precisa acessar o contexto do kit
    // Por enquanto, vamos apenas mostrar uma mensagem
    toast.info('Para adicionar ao kit, clique no botão "Kit Decants" no header e escolha o tamanho do kit primeiro');
  };`;

// Inserir a função após handleToggleFavorite
content = content.replace(/const handleToggleFavorite = async \(\) => {[\s\S]*?};/, (match) => {
  return match + '\n\n  ' + addToKitFunction;
});

// Adicionar botão de adicionar ao kit no ProductDetail
const kitButton = `<button onClick={handleAddToKit} className="flex-1 py-3 rounded-lg border-2 border-[#c9a96a] text-[#c9a96a] flex items-center justify-center gap-2"><Package size={18} /> Adicionar ao Kit</button>`;

// Substituir o botão de favoritar para incluir o botão do kit
content = content.replace(/<div className="flex gap-3">[\s\S]*?<\/div>/, (match) => {
  return `<div className="flex gap-3">
              <button onClick={handleAddToKit} className="flex-1 py-3 rounded-lg border-2 border-[#c9a96a] text-[#c9a96a] flex items-center justify-center gap-2"><Package size={18} /> Adicionar ao Kit</button>
              <button onClick={handleToggleFavorite} className={\`flex-1 py-3 rounded-lg border-2 flex items-center justify-center gap-2 \${isFavorite ? 'border-red-400 bg-red-50 text-red-500' : 'border-gray-300'}\`}><Heart className={\`w-5 h-5 \${isFavorite ? 'fill-red-500' : ''}\`} />{isFavorite ? 'Favoritado' : 'Favoritar'}</button>
            </div>`;
});

fs.writeFileSync('App.js', content);
console.log('✅ ProductDetail corrigido!');
