const fs = require('fs');
let content = fs.readFileSync('App.js', 'utf8');

// Substituir o useEffect problemático
const oldEffect = /useEffect\(\(\) => {\s*const checkFavorite = async \(\) => {\s*if \(user && product\) {\s*const { isFavorite } = await import\(.*?\);\s*const result = await isFavorite\(user\.uid, product\.id\);\s*if \(result && result\.success\) {\s*setIsFavorite\(result\.isFavorite\);\s*}\s*}\s*};\s*checkFavorite\(\);?\s*}, \[user, product\]\);/s;

const newEffect = `useEffect(() => {
    const checkFavorite = async () => {
      if (user && product && typeof isFavorite === 'function') {
        try {
          const result = await isFavorite(user.uid, product.id);
          if (result && result.success) {
            setIsFavorite(result.isFavorite);
          }
        } catch (err) {
          console.error('Erro ao verificar favorito:', err);
        }
      }
    };
    checkFavorite();
  }, [user, product]);`;

if (content.match(oldEffect)) {
  content = content.replace(oldEffect, newEffect);
  console.log('✅ useEffect corrigido!');
} else {
  console.log('⚠️ Padrão não encontrado, tentando outra abordagem...');
  // Tentar substituir linha por linha
  content = content.replace(/const { isFavorite } = await import\(.*?\);/g, '');
  content = content.replace(/const result = await isFavorite\(user\.uid, product\.id\);/g, 'const result = await isFavorite(user.uid, product.id);');
}

fs.writeFileSync('App.js', content);
console.log('✅ Arquivo corrigido!');
