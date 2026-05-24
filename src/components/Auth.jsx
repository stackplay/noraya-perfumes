import React, { useState, useEffect } from 'react';
import { signInWithGoogle, logout, auth, getFavorites } from '../services/firebase';
import { LogOut, LogIn, User, Heart, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

const Auth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        const result = await getFavorites(user.uid);
        if (result.success) {
          setFavoritesCount(result.favorites.length);
        }
      } else {
        setFavoritesCount(0);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const result = await signInWithGoogle();
    if (result.success) {
      toast.success(`Bem-vindo, ${result.user.displayName}!`);
    } else {
      toast.error('Erro ao fazer login: ' + result.error);
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success('Logout realizado com sucesso!');
    } else {
      toast.error('Erro ao fazer logout: ' + result.error);
    }
  };

  if (loading) {
    return <div className="w-8 h-8 animate-spin rounded-full border-2 border-[#c9a96a] border-t-transparent"></div>;
  }

  if (user) {
    return (
      <>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-[#e8d6a8] hover:text-[#f5deb3] transition-colors"
          >
            <ShoppingBag size={18} />
          </button>
          
          <button
            onClick={() => navigate('/favoritos')}
            className="relative text-[#e8d6a8] hover:text-[#f5deb3] transition-colors"
          >
            <Heart size={18} />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-3 text-[10px] bg-[#c9a96a] text-black h-4 w-4 rounded-full flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </button>
          
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="w-8 h-8 rounded-full object-cover border border-[#c9a96a]"
              />
            )}
            <span className="text-sm text-[#e8d6a8] hidden sm:inline">
              {user.displayName?.split(' ')[0]}
            </span>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 text-[11px] tracking-[0.25em] text-[#e8d6a8] hover:text-[#f5deb3]"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
        <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </>
    );
  }

  return (
    <button 
      onClick={handleLogin} 
      className="flex items-center gap-2 text-[11px] tracking-[0.25em] text-[#e8d6a8] hover:text-[#f5deb3]"
    >
      <LogIn size={16} />
      <span className="hidden sm:inline">Entrar</span>
    </button>
  );
};

export default Auth;
