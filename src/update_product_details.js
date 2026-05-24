const fs = require('fs');
let content = fs.readFileSync('App.js', 'utf8');

// Adicionar imports necessários
if (!content.includes('addToFavorites, removeFromFavorites, isFavorite, addToCart')) {
  content = content.replace(
    /import { auth, db, addToFavorites, removeFromFavorites, isFavorite } from '\.\/services\/firebase';/,
    `import { auth, db, addToFavorites, removeFromFavorites, isFavorite, addToCart } from './services/firebase';`
  );
}

// Adicionar estado de favorito e carrinho no ProductDetail
if (!content.includes('const [isFavorite, setIsFavorite]')) {
  content = content.replace(
    /const \[quantity, setQuantity\] = useState\(1\);/,
    `const [quantity, setQuantity] = useState(1);\n  const [isFavorite, setIsFavorite] = useState(false);\n  const [addingToCart, setAddingToCart] = useState(false);`
  );
}

// Adicionar efeito para verificar favorito
if (!content.includes('checkIfFavorite')) {
  const effectCode = `\n  useEffect(() => {\n    const checkIfFavorite = async () => {\n      if (user && product) {\n        const result = await isFavorite(user.uid, product.id);\n        if (result.success) {\n          setIsFavorite(result.isFavorite);\n        }\n      }\n    };\n    checkIfFavorite();\n  }, [user, product]);\n`;
  content = content.replace(/useEffect\(\(\) => {/, `useEffect(() => {\n    const checkIfFavorite = async () => {\n      if (user && product) {\n        const result = await isFavorite(user.uid, product.id);\n        if (result.success) {\n          setIsFavorite(result.isFavorite);\n        }\n      }\n    };\n    checkIfFavorite();\n  }, [user, product]);`);
}

fs.writeFileSync('App.js', content);
console.log('✅ ProductDetail atualizado!');
