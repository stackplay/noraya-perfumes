const fs = require('fs');
let content = fs.readFileSync('App.js', 'utf8');

// Verificar se já existe o código de favoritar
if (!content.includes('handleToggleFavorite')) {
  // Adicionar import das funções de favoritos
  content = content.replace(
    /import { auth, db } from '\.\/services\/firebase';/,
    `import { auth, db, addToFavorites, removeFromFavorites, isFavorite } from './services/firebase';`
  );
  
  console.log('✅ Funções de favorito importadas!');
  fs.writeFileSync('App.js', content);
} else {
  console.log('⚠️ Código de favorito já existe');
}
