import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { ShoppingBag, ShoppingCart, User, Menu, X, Instagram, Star, Heart, Truck, Shield, RefreshCw, Minus, Plus, Trash2, LogOut, LogIn } from "lucide-react";
import { toast, Toaster } from "sonner";
import * as content from "./data/content-ptpt";
import { auth, signInWithGoogle, logout, addToCart as addToCartDB, getCart as getCartDB, updateCartQuantity as updateCartQuantityDB, removeFromCart as removeFromCartDB, addReview, getProductReviews, getProductRating, markHelpful, db } from "./services/firebase";
import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import "./App.css";

// Preços dos kits (sempre 10 decants)
const KIT_PRICES = {
  '2ml': 19.99,
  '3ml': 29.99,
  '5ml': 44.99,
  '10ml': 69.99
};

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const WHATSAPP_NUMBER = "351920827969";

// =============================================
// MODAL DE ESCOLHA DO KIT
// =============================================
const KitChoiceModal = ({ isOpen, onClose, onSelectKit, selectedSize }) => {
  if (!isOpen) return null;
  
  const kitPrice = KIT_PRICES[selectedSize] || 0;
  
  const handleSelectKit = () => {
    onSelectKit(selectedSize);
  };
  
  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md">
        <div className="bg-[#0a0807] border-2 border-[#c9a96a] rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-[#c9a96a]/30 flex justify-between items-center bg-[#1a1410]">
            <h2 className="text-xl font-display text-[#e8c98a]">Confirmar Kit</h2>
            <button onClick={onClose} className="text-[#c9a96a] hover:text-[#e8c98a]"><X size={24} /></button>
          </div>
          <div className="p-6">
            <p className="text-[#e8d6a8] text-center mb-2">
              Kit de <span className="text-[#e8c98a] font-bold">{selectedSize}</span>
            </p>
            <p className="text-[#c9a96a]/70 text-center text-sm mb-4">10 decants</p>
            <div className="text-center mb-6">
              <span className="text-3xl font-bold text-[#e8c98a]">{kitPrice.toFixed(2)} €</span>
            </div>
            <button
              onClick={handleSelectKit}
              className="w-full py-3 bg-gradient-to-r from-[#c9a96a] to-[#e8c98a] text-black rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Confirmar Kit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// HEADER
// =============================================
const Header = () => {
  const [open, setOpen] = useState(false);
  const { cartCount, openCart, kitCount, openKit, user, handleLogin, handleLogout, favoritesCount } = useApp();
  const navigate = useNavigate();
  const { brand, nav } = content;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0807]/85 backdrop-blur-md border-b border-[#c9a96a]/15">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={brand.logo} alt="Noraya" className="h-12 w-12 object-contain" />
          <div className="leading-tight hidden sm:block">
            <div className="font-display tracking-[0.25em] text-[#e8c98a] text-lg">{brand.name}</div>
            <div className="text-[10px] tracking-[0.3em] text-[#c9a96a]/70">{brand.tagline}</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <a key={item.label} href={item.href} className="text-[11px] tracking-[0.28em] text-[#e8d6a8] hover:text-[#f5deb3]">{item.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={openKit} className="relative flex items-center gap-2 bg-[#c9a96a]/10 hover:bg-[#c9a96a]/20 text-[#e8c98a] px-3 py-1.5 rounded-full">
            <img src="/images/decant.png" alt="Kit" className="w-5 h-5 object-contain" />
            <span className="text-xs hidden sm:inline">Kit</span>
            {kitCount > 0 && <span className="absolute -top-1 -right-1 text-[10px] bg-[#c9a96a] text-black h-5 w-5 rounded-full flex items-center justify-center font-bold">{kitCount}</span>}
          </button>
          <button onClick={() => navigate('/favoritos')} className="relative text-[#e8d6a8] hover:text-[#f5deb3]">
            <Heart size={20} />
            {favoritesCount > 0 && <span className="absolute -top-2 -right-3 text-[10px] bg-[#c9a96a] text-black h-4 w-4 rounded-full flex items-center justify-center font-bold">{favoritesCount}</span>}
          </button>
          <button onClick={openCart} className="relative text-[#e8d6a8] hover:text-[#f5deb3]">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="absolute -top-2 -right-3 text-[10px] bg-[#c9a96a] text-black h-4 w-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
          </button>
          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || "Usuário"} 
                  className="w-8 h-8 rounded-full border border-[#c9a96a] object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?background=c9a96a&color=fff&name=${user.displayName || "User"}`;
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#c9a96a] flex items-center justify-center text-black text-sm font-bold">
                  {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <button onClick={handleLogout} className="text-[11px] text-[#e8d6a8] hover:text-[#f5deb3]"><LogOut size={16} /></button>
            </div>
          ) : (
            <button 
              onClick={handleLogin} 
              className="text-[11px] tracking-[0.28em] text-[#e8c98a] hover:text-[#f5deb3] border border-[#c9a96a]/50 hover:border-[#c9a96a] px-4 py-1.5 rounded-full transition-all flex items-center gap-2"
            >
              <LogIn size={14} /> ENTRAR
            </button>
          )}
          <button className="lg:hidden text-[#e8d6a8]" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-[#0a0807] border-t border-[#c9a96a]/15 px-6 py-6 flex flex-col gap-5">
          {nav.map((item) => (<a key={item.label} href={item.href} onClick={() => setOpen(false)} className="text-[12px] tracking-[0.28em] text-[#e8d6a8]">{item.label}</a>))}
          <button onClick={() => { navigate('/favoritos'); setOpen(false); }} className="text-[12px] tracking-[0.28em] text-[#e8d6a8] text-left">❤️ Favoritos</button>
          <button onClick={() => { navigate('/minhas-avaliacoes'); setOpen(false); }} className="text-[12px] tracking-[0.28em] text-[#e8d6a8] text-left">⭐ Minhas Avaliações</button>
          {!user && (
            <button onClick={() => { handleLogin(); setOpen(false); }} className="text-[12px] tracking-[0.28em] text-[#e8c98a] text-left font-semibold border-t border-[#c9a96a]/20 pt-3 mt-2">
              🔑 Entrar / Cadastrar
            </button>
          )}
        </div>
      )}
    </header>
  );
};

