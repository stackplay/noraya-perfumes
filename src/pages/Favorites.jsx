import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { auth, getFavorites, removeFromFavorites } from '../services/firebase';
import { toast } from 'sonner';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        await loadFavorites(user.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loadFavorites = async (userId) => {
    const result = await getFavorites(userId);
    if (result.success) {
      setFavorites(result.favorites);
    }
  };

  const handleRemove = async (productId) => {
    if (!user) return;
    const result = await removeFromFavorites(user.uid, productId);
    if (result.success) {
      setFavorites(favorites.filter(f => f.productId !== productId));
      toast.success('Removido dos favoritos');
    } else {
      toast.error('Erro ao remover');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] pt-32 text-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-sm">
          <Heart size={48} className="mx-auto text-[#c9a96a] mb-4" />
          <h2 className="text-2xl font-display text-[#1a1410] mb-2">Faça login</h2>
          <p className="text-[#1a1410]/60 mb-4">Para ver seus favoritos</p>
          <button onClick={() => window.location.href = '/'} className="bg-[#c9a96a] text-black px-6 py-2 rounded-lg">
            Voltar à loja
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] pt-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a96a]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ec] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-display text-[#1a1410] mb-2">Meus Favoritos</h1>
        <p className="text-[#1a1410]/60 mb-8">{favorites.length} perfume(s) favorito(s)</p>
        
        {favorites.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <Heart size={64} className="mx-auto text-[#c9a96a]/30 mb-4" />
            <p className="text-[#1a1410]/60">Você ainda não tem perfumes favoritos</p>
            <Link to="/" className="inline-block mt-4 bg-[#c9a96a] text-black px-6 py-2 rounded-lg">
              Explorar perfumes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/produto/${item.productId}`}>
                  <div className="aspect-square bg-[#f7f3ec] p-4">
                    <img src={item.productImage} alt={item.productName} className="w-full h-full object-contain" />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/produto/${item.productId}`}>
                    <h3 className="font-semibold text-[#1a1410] text-sm line-clamp-2 mb-2 hover:text-[#c9a96a]">
                      {item.productName}
                    </h3>
                  </Link>
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                    <Link 
                      to={`/produto/${item.productId}`}
                      className="p-2 bg-[#f7f3ec] rounded-lg text-[#c9a96a] hover:bg-[#c9a96a] hover:text-white transition-colors"
                    >
                      <ShoppingCart size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
