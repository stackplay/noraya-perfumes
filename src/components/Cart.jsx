import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { auth, getCart, updateCartQuantity, removeFromCart } from '../services/firebase';
import { toast } from 'sonner';

const Cart = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        await loadCart(user.uid);
      } else {
        setCart([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isOpen]);

  const loadCart = async (userId) => {
    const result = await getCart(userId);
    if (result.success) {
      setCart(result.cart);
    }
  };

  const handleUpdateQuantity = async (cartId, currentQuantity, delta) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity < 1) return;
    const result = await updateCartQuantity(cartId, newQuantity);
    if (result.success) {
      setCart(cart.map(item => 
        item.id === cartId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleRemove = async (cartId) => {
    const result = await removeFromCart(cartId);
    if (result.success) {
      setCart(cart.filter(item => item.id !== cartId));
      toast.success('Item removido do carrinho');
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0807] border-l border-[#c9a96a]/30 z-50 shadow-2xl flex flex-col">
        <div className="p-4 border-b border-[#c9a96a]/20 flex justify-between items-center">
          <h2 className="text-xl font-display text-[#e8c98a]">Meu Carrinho</h2>
          <button onClick={onClose} className="text-[#c9a96a] hover:text-[#e8c98a]">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!user ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-[#c9a96a]/30 mx-auto mb-4" />
              <p className="text-[#c9a96a]/60">Faça login para ver seu carrinho</p>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c9a96a] mx-auto"></div>
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
                          className="p-1 hover:bg-[#0a0807] rounded transition-colors"
                        >
                          <Minus size={14} className="text-[#c9a96a]" />
                        </button>
                        <span className="text-[#e8d6a8] text-sm w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                          className="p-1 hover:bg-[#0a0807] rounded transition-colors"
                        >
                          <Plus size={14} className="text-[#c9a96a]" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#e8c98a] font-semibold">{(item.price * item.quantity).toFixed(2)} €</span>
                        <button onClick={() => handleRemove(item.id)} className="p-1 hover:bg-red-500/20 rounded">
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
          <div className="border-t border-[#c9a96a]/20 p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#e8d6a8]">Total</span>
              <span className="text-2xl font-bold text-[#e8c98a]">{getTotal()} €</span>
            </div>
            <button className="w-full py-3 bg-[#c9a96a] text-black rounded-lg font-semibold hover:bg-[#e8c98a] transition-colors">
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