// =============================================
// CARRINHO DRAWER
// =============================================
const CartDrawer = () => {
  const { isCartOpen, closeCart, cart, handleUpdateQuantity, handleRemoveFromCart, getCartTotal, user, getCartItemsForWhatsApp, handleLogin } = useApp();
  
  const handleCheckout = () => {
    if (!user) {
      toast.error('Faça login para finalizar a compra');
      handleLogin();
      return;
    }
    if (cart.length === 0) {
      toast.error('Seu carrinho está vazio');
      return;
    }
    const whatsappUrl = getCartItemsForWhatsApp();
    window.open(whatsappUrl, '_blank');
    toast.success('Redirecionando para o WhatsApp...');
  };
  
  if (!isCartOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-[1000]" onClick={closeCart} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0807] border-l border-[#c9a96a]/30 z-[1001] shadow-2xl flex flex-col">
        <div className="p-4 border-b border-[#c9a96a]/20 flex justify-between items-center">
          <h2 className="text-xl font-display text-[#e8c98a]">Meu Carrinho</h2>
          <button onClick={closeCart} className="text-[#c9a96a] hover:text-[#e8c98a]"><X size={24} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {!user ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-[#c9a96a]/30 mx-auto mb-4" />
              <p className="text-[#c9a96a]/60 mb-4">Faça login para ver seu carrinho</p>
              <button onClick={handleLogin} className="px-6 py-2 bg-[#c9a96a] text-black rounded-lg font-semibold">Entrar</button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-[#c9a96a]/30 mx-auto mb-4" />
              <p className="text-[#c9a96a]/60">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-[#1a1410] rounded-lg p-3 flex gap-3">
                  <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-contain bg-[#0a0807] rounded" />
                  <div className="flex-1">
                    <p className="text-[#e8d6a8] font-medium text-sm">{item.productName}</p>
                    <p className="text-[#c9a96a] text-xs mt-1">{item.size}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)} 
                          className="p-1 hover:bg-[#0a0807] rounded"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} className="text-[#c9a96a]" />
                        </button>
                        <span className="text-[#e8d6a8] text-sm w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)} 
                          className="p-1 hover:bg-[#0a0807] rounded"
                        >
                          <Plus size={14} className="text-[#c9a96a]" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#e8c98a] font-semibold">€ {(item.price * item.quantity).toFixed(2)}</span>
                        <button 
                          onClick={() => handleRemoveFromCart(item.id)} 
                          className="p-1 hover:bg-red-500/20 rounded transition-colors"
                        >
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t border-[#c9a96a]/20 p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#e8d6a8]">Total</span>
              <span className="text-2xl font-bold text-[#e8c98a]">€ {getCartTotal()}</span>
            </div>
            <button onClick={handleCheckout} className="w-full py-3 bg-gradient-to-r from-[#c9a96a] to-[#e8c98a] text-black rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
              Finalizar no WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// =============================================
// KIT DRAWER
// =============================================
const KitDrawer = () => {
  const { isKitOpen, closeKit, selectedKit, selectedPerfumes, removeFromKit, clearKit, resetKit, kitPrice, kitSize, user, sendKitToWhatsApp, handleLogin } = useApp();
  
  const handleFinalizeKit = () => {
    if (!user) {
      toast.error('Faça login para finalizar o kit');
      handleLogin();
      return;
    }
    if (selectedPerfumes.length !== 10) {
      toast.error(`Adicione mais ${10 - selectedPerfumes.length} perfumes para completar o kit`);
      return;
    }
    sendKitToWhatsApp();
  };
  
  if (!isKitOpen) return null;
  
  const progress = (selectedPerfumes.length / 10) * 100;
  
  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-[1000]" onClick={closeKit} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0807] border-l border-[#c9a96a]/30 z-[1001] shadow-2xl flex flex-col">
        <div className="p-4 border-b border-[#c9a96a]/20 flex justify-between items-center">
          <h2 className="text-xl font-display text-[#e8c98a]">Meu Kit de Decants</h2>
          <button onClick={closeKit} className="text-[#c9a96a] hover:text-[#e8c98a]"><X size={24} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {!selectedKit ? (
            <div className="text-center py-12">
              <img src="/images/decant10.png" alt="Kit" className="w-24 h-24 object-contain mx-auto mb-4" />
              <p className="text-[#c9a96a]/60">Nenhum kit selecionado</p>
              <p className="text-[#c9a96a]/40 text-sm mt-2">Selecione um kit ao adicionar um decant</p>
            </div>
          ) : (
            <>
              <div className="mb-4 p-3 bg-gradient-to-r from-[#1a1410] to-[#0a0807] rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={kitSize === '2ml' ? '/images/decant2ml.png' : kitSize === '10ml' ? '/images/decant10ml.png' : kitSize === '3ml' ? '/images/decant.png' : '/images/decant1.png'} alt="Kit" className="w-12 h-12 object-contain" />
                  <div className="flex-1">
                    <p className="text-[#e8c98a] font-semibold">Kit {kitSize} - 10 decants</p>
                    <p className="text-[#c9a96a] text-sm">{selectedPerfumes.length}/10 perfumes</p>
                    <div className="w-full bg-[#0a0807] rounded-full h-2 mt-1">
                      <div className="bg-[#c9a96a] h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
              {selectedPerfumes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[#c9a96a]/60 text-sm">Nenhum perfume adicionado ainda</p>
                  <p className="text-[#c9a96a]/40 text-xs mt-2">Vá até um perfume, selecione {kitSize} e clique em "Adicionar ao Kit"</p>
                </div>
              ) : (
                selectedPerfumes.map((p, idx) => (
                  <div key={idx} className="bg-[#1a1410] rounded-lg p-2 flex items-center gap-2 mb-2">
                    <img src={p.image} className="w-8 h-8 object-contain" />
                    <div className="flex-1"><p className="text-[#e8d6a8] text-xs truncate">{p.name}</p></div>
                    <button onClick={() => removeFromKit(p.id)} className="p-1 hover:bg-red-500/20 rounded"><Trash2 size={12} className="text-red-400" /></button>
                  </div>
                ))
              )}
              {selectedPerfumes.length > 0 && (
                <div className="flex gap-2 mt-3">
                  <button onClick={clearKit} className="flex-1 py-2 border border-red-500/50 text-red-400 rounded-lg text-sm hover:bg-red-500/10">Limpar Tudo</button>
                  <button onClick={resetKit} className="flex-1 py-2 border border-[#c9a96a]/50 text-[#c9a96a] rounded-lg text-sm hover:bg-[#c9a96a]/10">Trocar Kit</button>
                </div>
              )}
            </>
          )}
        </div>
        {selectedKit && selectedPerfumes.length === 10 && (
          <div className="border-t border-[#c9a96a]/20 p-4 bg-gradient-to-t from-[#0a0807] to-transparent">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#e8d6a8]">Total do Kit</span>
              <span className="text-2xl font-bold text-[#e8c98a]">€ {kitPrice}</span>
            </div>
            <button onClick={handleFinalizeKit} className="w-full py-3 bg-gradient-to-r from-[#c9a96a] to-[#e8c98a] text-black rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
              Finalizar Kit no WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// =============================================
// PAGINA DE FAVORITOS
// =============================================
const FavoritesPage = () => {
  const { user, favorites, removeFromFavoritesGlobal, handleLogin } = useApp();
  const navigate = useNavigate();
  
  const findProductByName = (productName) => {
    if (!productName) return null;
    const normalizeName = (name) => name.toLowerCase().replace(/\s*\d+ml\s*/gi, '').replace(/\s+/g, ' ').trim();
    const searchName = normalizeName(productName);
    
    if (content.feminine?.products) {
      for (let i = 0; i < content.feminine.products.length; i++) {
        if (normalizeName(content.feminine.products[i].name) === searchName) return { category: 'femininos', index: i };
      }
    }
    if (content.masculine?.products) {
      for (let i = 0; i < content.masculine.products.length; i++) {
        if (normalizeName(content.masculine.products[i].name) === searchName) return { category: 'masculinos', index: i };
      }
    }
    if (content.unissex?.products) {
      for (let i = 0; i < content.unissex.products.length; i++) {
        if (normalizeName(content.unissex.products[i].name) === searchName) return { category: 'unissex', index: i };
      }
    }
    return null;
  };
  
  const handleProductClick = (product) => {
    const found = findProductByName(product.productName);
    if (found) navigate(`/produto/${found.category}/${found.index}`);
    else toast.error('Produto não encontrado');
  };
  
  if (!user) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] pt-32 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-20 h-20 text-[#c9a96a]/30 mx-auto mb-4" />
          <h2 className="text-2xl font-display text-[#1a1410] mb-2">Faça login para ver seus favoritos</h2>
          <button onClick={handleLogin} className="mt-4 px-8 py-3 bg-[#c9a96a] text-black rounded-lg font-semibold hover:bg-[#e8c98a] transition-all">Entrar agora</button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#f7f3ec] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display text-[#1a1410] mb-2">Meus Favoritos</h1>
            <p className="text-[#1a1410]/60">{favorites.length} perfumes favoritos</p>
          </div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-[#1a1410]/60 hover:text-[#c9a96a] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            Voltar
          </button>
        </div>
        {favorites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Heart className="w-20 h-20 text-[#c9a96a]/30 mx-auto mb-4" />
            <p className="text-[#1a1410]/60">Você ainda não tem perfumes favoritos</p>
            <button onClick={() => navigate('/')} className="mt-4 text-[#c9a96a] hover:underline">Explorar perfumes →</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div className="aspect-square bg-[#f7f3ec] flex items-center justify-center relative cursor-pointer" onClick={() => handleProductClick(item)}>
                  <img src={item.productImage} alt={item.productName} className="max-h-[80%] max-w-[80%] object-contain group-hover:scale-105" />
                  <button onClick={(e) => { e.stopPropagation(); removeFromFavoritesGlobal(item.productId); }} className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-red-50">
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-[#1a1410] truncate">{item.productName}</h3>
                  <p className="text-[#c9a96a] font-semibold mt-1">{item.productPrice || 'Sob encomenda'}</p>
                  <button onClick={() => handleProductClick(item)} className="w-full mt-3 py-2 border border-[#c9a96a] text-[#c9a96a] rounded-lg text-sm hover:bg-[#c9a96a] hover:text-black">Ver detalhes</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// =============================================
// PAGINA DE MINHAS AVALIACOES
// =============================================
const MyReviewsPage = () => {
  const { user, userReviews, handleLogin } = useApp();
  const navigate = useNavigate();
  
  const findProductByName = (productName) => {
    if (!productName) return null;
    const normalizeName = (name) => name.toLowerCase().replace(/\s*\d+ml\s*/gi, '').replace(/\s+/g, ' ').trim();
    const searchName = normalizeName(productName);
    
    if (content.feminine?.products) {
      for (let i = 0; i < content.feminine.products.length; i++) {
        if (normalizeName(content.feminine.products[i].name) === searchName) return { category: 'femininos', index: i };
      }
    }
    if (content.masculine?.products) {
      for (let i = 0; i < content.masculine.products.length; i++) {
        if (normalizeName(content.masculine.products[i].name) === searchName) return { category: 'masculinos', index: i };
      }
    }
    if (content.unissex?.products) {
      for (let i = 0; i < content.unissex.products.length; i++) {
        if (normalizeName(content.unissex.products[i].name) === searchName) return { category: 'unissex', index: i };
      }
    }
    return null;
  };
  
  const handleProductClick = (review) => {
    const found = findProductByName(review.productName);
    if (found) navigate(`/produto/${found.category}/${found.index}`);
    else toast.error('Produto não encontrado');
  };
  
  if (!user) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] pt-32 flex items-center justify-center">
        <div className="text-center">
          <Star className="w-20 h-20 text-[#c9a96a]/30 mx-auto mb-4" />
          <h2 className="text-2xl font-display text-[#1a1410] mb-2">Faça login para ver suas avaliações</h2>
          <button onClick={handleLogin} className="mt-4 px-8 py-3 bg-[#c9a96a] text-black rounded-lg font-semibold hover:bg-[#e8c98a] transition-all">Entrar agora</button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#f7f3ec] pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display text-[#1a1410] mb-2">Minhas Avaliações</h1>
            <p className="text-[#1a1410]/60">Suas avaliações e comentários sobre os perfumes</p>
          </div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-[#1a1410]/60 hover:text-[#c9a96a]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            Voltar
          </button>
        </div>
        {userReviews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Star className="w-20 h-20 text-[#c9a96a]/30 mx-auto mb-4" />
            <p className="text-[#1a1410]/60">Você ainda não fez nenhuma avaliação</p>
            <button onClick={() => navigate('/')} className="mt-4 text-[#c9a96a] hover:underline">Explorar perfumes →</button>
          </div>
        ) : (
          <div className="space-y-4">
            {userReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((i) => (<Star key={i} size={16} className={i <= review.rating ? 'fill-[#c9a96a] text-[#c9a96a]' : 'text-gray-300'} />))}
                      </div>
                      <span className="text-xs text-[#1a1410]/40">{new Date(review.createdAt).toLocaleDateString('pt-PT')}</span>
                    </div>
                    <p className="text-[#1a1410]/80 mb-3">{review.comment}</p>
                    <button onClick={() => handleProductClick(review)} className="text-sm text-[#c9a96a] hover:underline">Ver produto →</button>
                  </div>
                  <div className="w-16 h-16 bg-[#f7f3ec] rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={review.productImage} alt="" className="max-h-full max-w-full object-contain" />
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

// =============================================
// PRODUCT DETAIL (COM ALTERAÇÕES)
// =============================================
const ProductDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [mainImage, setMainImage] = useState('');
  const [showKitModal, setShowKitModal] = useState(false);
  const { 
    user, 
    addToKit, 
    selectedKit, 
    setSelectedKit, 
    kitSize, 
    setKitSize, 
    selectedPerfumes,
    addToFavoritesGlobal, 
    removeFromFavoritesGlobal, 
    loadUserReviews, 
    handleLogin 
  } = useApp();

  const extractPriceValue = (priceStr) => {
    if (!priceStr) return 0;
    const numericStr = priceStr.toString().replace(/[€]/g, '').replace(',', '.').trim();
    return parseFloat(numericStr);
  };

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      try {
        const productIndex = parseInt(id);
        let productsList = [];
        let categoryName = '';
        let foundProduct = null;
        
        if (category === 'femininos') {
          productsList = content.feminine?.products || [];
          categoryName = 'femininos';
          foundProduct = productsList[productIndex];
        } else if (category === 'masculinos') {
          productsList = content.masculine?.products || [];
          categoryName = 'masculinos';
          foundProduct = productsList[productIndex];
        } else if (category === 'unissex') {
          productsList = content.unissex?.products || [];
          categoryName = 'unissex';
          foundProduct = productsList[productIndex];
        }
        
        if (foundProduct) {
          const enhancedProduct = {
            ...foundProduct,
            id: productIndex,
            images: foundProduct.images || [foundProduct.image, foundProduct.hoverImage || foundProduct.image],
            category: categoryName,
          };
          setProduct(enhancedProduct);
          setMainImage(enhancedProduct.images[0]);
          setSelectedSize(null);
        } else {
          setProduct(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, category]);

  useEffect(() => {
    const loadReviews = async () => {
      if (!product) return;
      const result = await getProductReviews(id);
      if (result.success) setReviews(result.reviews);
      const ratingResult = await getProductRating(id);
      if (ratingResult.success) {
        setAverageRating(ratingResult.average);
        setTotalReviews(ratingResult.total);
      }
    };
    loadReviews();
  }, [id, product]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user && product) {
        try {
          const q = query(collection(db, "favorites"), where("userId", "==", user.uid), where("productId", "==", String(product.id)));
          const querySnapshot = await getDocs(q);
          setIsFavorite(!querySnapshot.empty);
        } catch (err) { console.error(err); }
      }
    };
    checkFavorite();
  }, [user, product]);

  const handleAddToKit = () => {
    if (!user) { 
      toast.error('Faça login para adicionar ao kit');
      handleLogin();
      return; 
    }
    if (selectedKit && kitSize === selectedSize) {
      addToKit(product);
      return;
    }
    setShowKitModal(true);
  };

  const handleSelectKit = (size) => {
    setSelectedKit(true);
    setKitSize(size);
    setShowKitModal(false);
    toast.success(`Kit ${size} - 10 decants selecionado! Adicione 10 perfumes.`);
  };

  const handleToggleFavorite = () => {
    if (!user) {
      toast.error('Faça login para favoritar');
      handleLogin();
      return;
    }
    if (isFavorite) {
      removeFromFavoritesGlobal(product.id);
      setIsFavorite(false);
      toast.success('Removido dos favoritos');
    } else {
      addToFavoritesGlobal({ ...product, price: null });
      setIsFavorite(true);
      toast.success('Adicionado aos favoritos');
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Faça login para avaliar');
      handleLogin();
      return;
    }
    if (rating === 0) {
      toast.error('Selecione uma nota');
      return;
    }
    if (!comment.trim()) {
      toast.error('Escreva um comentário');
      return;
    }
    
    const submit = async () => {
      const result = await addReview(id, user.uid, user.displayName || user.email, user.photoURL, rating, comment, product?.name, product?.image, category);
      if (result?.success) {
        toast.success('Avaliação publicada!');
        setRating(0);
        setComment('');
        const newReviews = await getProductReviews(id);
        if (newReviews.success) setReviews(newReviews.reviews);
        const newRating = await getProductRating(id);
        if (newRating.success) {
          setAverageRating(newRating.average);
          setTotalReviews(newRating.total);
        }
        if (loadUserReviews) loadUserReviews();
      } else {
        toast.error('Erro ao publicar avaliação');
      }
    };
    submit();
  };

  const handleWhatsAppEncomenda = () => {
    const message = `*ENCOMENDA - NORAYA PERFUMES*\n\n*Produto:* ${product?.name}\n*Tamanho:* 100ml (Frasco original)\n*Preço:* Sob consulta\n\n*Cliente:* ${user?.displayName || user?.email || 'Cliente'}\n\nGostaria de saber o valor e disponibilidade deste perfume.`;
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), '_blank');
    toast.success('Redirecionando para o WhatsApp...');
  };

  if (loading) return <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center pt-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a96a]"></div></div>;
  if (!product) return <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center pt-20"><p>Produto não encontrado</p><button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-[#c9a96a] text-white rounded-lg">Voltar</button></div>;

  const isDecant = selectedSize && ['2ml', '3ml', '5ml', '10ml'].includes(selectedSize);
  const kitPrice = selectedSize ? KIT_PRICES[selectedSize] : 0;

  return (
    <div className="bg-[#f7f3ec] min-h-screen pb-16 pt-24">
      <KitChoiceModal isOpen={showKitModal} onClose={() => setShowKitModal(false)} onSelectKit={handleSelectKit} selectedSize={selectedSize} />
      <div className="bg-white border-b border-[#c9a96a]/15 sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#1a1410]/60">
              <Link to="/" className="hover:text-[#c9a96a]">Home</Link><span>/</span>
              <Link to={`/#${product.category}`} className="hover:text-[#c9a96a]">{product.category === 'femininos' ? 'Para Ela' : product.category === 'masculinos' ? 'Para Ele' : 'Unissex'}</Link><span>/</span>
              <span className="text-[#c9a96a] truncate">{product.name}</span>
            </div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-[#1a1410]/60 hover:text-[#c9a96a] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
              Voltar
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            <div>
              <div className="aspect-square bg-[#f7f3ec] rounded-xl relative overflow-hidden">
                <img src={mainImage} alt={product.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {product.images && product.images.map((img, idx) => (
                  <button key={idx} onClick={() => setMainImage(img)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${mainImage === img ? 'border-[#c9a96a] shadow-md' : 'border-gray-200 hover:border-[#c9a96a]/50'}`}>
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
                <button onClick={() => setMainImage('/images/decant2ml.png')} className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-[#c9a96a] relative">
                  <img src="/images/decant2ml.png" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[9px] text-center py-0.5">Decant 2ml</span>
                </button>
                <button onClick={() => setMainImage('/images/decant.png')} className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-[#c9a96a] relative">
                  <img src="/images/decant.png" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[9px] text-center py-0.5">Decant 3ml</span>
                </button>
                <button onClick={() => setMainImage('/images/decant1.png')} className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-[#c9a96a] relative">
                  <img src="/images/decant1.png" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[9px] text-center py-0.5">Decant 5ml</span>
                </button>
                <button onClick={() => setMainImage('/images/decant10ml.png')} className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-[#c9a96a] relative">
                  <img src="/images/decant10ml.png" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[9px] text-center py-0.5">Decant 10ml</span>
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <div><p className="text-sm text-[#c9a96a] font-semibold tracking-wide">{product.brand || 'LATTAFA'}</p><h1 className="text-2xl lg:text-3xl font-display font-bold text-[#1a1410] mt-1">{product.name}</h1></div>
              <div className="flex items-center gap-3"><div className="flex gap-1">{[...Array(5)].map((_, i) => (<Star key={i} size={18} className={i < Math.floor(averageRating) ? 'fill-[#c9a96a] text-[#c9a96a]' : 'text-gray-300'} />))}</div><span className="text-sm text-[#1a1410]/60">({totalReviews} avaliações)</span></div>
              
              <div><label className="block text-sm font-medium mb-3 text-[#1a1410]">TAMANHO</label>
                <div className="flex gap-3 flex-wrap">
                  {/* Apenas Decants - Sem opção de 100ml para compra direta */}
                  <button 
                    onClick={() => setSelectedSize('2ml')} 
                    className={`px-5 py-2.5 rounded-lg border-2 transition-all ${selectedSize === '2ml' ? 'border-[#c9a96a] bg-[#f7f3ec] text-[#c9a96a] font-semibold shadow-md' : 'border-gray-300 hover:border-[#c9a96a]/50'}`}
                  >
                    2ml - Decant (Kit 10un)
                  </button>
                  <button 
                    onClick={() => setSelectedSize('3ml')} 
                    className={`px-5 py-2.5 rounded-lg border-2 transition-all ${selectedSize === '3ml' ? 'border-[#c9a96a] bg-[#f7f3ec] text-[#c9a96a] font-semibold shadow-md' : 'border-gray-300 hover:border-[#c9a96a]/50'}`}
                  >
                    3ml - Decant (Kit 10un)
                  </button>
                  <button 
                    onClick={() => setSelectedSize('5ml')} 
                    className={`px-5 py-2.5 rounded-lg border-2 transition-all ${selectedSize === '5ml' ? 'border-[#c9a96a] bg-[#f7f3ec] text-[#c9a96a] font-semibold shadow-md' : 'border-gray-300 hover:border-[#c9a96a]/50'}`}
                  >
                    5ml - Decant (Kit 10un)
                  </button>
                  <button 
                    onClick={() => setSelectedSize('10ml')} 
                    className={`px-5 py-2.5 rounded-lg border-2 transition-all ${selectedSize === '10ml' ? 'border-[#c9a96a] bg-[#f7f3ec] text-[#c9a96a] font-semibold shadow-md' : 'border-gray-300 hover:border-[#c9a96a]/50'}`}
                  >
                    10ml - Decant (Kit 10un)
                  </button>
                </div>
              </div>
              
              {isDecant && (
                <div className="bg-gradient-to-r from-[#1a1410] to-[#0a0807] p-4 rounded-xl border border-[#c9a96a]/20">
                  <p className="text-[#e8c98a] font-semibold text-lg">🎁 Kit de Decants {selectedSize}</p>
                  <p className="text-[#c9a96a]/80 text-sm mt-1">
                    10 decants de {selectedSize} por apenas <span className="font-bold text-[#e8c98a]">{kitPrice.toFixed(2)} €</span>
                  </p>
                  <p className="text-[#c9a96a]/60 text-xs mt-2">*Os decants são vendidos apenas em kits de 10 unidades.</p>
                  {!selectedKit ? (
                    <button onClick={handleAddToKit} className="mt-4 w-full py-2 bg-gradient-to-r from-[#c9a96a] to-[#e8c98a] text-black rounded-lg font-semibold hover:shadow-lg transition-all">
                      SELECIONAR KIT
                    </button>
                  ) : kitSize !== selectedSize ? (
                    <div className="mt-3 flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-2 rounded-lg">
                      <span>⚠️</span> Seu kit atual é para decants de {kitSize}. Clique em "SELECIONAR KIT" para trocar.
                    </div>
                  ) : (
                    <button onClick={handleAddToKit} className="mt-4 w-full py-2 bg-gradient-to-r from-[#c9a96a] to-[#e8c98a] text-black rounded-lg font-semibold hover:shadow-lg transition-all">
                      ADICIONAR AO KIT ({selectedPerfumes?.length || 0}/10)
                    </button>
                  )}
                </div>
              )}
              
              {/* Botão de Encomenda para o frasco de 100ml */}
              <div className="bg-gradient-to-r from-[#1a1410] to-[#0a0807] p-4 rounded-xl border border-[#c9a96a]/20">
                <p className="text-[#e8c98a] font-semibold text-lg">📦 Frasco Original 100ml</p>
                <p className="text-[#c9a96a]/80 text-sm mt-1">
                  Produto disponível sob encomenda.
                </p>
                <p className="text-[#c9a96a]/60 text-xs mt-2">*Consulte preço e disponibilidade via WhatsApp.</p>
                <button onClick={handleWhatsAppEncomenda} className="mt-4 w-full py-2 bg-gradient-to-r from-[#c9a96a] to-[#e8c98a] text-black rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  ENCOMENDAR PELO WHATSAPP
                </button>
              </div>
              
              <div className="flex gap-3"><button onClick={handleToggleFavorite} className={`flex-1 py-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${isFavorite ? 'border-red-400 bg-red-50 text-red-500' : 'border-gray-300 hover:border-red-300'}`}><Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />{isFavorite ? 'Favoritado' : 'Favoritar'}</button></div>
              
              <div className="border-t border-gray-100 pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#1a1410]/70"><Truck className="w-5 h-5 text-[#c9a96a]" />Frete grátis acima de 50€</div>
                <div className="flex items-center gap-3 text-sm text-[#1a1410]/70"><Shield className="w-5 h-5 text-[#c9a96a]" />Produto 100% original</div>
                <div className="flex items-center gap-3 text-sm text-[#1a1410]/70"><RefreshCw className="w-5 h-5 text-[#c9a96a]" />Devolução gratuita</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 p-6 lg:p-8"><h2 className="text-xl font-display font-bold text-[#1a1410] mb-4">Descrição</h2><p className="text-[#1a1410]/80 leading-relaxed">{product.fullDescription || product.description}</p></div>
          <div className="border-t border-gray-200 p-6 lg:p-8">
            <h3 className="text-xl font-display font-bold text-[#1a1410] mb-4">Avaliações ({totalReviews})</h3>
            {user ? (
              <form onSubmit={handleSubmitReview} className="mb-8 p-5 bg-[#f7f3ec] rounded-xl">
                <h4 className="font-semibold text-[#1a1410] mb-3">Avalie este produto</h4>
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map((i) => (<Star key={i} size={28} className="cursor-pointer transition-all hover:scale-110" onClick={() => setRating(i)} onMouseEnter={() => setHoverRating(i)} onMouseLeave={() => setHoverRating(0)} fill={i <= (hoverRating || rating) ? '#c9a96a' : 'none'} stroke={i <= (hoverRating || rating) ? '#c9a96a' : '#9ca3af'} />))}
                </div>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Compartilhe sua experiência..." className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#c9a96a] mb-3 resize-none" rows="3" />
                <button type="submit" className="bg-[#c9a96a] text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-[#e8c98a]">Publicar avaliação</button>
              </form>
            ) : (
              <div className="mb-8 p-5 bg-[#f7f3ec] rounded-xl text-center">
                <p>Faça login para avaliar este produto</p>
                <button onClick={handleLogin} className="mt-2 text-[#c9a96a] hover:underline">Entrar agora</button>
              </div>
            )}
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-5 mb-5">
                <div className="flex items-center gap-3 mb-2">
                  {review.userPhoto ? <img src={review.userPhoto} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a96a]/20 to-[#c9a96a]/10 flex items-center justify-center"><User size={20} className="text-[#c9a96a]" /></div>}
                  <div><p className="font-semibold text-[#1a1410]">{review.userName}</p><div className="flex gap-1">{[1,2,3,4,5].map((i) => (<Star key={i} size={12} className={i <= review.rating ? 'fill-[#c9a96a] text-[#c9a96a]' : 'text-gray-300'} />))}</div></div>
                </div>
                <p className="text-[#1a1410]/80 text-sm">{review.comment}</p>
                <button onClick={async () => { await markHelpful(review.id); const newReviews = await getProductReviews(id); if (newReviews.success) setReviews(newReviews.reviews); }} className="text-xs text-[#1a1410]/40 hover:text-[#c9a96a] mt-2">👍 Útil ({review.helpful || 0})</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// PRODUCT CARD
// =============================================
const ProductCard = ({ p, dark = false, index, category }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const findProductByName = (productName) => {
    if (!productName) return null;
    const normalizeName = (name) => name.toLowerCase().replace(/\s*\d+ml\s*/gi, '').replace(/\s+/g, ' ').trim();
    const searchName = normalizeName(productName);
    
    if (content.feminine?.products) {
      for (let i = 0; i < content.feminine.products.length; i++) {
        if (normalizeName(content.feminine.products[i].name) === searchName) return { category: 'femininos', index: i };
      }
    }
    if (content.masculine?.products) {
      for (let i = 0; i < content.masculine.products.length; i++) {
        if (normalizeName(content.masculine.products[i].name) === searchName) return { category: 'masculinos', index: i };
      }
    }
    if (content.unissex?.products) {
      for (let i = 0; i < content.unissex.products.length; i++) {
        if (normalizeName(content.unissex.products[i].name) === searchName) return { category: 'unissex', index: i };
      }
    }
    return null;
  };
  
  const handleClick = () => {
    if (category && (category === 'femininos' || category === 'masculinos' || category === 'unissex')) {
      navigate(`/produto/${category}/${index}`);
      return;
    }
    if (p && p.name) {
      const found = findProductByName(p.name);
      if (found) { navigate(`/produto/${found.category}/${found.index}`); return; }
    }
    toast.error('Produto não encontrado');
  };
  
  if (!p || !p.name) return null;
  
  return (
    <div onClick={handleClick} className="group flex flex-col items-center cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`w-full aspect-[3/4] flex items-center justify-center transition-all duration-500 overflow-hidden ${dark ? "bg-[#0a0807]" : "bg-[#f7f3ec]"}`}>
        <img src={isHovered && p.hoverImage ? p.hoverImage : p.image} alt={p.name} className="max-h-[90%] max-w-[90%] object-contain transition-all duration-500 group-hover:scale-105" />
      </div>
      <h3 className={`font-display text-lg lg:text-xl mt-4 mb-1 text-center ${dark ? "text-[#e8d6a8]" : "text-[#1a1410]"}`}>{p.name}</h3>
      <p className={`text-sm tracking-wider ${dark ? "text-[#c9a96a]/70" : "text-neutral-500"}`}>Sob encomenda</p>
    </div>
  );
};

// =============================================
// BEST SELLERS
// =============================================
const BestSellers = () => {
  if (!content?.bestSellers) return null;
  return (
    <section id="mais-vendidos" className="bg-[#f7f3ec] py-28 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20"><p className="text-neutral-500 tracking-[0.4em] text-xs mb-5">{content.bestSellers.kicker}</p><h2 className="font-display text-[#1a1410] text-5xl lg:text-6xl">{content.bestSellers.titleLine1} <span className="italic text-[#7a5a2e]">{content.bestSellers.titleItalic}</span></h2></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-6 mb-16">
          {content.bestSellers.products?.map((p, i) => (<ProductCard key={i} p={p} />))}
        </div>
        <div className="flex justify-center"><button onClick={() => toast.success("Catálogo completo em breve")} className="px-14 py-4 border border-[#1a1410] text-[#1a1410] tracking-[0.3em] text-xs hover:bg-[#1a1410] hover:text-[#e8c98a] transition-all">{content.bestSellers.cta.toUpperCase()}</button></div>
      </div>
    </section>
  );
};

// =============================================
// TRENDS
// =============================================
const Trends = () => {
  if (!content?.trends) return null;
  return (
    <section className="bg-[#f7f3ec] py-28 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20"><p className="text-neutral-500 tracking-[0.4em] text-xs mb-5">{content.trends.kicker}</p><h2 className="font-display text-[#1a1410] text-5xl lg:text-6xl">{content.trends.titleLine1} <span className="italic text-[#7a5a2e]">{content.trends.titleItalic}</span></h2></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {content.trends.products?.map((p, i) => (<ProductCard key={i} p={p} />))}
        </div>
      </div>
    </section>
  );
};

// =============================================
// CATEGORY SECTION
// =============================================
const CategorySection = ({ id, data, dark = false }) => {
  if (!data?.products) return null;
  const validProducts = data.products.filter(p => p && p.name);
  return (
    <section id={id} className={`${dark ? "bg-[#0a0807]" : "bg-white"} py-24 lg:py-32`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16"><p className={`tracking-[0.4em] text-xs mb-5 ${dark ? "text-[#c9a96a]" : "text-neutral-500"}`}>{data.kicker}</p><h2 className={`font-display text-5xl lg:text-6xl mb-4 ${dark ? "text-white" : "text-[#1a1410]"}`}>{data.titleLine1} <span className={`italic ${dark ? "text-[#e8c98a]" : "text-[#7a5a2e]"}`}>{data.titleItalic}</span></h2>{data.description && <p className={`max-w-xl mx-auto font-light ${dark ? "text-[#d9cfb8]" : "text-neutral-600"}`}>{data.description}</p>}</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-6">
          {validProducts.map((p, i) => (<ProductCard key={i} p={p} dark={dark} index={i} category={id} />))}
        </div>
      </div>
    </section>
  );
};

// =============================================
// HERO
// =============================================
const Hero = () => {
  if (!content?.hero) return null;
  return (
    <section className="relative min-h-screen w-full flex items-center pt-20">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${content.hero.background})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
        <div className="max-w-2xl">
          <p className="text-[#c9a96a] tracking-[0.4em] text-xs mb-8">{content.hero.kicker}</p>
          <h1 className="font-display text-white text-5xl sm:text-6xl lg:text-8xl leading-[0.95] mb-2">{content.hero.titleLine1}</h1>
          <h1 className="font-display italic text-[#e8c98a] text-5xl sm:text-6xl lg:text-8xl leading-[0.95] mb-10">{content.hero.titleItalic}</h1>
          <p className="text-[#d9cfb8] text-base lg:text-lg max-w-md mb-12">{content.hero.description}</p>
          <button onClick={() => document.getElementById("mais-vendidos")?.scrollIntoView({ behavior: "smooth" })} className="px-14 py-4 border border-[#c9a96a] text-[#e8c98a] tracking-[0.3em] text-xs hover:bg-[#c9a96a] hover:text-black transition-all">{content.hero.cta.toUpperCase()}</button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#c9a96a]/60 text-[10px] tracking-[0.4em]">ROLE ↓</div>
    </section>
  );
};

// =============================================
// BANNER
// =============================================
const Banner = () => {
  if (!content?.banner) return null;
  return (
    <section className="bg-[#0a0807]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="bg-[#0a0807] flex items-center px-8 lg:px-20 py-20 lg:py-0 order-2 lg:order-1"><div className="max-w-md"><p className="text-[#c9a96a] tracking-[0.4em] text-xs mb-8">{content.banner.kicker}</p><h2 className="font-display text-white text-5xl lg:text-7xl leading-[1] mb-2">{content.banner.titleLine1} <span className="italic text-[#e8c98a]">{content.banner.titleItalic}</span></h2><h2 className="font-display text-white text-5xl lg:text-7xl leading-[1] mb-10">{content.banner.titleLine2}</h2><p className="text-[#d9cfb8] text-base mb-12">{content.banner.description}</p><button onClick={() => toast.success("Adicionado à lista de desejos")} className="bg-[#c9a96a] text-black px-14 py-4 tracking-[0.3em] text-xs hover:bg-[#e8c98a] transition-all">{content.banner.cta.toUpperCase()}</button></div></div>
        <div className="relative min-h-[60vh] lg:min-h-[80vh] bg-cover bg-center order-1 lg:order-2" style={{ backgroundImage: `url(${content.banner.image})` }} />
      </div>
    </section>
  );
};

// =============================================
// FOLLOW
// =============================================
const Follow = () => {
  if (!content?.follow) return null;
  return (
    <section className="bg-[#1a1410] py-24 lg:py-28">
      <div className="text-center mb-14 px-6"><h3 className="font-display text-white text-4xl lg:text-5xl mb-3">{content.follow.kicker}<span className="italic text-[#e8c98a]">nos</span></h3>
        <a href={content.follow.instagramUrl || "https://www.instagram.com/noraya.oud/"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#c9a96a] tracking-[0.3em] text-sm hover:text-[#e8c98a] transition-colors">
          <Instagram size={16} /> {content.follow.handle}
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-0">{content.follow.gallery?.map((src, i) => (<div key={i} className="aspect-square overflow-hidden"><img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" /></div>))}</div>
    </section>
  );
};

// =============================================
// NEWSLETTER
// =============================================
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const submit = (e) => { e.preventDefault(); if (!email) { toast.error("Informe seu e-mail"); return; } toast.success("Inscrição realizada!"); setEmail(""); };
  if (!content?.newsletter) return null;
  return (
    <section className="bg-[#0a0807] py-28 lg:py-36 text-center">
      <div className="max-w-2xl mx-auto px-6"><h2 className="font-display text-white text-5xl lg:text-7xl leading-[1.05] mb-10">{content.newsletter.titleLine1} <span className="italic text-[#e8c98a]">{content.newsletter.titleItalic}</span></h2><p className="text-[#d9cfb8] mb-12">{content.newsletter.description}</p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={content.newsletter.placeholder} className="flex-1 bg-transparent border border-[#c9a96a]/50 text-white placeholder:text-[#c9a96a]/60 px-5 py-4 focus:outline-none focus:border-[#e8c98a]" /><button type="submit" className="bg-[#c9a96a] text-black px-10 py-4 tracking-[0.3em] text-xs hover:bg-[#e8c98a]">{content.newsletter.cta.toUpperCase()}</button></form>
      </div>
    </section>
  );
};

// =============================================
// FOOTER
// =============================================
const Footer = () => {
  if (!content?.footer) return null;
  return (
    <footer className="bg-[#050403] text-[#c9a96a]/80 py-20 border-t border-[#c9a96a]/15">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          <div><img src={content.brand.logo} alt="Noraya" className="h-20 w-20 object-contain mb-4" /><div className="font-display tracking-[0.25em] text-[#e8c98a] text-xl">{content.brand.name}</div><div className="text-[10px] tracking-[0.3em] text-[#c9a96a]/60 mt-1">{content.brand.tagline}</div></div>
          {content.footer.columns?.map((c) => (<div key={c.title}><h4 className="text-[#e8c98a] tracking-[0.3em] text-xs mb-5">{c.title}</h4><ul className="space-y-3 text-sm font-light">{c.links.map((l) => (<li key={l}><a href="#" className="hover:text-[#e8c98a] transition-colors">{l}</a></li>))}</ul></div>))}
        </div>
        <div className="pt-8 border-t border-[#c9a96a]/15 text-xs text-center tracking-wider">{content.footer.copyright}</div>
      </div>
    </footer>
  );
};

// =============================================
// HOME PAGE
// =============================================
const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <BestSellers />
      <Banner />
      <CategorySection id="femininos" data={content.feminine} dark={false} />
      <CategorySection id="masculinos" data={content.masculine} dark={true} />
      <CategorySection id="unissex" data={content.unissex} dark={false} />
      <Trends />
      <Follow />
      <Newsletter />
      <Footer />
      <CartDrawer />
      <KitDrawer />
    </>
  );
};

// =============================================
// APP PRINCIPAL
// =============================================
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isKitOpen, setIsKitOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState(false);
  const [kitSize, setKitSize] = useState(null);
  const [selectedPerfumes, setSelectedPerfumes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [userReviews, setUserReviews] = useState([]);

  const kitPrice = kitSize ? KIT_PRICES[kitSize].toFixed(2) : '0';
  const kitCount = selectedPerfumes.length;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        await loadCart(user.uid);
        await loadFavorites(user.uid);
        await loadUserReviews(user.uid);
      } else {
        setCart([]);
        setCartCount(0);
        setFavorites([]);
        setFavoritesCount(0);
        setUserReviews([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadCart = async (userId) => {
    const cartResult = await getCartDB(userId);
    if (cartResult.success) {
      setCart(cartResult.cart);
      setCartCount(cartResult.cart.reduce((total, item) => total + item.quantity, 0));
    }
  };

  const loadFavorites = async (userId) => {
    try {
      const q = query(collection(db, "favorites"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const favoritesList = [];
      querySnapshot.forEach((doc) => favoritesList.push({ id: doc.id, ...doc.data() }));
      setFavorites(favoritesList);
      setFavoritesCount(favoritesList.length);
    } catch (error) { console.error("Erro ao carregar favoritos:", error); }
  };

  const loadUserReviews = async (userId) => {
    try {
      const q = query(collection(db, "reviews"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const reviewsList = [];
      querySnapshot.forEach((doc) => reviewsList.push({ id: doc.id, ...doc.data() }));
      setUserReviews(reviewsList);
    } catch (error) { console.error("Erro ao carregar avaliações:", error); }
  };

  const handleLogin = async () => {
    const result = await signInWithGoogle();
    if (result.success) {
      toast.success(`Bem-vindo, ${result.user.displayName}!`);
      await loadFavorites(result.user.uid);
      await loadUserReviews(result.user.uid);
      await loadCart(result.user.uid);
    } else {
      toast.error('Erro ao fazer login');
    }
  };

  const handleLogout = async () => {
    await logout();
    setCart([]);
    setCartCount(0);
    setFavorites([]);
    setFavoritesCount(0);
    setUserReviews([]);
    toast.success('Logout realizado!');
  };

  const addToCart = async (product, price, size, quantity) => {
    if (!user) return;
    const result = await addToCartDB(user.uid, product.id, product.name, product.image, price, size, quantity);
    if (result.success) {
      await loadCart(user.uid);
      toast.success(`${quantity}x ${product.name} adicionado ao carrinho`);
    } else {
      toast.error('Erro ao adicionar');
    }
  };

  const handleUpdateQuantity = async (cartId, currentQuantity, delta) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity < 1) return;
    const result = await updateCartQuantityDB(cartId, newQuantity);
    if (result.success) {
      setCart(prevCart => prevCart.map(item => item.id === cartId ? { ...item, quantity: newQuantity } : item));
      setCartCount(prevCount => prevCount + delta);
    } else {
      toast.error('Erro ao atualizar quantidade');
    }
  };

  const handleRemoveFromCart = async (cartId) => {
    if (!user) {
      toast.error('Faça login para remover itens');
      return;
    }
    if (!cartId) {
      toast.error('ID do item inválido');
      return;
    }
    try {
      const cartRef = doc(db, "cart", cartId);
      await deleteDoc(cartRef);
      const removedItem = cart.find(item => item.id === cartId);
      setCart(prevCart => prevCart.filter(item => item.id !== cartId));
      if (removedItem) {
        setCartCount(prevCount => prevCount - (removedItem.quantity || 0));
      }
      toast.success('Item removido do carrinho');
    } catch (error) {
      console.error('Erro detalhado ao remover item:', error);
      toast.error('Erro ao remover item');
    }
  };

  const getCartTotal = () => {
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    return total;
  };

  const getCartItemsForWhatsApp = () => {
    let message = "*NOVO PEDIDO - NORAYA PERFUMES*\n\n";
    message += "*Cliente:* " + (user?.displayName || user?.email || 'Cliente') + "\n";
    message += "*Email:* " + (user?.email || 'Não informado') + "\n";
    message += "*Data:* " + new Date().toLocaleString('pt-PT') + "\n\n";
    message += "*ITENS DO PEDIDO:*\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.productName}*\n   Tamanho: ${item.size}\n   Quantidade: ${item.quantity}\n   Preço unitário: € ${item.price.toFixed(2)}\n   Subtotal: € ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    message += `*TOTAL DO PEDIDO:* € ${getCartTotal()}\n\n*Entrega:* Frete a calcular\n*Pagamento:* A confirmar\n\nAguardando confirmação do pedido. Obrigado!`;
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  };

  const sendKitToWhatsApp = () => {
    let message = "*NOVO KIT DE DECANTS - NORAYA PERFUMES*\n\n";
    message += "*Cliente:* " + (user?.displayName || user?.email || 'Cliente') + "\n";
    message += "*Email:* " + (user?.email || 'Não informado') + "\n";
    message += "*Data:* " + new Date().toLocaleString('pt-PT') + "\n\n";
    message += `*KIT ${kitSize?.toUpperCase()} - 10 DECANTS*\n*Valor do Kit:* € ${kitPrice}\n\n*PERFUMES SELECIONADOS:*\n`;
    selectedPerfumes.forEach((p, index) => { message += `${index + 1}. ${p.name}\n`; });
    message += `\n*Total de perfumes:* ${selectedPerfumes.length}/10\n*Total do pedido:* € ${kitPrice}\n\nAguardando confirmação do pedido. Obrigado!`;
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), '_blank');
    toast.success('Redirecionando para o WhatsApp...');
  };

  const addToFavoritesGlobal = async (product) => {
    if (!user) return;
    try {
      const favoriteData = {
        userId: user.uid, productId: String(product.id), productName: product.name,
        productImage: product.image, productPrice: null,
        category: product.category, createdAt: new Date().toISOString()
      };
      const docRef = doc(collection(db, "favorites"));
      await setDoc(docRef, favoriteData);
      await loadFavorites(user.uid);
      toast.success('Adicionado aos favoritos');
    } catch (error) { 
      console.error(error);
      toast.error('Erro ao adicionar aos favoritos'); 
    }
  };

  const removeFromFavoritesGlobal = async (productId) => {
    if (!user) return;
    try {
      const q = query(collection(db, "favorites"), where("userId", "==", user.uid), where("productId", "==", String(productId)));
      const querySnapshot = await getDocs(q);
      for (const docSnapshot of querySnapshot.docs) {
        await deleteDoc(docSnapshot.ref);
      }
      await loadFavorites(user.uid);
      toast.success('Removido dos favoritos');
    } catch (error) { 
      console.error('Erro ao remover dos favoritos:', error);
      toast.error('Erro ao remover dos favoritos'); 
    }
  };

  const addToKit = (product) => {
    if (!kitSize) { 
      toast.error('Selecione um kit primeiro'); 
      return false; 
    }
    if (selectedPerfumes.length >= 10) { 
      toast.error(`Limite de 10 perfumes atingido`); 
      return false; 
    }
    if (selectedPerfumes.find(p => p.id === product.id)) { 
      toast.info(product.name + ' já está no seu kit!'); 
      return false; 
    }
    setSelectedPerfumes([...selectedPerfumes, { id: product.id, name: product.name, image: product.image, size: kitSize }]);
    toast.success(product.name + ' adicionado ao kit! (' + (selectedPerfumes.length + 1) + '/10)');
    return true;
  };

  const removeFromKit = (id) => { setSelectedPerfumes(selectedPerfumes.filter(p => p.id !== id)); toast.info('Perfume removido do kit'); };
  const clearKit = () => { setSelectedPerfumes([]); toast.info('Kit limpo'); };
  const resetKit = () => { setSelectedKit(false); setKitSize(null); setSelectedPerfumes([]); toast.info('Kit resetado'); };

  return (
    <AppContext.Provider value={{
      content, user, handleLogin, handleLogout,
      cart, cartCount, isCartOpen, openCart: () => setIsCartOpen(true), closeCart: () => setIsCartOpen(false),
      handleUpdateQuantity, handleRemoveFromCart, getCartTotal, addToCart,
      getCartItemsForWhatsApp, sendKitToWhatsApp,
      isKitOpen, openKit: () => setIsKitOpen(true), closeKit: () => setIsKitOpen(false),
      selectedKit, setSelectedKit, kitSize, setKitSize,
      selectedPerfumes, addToKit, removeFromKit, clearKit, resetKit, kitPrice, kitCount,
      favorites, favoritesCount, addToFavoritesGlobal, removeFromFavoritesGlobal,
      userReviews, loadUserReviews: () => user && loadUserReviews(user.uid)
    }}>
      <div className="bg-[#0a0807] min-h-screen">
        <Toaster position="bottom-right" toastOptions={{ style: { background: "#1a1410", color: "#e8c98a", border: "1px solid rgba(201,169,106,0.3)" } }} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produto/:category/:id" element={<ProductDetail />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
            <Route path="/minhas-avaliacoes" element={<MyReviewsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;