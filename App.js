import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { ShoppingBag, ShoppingCart, User, Menu, X, Instagram, Globe, Star, Heart, Share2, Truck, Shield, RefreshCw, Minus, Plus, Check, Trash2, Package, Bottle } from "lucide-react";
import { toast, Toaster } from "sonner";
import * as ptBR from "./data/content";
import * as ptPT from "./data/content-ptpt";
import "./App.css";

const getContent = (locale) => {
  return locale === 'pt-BR' ? ptBR : ptPT;
};

// Contexto do carrinho de decants
const CartContext = React.createContext();

const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const CartProvider = ({ children }) => {
  const [selectedKit, setSelectedKit] = useState(null);
  const [selectedPerfumes, setSelectedPerfumes] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [fullBottleCart, setFullBottleCart] = useState([]);

  const KIT_PRICES = {
    '3ml': 24.99,
    '5ml': 39.99
  };

  useEffect(() => {
    const saved = localStorage.getItem('noraya_decants');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSelectedKit(data.selectedKit);
        setSelectedPerfumes(data.selectedPerfumes || []);
      } catch (e) {}
    }
    const savedBottles = localStorage.getItem('noraya_bottles');
    if (savedBottles) {
      try {
        setFullBottleCart(JSON.parse(savedBottles));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('noraya_decants', JSON.stringify({
      selectedKit,
      selectedPerfumes
    }));
  }, [selectedKit, selectedPerfumes]);

  useEffect(() => {
    localStorage.setItem('noraya_bottles', JSON.stringify(fullBottleCart));
  }, [fullBottleCart]);

  const selectKit = (kit) => {
    if (selectedPerfumes.length > 0) {
      toast.warning('Limpe sua seleção antes de trocar o kit');
      return false;
    }
    setSelectedKit(kit);
    toast.success(`Kit ${kit} selecionado! Escolha até 10 perfumes.`);
    return true;
  };

  const addPerfume = (product) => {
    if (!selectedKit) {
      toast.error('Primeiro selecione um kit (3ml ou 5ml) no carrinho');
      return false;
    }
    if (selectedPerfumes.length >= 10) {
      toast.error('Limite de 10 perfumes atingido!');
      return false;
    }
    if (selectedPerfumes.find(p => p.id === product.id)) {
      toast.info(`${product.name} já está na sua seleção`);
      return false;
    }
    setSelectedPerfumes([...selectedPerfumes, { 
      id: product.id, 
      name: product.name, 
      image: product.image,
      price: product.price
    }]);
    toast.success(`${product.name} adicionado! (${selectedPerfumes.length + 1}/10)`);
    return true;
  };

  const removePerfume = (id) => {
    setSelectedPerfumes(selectedPerfumes.filter(p => p.id !== id));
    toast.info('Perfume removido da seleção');
  };

  const clearSelection = () => {
    setSelectedPerfumes([]);
    toast.info('Seleção limpa');
  };

  const resetKit = () => {
    setSelectedKit(null);
    setSelectedPerfumes([]);
    toast.info('Kit resetado. Escolha um novo kit.');
  };

  const addFullBottle = (product) => {
    setFullBottleCart([...fullBottleCart, { ...product, quantity: 1 }]);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const removeFullBottle = (id) => {
    setFullBottleCart(fullBottleCart.filter(p => p.id !== id));
    toast.info('Item removido do carrinho');
  };

  const getTotalFullBottles = () => {
    return fullBottleCart.reduce((total, item) => total + (item.priceValue || 0), 0).toFixed(2);
  };

  const getKitTotalPrice = () => {
    if (!selectedKit) return 0;
    return selectedPerfumes.length === 10 ? KIT_PRICES[selectedKit] : 0;
  };

  const isKitComplete = () => {
    return selectedKit && selectedPerfumes.length === 10;
  };

  const getRemainingSlots = () => {
    return 10 - selectedPerfumes.length;
  };

  return (
    <CartContext.Provider value={{
      selectedKit,
      selectedPerfumes,
      cartOpen,
      setCartOpen,
      selectKit,
      addPerfume,
      removePerfume,
      clearSelection,
      resetKit,
      getKitTotalPrice,
      isKitComplete,
      getRemainingSlots,
      kitPrice: selectedKit ? KIT_PRICES[selectedKit] : 0,
      KIT_PRICES,
      fullBottleCart,
      addFullBottle,
      removeFullBottle,
      getTotalFullBottles
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Componente do Carrinho
const CartDrawer = () => {
  const { 
    selectedKit, 
    selectedPerfumes, 
    cartOpen, 
    setCartOpen, 
    removePerfume, 
    clearSelection, 
    resetKit,
    getKitTotalPrice, 
    isKitComplete,
    getRemainingSlots,
    kitPrice,
    fullBottleCart,
    removeFullBottle,
    getTotalFullBottles
  } = useCart();

  if (!cartOpen) return null;

  const totalFullBottles = getTotalFullBottles();
  const kitTotal = getKitTotalPrice();
  const grandTotal = (parseFloat(totalFullBottles) + parseFloat(kitTotal)).toFixed(2);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setCartOpen(false)} />
      
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0807] border-l border-[#c9a96a]/30 z-50 shadow-2xl flex flex-col">
        <div className="p-4 border-b border-[#c9a96a]/20 flex justify-between items-center">
          <h2 className="text-xl font-display text-[#e8c98a]">Seu Carrinho</h2>
          <button onClick={() => setCartOpen(false)} className="text-[#c9a96a] hover:text-[#e8c98a]">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Frascos Originais */}
          {fullBottleCart.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[#e8d6a8] text-sm mb-3">Frascos Originais</h3>
              {fullBottleCart.map((item, idx) => (
                <div key={idx} className="bg-[#1a1410] rounded-lg p-3 flex items-center gap-3 mb-2">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-[#0a0807] rounded" />
                  <div className="flex-1">
                    <p className="text-[#e8d6a8] text-sm truncate">{item.name}</p>
                    <p className="text-[#c9a96a] text-xs">{item.price}</p>
                  </div>
                  <button onClick={() => removeFullBottle(item.id)} className="p-1 hover:bg-red-500/20 rounded">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Kit de Decants */}
          <div className="mb-6">
            <h3 className="text-[#e8d6a8] text-sm mb-3">Kit de Decants</h3>
            
            {!selectedKit ? (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => { if (window.kitSelectCallback) window.kitSelectCallback('3ml'); }} className="bg-[#1a1410] border border-[#c9a96a]/30 rounded-lg p-3 text-center hover:border-[#c9a96a]">
                  <img src="/images/decant.png" alt="3ml" className="w-12 h-12 object-contain mx-auto mb-2" />
                  <p className="text-[#e8c98a] font-semibold">Kit 3ml</p>
                  <p className="text-[#c9a96a] text-sm">24,99 €</p>
                </button>
                <button onClick={() => { if (window.kitSelectCallback) window.kitSelectCallback('5ml'); }} className="bg-[#1a1410] border border-[#c9a96a]/30 rounded-lg p-3 text-center hover:border-[#c9a96a]">
                  <img src="/images/decant1.png" alt="5ml" className="w-12 h-12 object-contain mx-auto mb-2" />
                  <p className="text-[#e8c98a] font-semibold">Kit 5ml</p>
                  <p className="text-[#c9a96a] text-sm">39,99 €</p>
                </button>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-[#1a1410] to-[#0a0807] rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img src={selectedKit === '3ml' ? '/images/decant.png' : '/images/decant1.png'} alt="Kit" className="w-12 h-12 object-contain" />
                    <div className="flex-1">
                      <p className="text-[#e8c98a] font-semibold">Kit {selectedKit}</p>
                      <p className="text-[#c9a96a] text-sm">{selectedPerfumes.length}/10 perfumes</p>
                      <div className="w-full bg-[#0a0807] rounded-full h-1.5 mt-1">
                        <div className="bg-[#c9a96a] h-1.5 rounded-full" style={{ width: `${(selectedPerfumes.length / 10) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {selectedPerfumes.map((p, idx) => (
                  <div key={idx} className="bg-[#1a1410] rounded-lg p-2 flex items-center gap-2 mb-2">
                    <img src={p.image} alt={p.name} className="w-8 h-8 object-contain" />
                    <div className="flex-1">
                      <p className="text-[#e8d6a8] text-xs truncate">{p.name}</p>
                    </div>
                    <button onClick={() => removePerfume(p.id)} className="p-1 hover:bg-red-500/20 rounded">
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  </div>
                ))}

                <div className="flex gap-2 mt-3">
                  <button onClick={clearSelection} className="flex-1 py-2 border border-red-500/50 text-red-400 rounded-lg text-sm hover:bg-red-500/10">Limpar</button>
                  <button onClick={resetKit} className="flex-1 py-2 border border-[#c9a96a]/50 text-[#c9a96a] rounded-lg text-sm hover:bg-[#c9a96a]/10">Trocar Kit</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer com Total */}
        <div className="border-t border-[#c9a96a]/20 p-4 space-y-3">
          {fullBottleCart.length > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#e8d6a8]">Frascos Originais:</span>
              <span className="text-[#e8c98a]">{totalFullBottles} €</span>
            </div>
          )}
          {selectedKit && selectedPerfumes.length === 10 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#e8d6a8]">Kit {selectedKit}:</span>
              <span className="text-[#e8c98a]">{kitPrice.toFixed(2)} €</span>
            </div>
          )}
          {(fullBottleCart.length > 0 || (selectedKit && selectedPerfumes.length === 10)) && (
            <>
              <div className="border-t border-[#c9a96a]/20 pt-2 flex justify-between font-bold">
                <span className="text-[#e8d6a8]">Total:</span>
                <span className="text-xl text-[#e8c98a]">{grandTotal} €</span>
              </div>
              <button className="w-full py-3 bg-[#c9a96a] text-black rounded-lg font-semibold hover:bg-[#e8c98a] transition-colors">
                Finalizar Pedido
              </button>
            </>
          )}
          {!selectedKit && fullBottleCart.length === 0 && (
            <p className="text-[#c9a96a]/50 text-center text-sm">Seu carrinho está vazio</p>
          )}
        </div>
      </div>
    </>
  );
};

const KitButton = () => {
  const { setCartOpen, selectedPerfumes, selectedKit } = useCart();
  
  return (
    <button 
      onClick={() => setCartOpen(true)} 
      className="relative flex items-center gap-2 bg-[#c9a96a]/10 hover:bg-[#c9a96a]/20 text-[#e8c98a] px-3 py-1.5 rounded-full transition-all"
    >
      <Package size={18} />
      <span className="text-xs hidden sm:inline">
        {selectedKit ? `${selectedKit} (${selectedPerfumes.length}/10)` : 'Kit Decants'}
      </span>
      {selectedPerfumes.length > 0 && (
        <span className="absolute -top-1 -right-1 text-[10px] bg-[#c9a96a] text-black h-4 w-4 rounded-full flex items-center justify-center font-bold">
          {selectedPerfumes.length}
        </span>
      )}
    </button>
  );
};

const Header = ({ locale, setLocale, content }) => {
  const [open, setOpen] = useState(false);
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
            <a key={item.label} href={item.href} className="text-[11px] tracking-[0.28em] text-[#e8d6a8] hover:text-[#f5deb3] transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <KitButton />
          
          <button onClick={() => setLocale(locale === 'pt-BR' ? 'pt-PT' : 'pt-BR')} className="flex items-center gap-1 text-[#e8d6a8] hover:text-[#f5deb3] text-xs tracking-wide">
            <Globe size={16} />
            {locale === 'pt-BR' ? 'PT-BR' : 'PT-PT'}
          </button>
          
          <button onClick={() => toast.info("Login em breve")} className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.25em] text-[#e8d6a8] hover:text-[#f5deb3]">
            <User size={18} /> Entrar
          </button>
          
          <button className="lg:hidden text-[#e8d6a8]" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0a0807] border-t border-[#c9a96a]/15 px-6 py-6 flex flex-col gap-5">
          {nav.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="text-[12px] tracking-[0.28em] text-[#e8d6a8]">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

const Hero = ({ content }) => {
  if (!content || !content.hero) return null;
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden flex items-center pt-20">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${content.hero.background})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
        <div className="max-w-2xl">
          <p className="text-[#c9a96a] tracking-[0.4em] text-xs mb-8 font-light">{content.hero.kicker}</p>
          <h1 className="font-display text-white text-5xl sm:text-6xl lg:text-8xl leading-[0.95] mb-2">{content.hero.titleLine1}</h1>
          <h1 className="font-display italic text-[#e8c98a] text-5xl sm:text-6xl lg:text-8xl leading-[0.95] mb-10">{content.hero.titleItalic}</h1>
          <p className="text-[#d9cfb8] text-base lg:text-lg max-w-md leading-relaxed mb-12 font-light">{content.hero.description}</p>
          <button onClick={() => document.getElementById("mais-vendidos")?.scrollIntoView({ behavior: "smooth" })} className="group inline-flex items-center justify-center px-14 py-4 border border-[#c9a96a] text-[#e8c98a] tracking-[0.3em] text-xs hover:bg-[#c9a96a] hover:text-black transition-all duration-500">
            {content.hero.cta.toUpperCase()}
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#c9a96a]/60 text-[10px] tracking-[0.4em]">ROLE ↓</div>
    </section>
  );
};

const ProductCard = ({ p, dark = false, index, category }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    navigate(`/produto/${category}/${index}`);
  };
  
  const imageSrc = isHovered && p.hoverImage ? p.hoverImage : p.image;
  
  if (!p) return null;
  
  return (
    <div 
      onClick={handleClick} 
      className="group flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-full aspect-[3/4] flex items-center justify-center overflow-hidden transition-transform duration-500 ${dark ? "bg-[#0a0807]" : "bg-[#f7f3ec]"}`}>
        <img 
          src={imageSrc} 
          alt={p.name || ""} 
          className="max-h-[90%] max-w-[90%] object-contain transition-all duration-500 group-hover:scale-105"
        />
      </div>
      {p.name && (
        <>
          <h3 className={`font-display text-lg lg:text-xl mt-4 mb-1 text-center ${dark ? "text-[#e8d6a8]" : "text-[#1a1410]"}`}>
            {p.name}
          </h3>
          <p className={`text-sm tracking-wider ${dark ? "text-[#c9a96a]/70" : "text-neutral-500"}`}>
            {p.price}
          </p>
        </>
      )}
    </div>
  );
};

const BestSellers = ({ content }) => {
  if (!content || !content.bestSellers) return null;
  return (
    <section id="mais-vendidos" className="bg-[#f7f3ec] py-28 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <p className="text-neutral-500 tracking-[0.4em] text-xs mb-5">{content.bestSellers.kicker}</p>
          <h2 className="font-display text-[#1a1410] text-5xl lg:text-6xl">{content.bestSellers.titleLine1} <span className="italic text-[#7a5a2e]">{content.bestSellers.titleItalic}</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-6 mb-16">
          {content.bestSellers.products && content.bestSellers.products.map((p, i) => (<ProductCard key={i} p={p} />))}
        </div>
        <div className="flex justify-center">
          <button onClick={() => toast.success("Catálogo completo em breve")} className="px-14 py-4 border border-[#1a1410] text-[#1a1410] tracking-[0.3em] text-xs hover:bg-[#1a1410] hover:text-[#e8c98a] transition-all duration-500">
            {content.bestSellers.cta.toUpperCase()}
          </button>
        </div>
      </div>
    </section>
  );
};

const Banner = ({ content }) => {
  if (!content || !content.banner) return null;
  return (
    <section id="novidades" className="bg-[#0a0807] py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="bg-[#0a0807] flex items-center px-8 lg:px-20 py-20 lg:py-0 order-2 lg:order-1">
          <div className="max-w-md">
            <p className="text-[#c9a96a] tracking-[0.4em] text-xs mb-8">{content.banner.kicker}</p>
            <h2 className="font-display text-white text-5xl lg:text-7xl leading-[1] mb-2">{content.banner.titleLine1} <span className="italic text-[#e8c98a]">{content.banner.titleItalic}</span></h2>
            <h2 className="font-display text-white text-5xl lg:text-7xl leading-[1] mb-10">{content.banner.titleLine2}</h2>
            <p className="text-[#d9cfb8] text-base leading-relaxed mb-12 font-light">{content.banner.description}</p>
            <button onClick={() => toast.success("Adicionado à wishlist")} className="bg-[#c9a96a] text-black px-14 py-4 tracking-[0.3em] text-xs hover:bg-[#e8c98a] transition-colors">
              {content.banner.cta.toUpperCase()}
            </button>
          </div>
        </div>
        <div className="relative min-h-[60vh] lg:min-h-[80vh] bg-cover bg-center order-1 lg:order-2" style={{ backgroundImage: `url(${content.banner.image})` }} />
      </div>
    </section>
  );
};

const CategorySection = ({ id, data, dark = false }) => {
  if (!data || !data.products) return null;
  return (
    <section id={id} className={`${dark ? "bg-[#0a0807]" : "bg-white"} py-24 lg:py-32`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className={`tracking-[0.4em] text-xs mb-5 ${dark ? "text-[#c9a96a]" : "text-neutral-500"}`}>
            {data.kicker}
          </p>
          <h2 className={`font-display text-5xl lg:text-6xl mb-4 ${dark ? "text-white" : "text-[#1a1410]"}`}>
            {data.titleLine1}{" "}
            <span className={`italic ${dark ? "text-[#e8c98a]" : "text-[#7a5a2e]"}`}>
              {data.titleItalic}
            </span>
          </h2>
          {data.description && (
            <p className={`max-w-xl mx-auto font-light ${dark ? "text-[#d9cfb8]" : "text-neutral-600"}`}>
              {data.description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-6">
          {data.products.map((p, i) => (<ProductCard key={i} p={p} dark={dark} index={i} category={id} />))}
        </div>
      </div>
    </section>
  );
};

const Trends = ({ content }) => {
  if (!content || !content.trends) return null;
  return (
    <section id="tudo" className="bg-[#f7f3ec] py-28 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <p className="text-neutral-500 tracking-[0.4em] text-xs mb-5">{content.trends.kicker}</p>
          <h2 className="font-display text-[#1a1410] text-5xl lg:text-6xl">{content.trends.titleLine1} <span className="italic text-[#7a5a2e]">{content.trends.titleItalic}</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {content.trends.products && content.trends.products.map((p, i) => (<ProductCard key={i} p={p} />))}
        </div>
      </div>
    </section>
  );
};

const Follow = ({ content }) => {
  if (!content || !content.follow) return null;
  return (
    <section className="bg-[#1a1410] py-24 lg:py-28">
      <div className="text-center mb-14 px-6">
        <h3 className="font-display text-white text-4xl lg:text-5xl mb-3">{content.follow.kicker}<span className="italic text-[#e8c98a]">nos</span></h3>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#c9a96a] tracking-[0.3em] text-sm hover:text-[#e8c98a]">
          <Instagram size={16} /> {content.follow.handle}
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
        {content.follow.gallery && content.follow.gallery.map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
          </div>
        ))}
      </div>
    </section>
  );
};

const Newsletter = ({ content }) => {
  const [email, setEmail] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!email) { toast.error("Informe seu e-mail"); return; }
    toast.success("Inscrição realizada com sucesso!");
    setEmail("");
  };
  if (!content || !content.newsletter) return null;
  return (
    <section className="bg-[#0a0807] py-28 lg:py-36 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="font-display text-white text-5xl lg:text-7xl leading-[1.05] mb-10">{content.newsletter.titleLine1} <span className="italic text-[#e8c98a]">{content.newsletter.titleItalic}</span></h2>
        <p className="text-[#d9cfb8] mb-12 font-light">{content.newsletter.description}</p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={content.newsletter.placeholder} className="flex-1 bg-transparent border border-[#c9a96a]/50 text-white placeholder:text-[#c9a96a]/60 px-5 py-4 focus:outline-none focus:border-[#e8c98a] tracking-wide" />
          <button type="submit" className="bg-[#c9a96a] text-black px-10 py-4 tracking-[0.3em] text-xs hover:bg-[#e8c98a] transition-colors">
            {content.newsletter.cta.toUpperCase()}
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = ({ content }) => {
  if (!content || !content.footer) return null;
  return (
    <footer className="bg-[#050403] text-[#c9a96a]/80 py-20 border-t border-[#c9a96a]/15">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          <div>
            <img src={content.brand.logo} alt="Noraya" className="h-20 w-20 object-contain mb-4" />
            <div className="font-display tracking-[0.25em] text-[#e8c98a] text-xl">{content.brand.name}</div>
            <div className="text-[10px] tracking-[0.3em] text-[#c9a96a]/60 mt-1">{content.brand.tagline}</div>
          </div>
          {content.footer.columns && content.footer.columns.map((c) => (
            <div key={c.title}>
              <h4 className="text-[#e8c98a] tracking-[0.3em] text-xs mb-5">{c.title}</h4>
              <ul className="space-y-3 text-sm font-light">
                {c.links.map((l) => (<li key={l}><a href="#" className="hover:text-[#e8c98a] transition-colors">{l}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-[#c9a96a]/15 text-xs text-[#c9a96a]/50 text-center tracking-wider">{content.footer.copyright}</div>
      </div>
    </section>
  );
};

// Componente de detalhe do produto

// Página inicial (Home)
const HomePage = ({ content, locale, setLocale }) => {
  if (!content) {
    return <div className="min-h-screen bg-[#0a0807] flex items-center justify-center"><p className="text-white">Carregando...</p></div>;
  }
  
  return (
    <>
      <Header locale={locale} setLocale={setLocale} content={content} />
      <Hero content={content} />
      <BestSellers content={content} />
      <Banner content={content} />
      <CategorySection id="femininos" data={content.feminine} dark={false} />
      <CategorySection id="masculinos" data={content.masculine} dark={true} />
      <Trends content={content} />
      <Follow content={content} />
      <Newsletter content={content} />
      <Footer content={content} />
      <CartDrawer />
    </>
  );
};

// Wrapper principal com rotas
function App() {
  const [locale, setLocale] = useState('pt-BR');
  const content = getContent(locale);
  
  return (
    <CartProvider>
      <div className="bg-[#0a0807] min-h-screen">
        <Toaster position="bottom-right" toastOptions={{ style: { background: "#1a1410", color: "#e8c98a", border: "1px solid rgba(201,169,106,0.3)" } }} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage content={content} locale={locale} setLocale={setLocale} />} />
            <Route path="/produto/:category/:id" element={<ProductDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
const ProductDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [isAddedToKit, setIsAddedToKit] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('buy');
  const [locale, setLocale] = useState('pt-BR');
  const content = getContent(locale);
  
  // Pegar todas as funções e variáveis do contexto
  const { 
    addPerfume, 
    selectedPerfumes, 
    getRemainingSlots, 
    addFullBottle, 
    selectKit, 
    setCartOpen,
    selectedKit
  } = useCart();

  const remainingSlots = getRemainingSlots ? getRemainingSlots() : 10;

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      try {
        const productIndex = parseInt(id);
        let productsList = [];
        let categoryName = '';
        
        if (category === 'femininos') {
          productsList = content.feminine?.products || [];
          categoryName = 'femininos';
        } else if (category === 'masculinos') {
          productsList = content.masculine?.products || [];
          categoryName = 'masculinos';
        } else {
          if (content.masculine?.products[productIndex]) {
            productsList = content.masculine.products;
            categoryName = 'masculinos';
          } else if (content.feminine?.products[productIndex]) {
            productsList = content.feminine.products;
            categoryName = 'femininos';
          }
        }
        
        if (productsList && productsList[productIndex]) {
          const foundProduct = { ...productsList[productIndex] };
          
          let priceValue = 0;
          if (foundProduct.price) {
            priceValue = parseFloat(foundProduct.price.replace('€', '').replace(',', '.').trim());
          }
          
          const enhancedProduct = {
            ...foundProduct,
            id: productIndex,
            priceValue: priceValue,
            images: [foundProduct.image, foundProduct.hoverImage || foundProduct.image],
            category: categoryName
          };
          
          setProduct(enhancedProduct);
          setMainImage(enhancedProduct.images[0]);
          setIsAddedToKit(selectedPerfumes && selectedPerfumes.some(p => p.id === productIndex));
          
          const otherProducts = productsList.filter((_, idx) => idx !== productIndex);
          setRelatedProducts(otherProducts.slice(0, 4).map((p, idx) => ({
            id: idx,
            name: p.name,
            price: p.price,
            image: p.image,
            category: categoryName
          })));
        } else {
          setProduct(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
        toast.error('Erro ao carregar produto');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, category, content, selectedPerfumes]);

  const handleAddToKit = () => {
    if (!product) return;
    
    const productInfo = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price
    };
    
    if (addPerfume && addPerfume(productInfo)) {
      setIsAddedToKit(true);
      toast.success(`${product.name} adicionado ao kit! (${selectedPerfumes ? selectedPerfumes.length + 1 : 1}/10)`);
    }
  };

  const handleBuyFullBottle = () => {
    if (!product) return;
    if (addFullBottle) {
      addFullBottle({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        priceValue: product.priceValue,
        quantity: quantity
      });
      toast.success(`${product.name} adicionado ao carrinho!`);
    }
  };

  const handleSelectKit = (kit) => {
    if (selectKit) {
      selectKit(kit);
      setCartOpen(true);
      setActiveTab('kit');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a96a] mx-auto"></div>
          <p className="mt-4 text-[#1a1410]">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-[#1a1410]">Produto não encontrado</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-[#c9a96a] text-white rounded-lg hover:bg-[#b8854a] transition-colors"
          >
            Voltar para loja
          </button>
        </div>
      </div>
    );
  }

  const galleryImages = [
    { src: product.images[0], label: 'Frasco', type: 'bottle' },
    ...(product.images[1] && product.images[1] !== product.images[0] ? [{ src: product.images[1], label: 'Frasco', type: 'bottle' }] : []),
    { src: '/images/decant.png', label: 'Decant 3ml', type: 'decant3' },
    { src: '/images/decant1.png', label: 'Decant 5ml', type: 'decant5' }
  ];

  return (
    <div className="bg-[#f7f3ec] min-h-screen pb-16 pt-24">
      <div className="bg-white border-b border-[#c9a96a]/15 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-[#1a1410]/60">
            <Link to="/" className="hover:text-[#c9a96a] flex items-center gap-1">
              Home
            </Link>
            <span>/</span>
            <Link to={`/#${product.category === 'femininos' ? 'femininos' : 'masculinos'}`} className="hover:text-[#c9a96a]">
              {product.category === 'femininos' ? 'Para Ela' : 'Para Ele'}
            </Link>
            <span>/</span>
            <span className="text-[#c9a96a] truncate max-w-md">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Galeria */}
            <div>
              <div className="space-y-4">
                <div className="aspect-square bg-[#f7f3ec] rounded-xl overflow-hidden relative">
                  {product.brandLogo && (
                    <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-md">
                      <img src={product.brandLogo} alt="Lattafa" className="h-8 w-auto object-contain" />
                    </div>
                  )}
                  <img src={mainImage} alt={product.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="flex gap-3 flex-wrap">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMainImage(img.src)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        mainImage === img.src ? 'border-[#c9a96a] shadow-md' : 'border-gray-200 hover:border-[#c9a96a]/50'
                      }`}
                    >
                      <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                      {img.type !== 'bottle' && (
                        <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] text-center py-0.5">
                          {img.type === 'decant3' ? '3ml' : '5ml'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Informações */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-[#c9a96a] font-semibold mb-1">{product.brand || (product.name.includes('Lattafa') ? 'LATTAFA' : 'NORAYA')}</p>
                <h1 className="text-2xl lg:text-3xl font-display font-bold text-[#1a1410] mb-2">{product.name}</h1>
                <p className="text-sm text-[#1a1410]/50">SKU: {product.sku || 'NOR-001'}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < (product.rating || 4) ? 'fill-[#c9a96a] text-[#c9a96a]' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-[#1a1410]/60">({product.reviews || 0} avaliações)</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 border-b border-[#c9a96a]/20">
                <button
                  onClick={() => setActiveTab('buy')}
                  className={`pb-2 px-4 text-sm font-medium transition-colors ${
                    activeTab === 'buy' 
                      ? 'text-[#c9a96a] border-b-2 border-[#c9a96a]' 
                      : 'text-[#1a1410]/50 hover:text-[#c9a96a]'
                  }`}
                >
                  🛒 Comprar Frasco
                </button>
                <button
                  onClick={() => setActiveTab('kit')}
                  className={`pb-2 px-4 text-sm font-medium transition-colors ${
                    activeTab === 'kit' 
                      ? 'text-[#c9a96a] border-b-2 border-[#c9a96a]' 
                      : 'text-[#1a1410]/50 hover:text-[#c9a96a]'
                  }`}
                >
                  📦 Montar Kit Decants
                </button>
              </div>

              {/* Tab Comprar */}
              {activeTab === 'buy' && (
                <div className="space-y-4">
                  <div className="bg-[#f7f3ec] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-3xl font-bold text-[#1a1410]">{product.price}</span>
                        <p className="text-sm text-[#1a1410]/50 mt-1">IVA incluído</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#1a1410] text-sm">Qtd:</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"><Minus size={14} /></button>
                          <span className="w-8 text-center font-medium">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                    <button onClick={handleBuyFullBottle} className="w-full py-3 bg-[#c9a96a] text-black rounded-lg font-semibold hover:bg-[#e8c98a] transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart size={18} /> Comprar Agora
                    </button>
                  </div>
                  <div className="bg-[#f7f3ec] rounded-lg p-3 border border-[#c9a96a]/20">
                    <p className="text-[#c9a96a] text-sm">💰 Compre este produto e ganhe {Math.floor(product.priceValue)} Pontos!</p>
                  </div>
                </div>
              )}

              {/* Tab Kit */}
              {activeTab === 'kit' && (
                <div className="space-y-4">
                  {!selectedKit && (
                    <div className="bg-[#1a1410] rounded-lg p-4 text-center">
                      <Package size={40} className="text-[#c9a96a] mx-auto mb-3" />
                      <p className="text-[#e8c98a] font-semibold mb-2">Escolha seu Kit</p>
                      <p className="text-[#c9a96a]/70 text-sm mb-4">Selecione o tamanho dos decants</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleSelectKit('3ml')} className="bg-[#0a0807] border border-[#c9a96a]/30 rounded-lg p-3 hover:border-[#c9a96a] transition-all">
                          <img src="/images/decant.png" alt="3ml" className="w-16 h-16 object-contain mx-auto mb-2" />
                          <p className="text-[#e8c98a] font-bold">Kit 3ml</p>
                          <p className="text-[#c9a96a] text-sm">24,99 €</p>
                          <p className="text-[#c9a96a]/60 text-xs mt-1">10 decants</p>
                        </button>
                        <button onClick={() => handleSelectKit('5ml')} className="bg-[#0a0807] border border-[#c9a96a]/30 rounded-lg p-3 hover:border-[#c9a96a] transition-all">
                          <img src="/images/decant1.png" alt="5ml" className="w-16 h-16 object-contain mx-auto mb-2" />
                          <p className="text-[#e8c98a] font-bold">Kit 5ml</p>
                          <p className="text-[#c9a96a] text-sm">39,99 €</p>
                          <p className="text-[#c9a96a]/60 text-xs mt-1">10 decants</p>
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedKit && (
                    <div className="bg-gradient-to-r from-[#1a1410] to-[#0a0807] rounded-lg p-4">
                      <div className="flex items-center gap-4 mb-3">
                        <img src={selectedKit === '3ml' ? '/images/decant.png' : '/images/decant1.png'} alt="Kit" className="w-16 h-16 object-contain bg-[#0a0807] rounded-full p-2 border border-[#c9a96a]/30" />
                        <div className="flex-1">
                          <p className="text-[#e8c98a] font-semibold">Kit {selectedKit}</p>
                          <p className="text-[#c9a96a] text-sm">{selectedPerfumes ? selectedPerfumes.length : 0}/10 perfumes selecionados</p>
                          <div className="w-full bg-[#0a0807] rounded-full h-2 mt-2">
                            <div className="bg-[#c9a96a] h-2 rounded-full transition-all duration-300" style={{ width: `${((selectedPerfumes ? selectedPerfumes.length : 0) / 10) * 100}%` }} />
                          </div>
                          <p className="text-[#c9a96a]/60 text-xs mt-1">Faltam {remainingSlots} perfume(s)</p>
                        </div>
                      </div>
                      <button onClick={handleAddToKit} disabled={isAddedToKit || remainingSlots === 0} className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${isAddedToKit || remainingSlots === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#c9a96a] text-black hover:bg-[#e8c98a]'}`}>
                        <Package size={18} />
                        {isAddedToKit ? '✓ Já está no seu kit!' : remainingSlots === 0 ? 'Kit completo! Finalize no carrinho' : `Adicionar ao Kit (${(selectedPerfumes ? selectedPerfumes.length : 0) + 1}/10)`}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Benefícios */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#1a1410]/60"><Truck className="w-5 h-5 text-[#c9a96a]" /><span>Frete grátis para compras acima de 50€</span></div>
                <div className="flex items-center gap-3 text-sm text-[#1a1410]/60"><Shield className="w-5 h-5 text-[#c9a96a]" /><span>Produto original com garantia</span></div>
                <div className="flex items-center gap-3 text-sm text-[#1a1410]/60"><RefreshCw className="w-5 h-5 text-[#c9a96a]" /><span>Devolução gratuita em até 30 dias</span></div>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="border-t border-gray-200 p-6 lg:p-8">
            <h2 className="text-xl font-display font-bold text-[#1a1410] mb-4">Descrição</h2>
            <div className="text-[#1a1410]/80 leading-relaxed mb-6 whitespace-pre-line">{product.fullDescription || product.description}</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div><h3 className="font-semibold text-[#1a1410] mb-2">Tipo de fragrância</h3><p className="text-[#1a1410]/70">{product.fragranceType || "Olfativa Complexa"}</p></div>
              <div><h3 className="font-semibold text-[#1a1410] mb-2">Indicado para</h3><p className="text-[#1a1410]/70">{product.bestFor || "Uso diário e ocasiões especiais"}</p></div>
              <div><h3 className="font-semibold text-[#1a1410] mb-2">Lançamento</h3><p className="text-[#1a1410]/70">{product.launchYear || "2024"}</p></div>
              <div><h3 className="font-semibold text-[#1a1410] mb-2">Inspiração</h3><p className="text-[#1a1410]/70">{product.inspiration || "Fragrância original"}</p></div>
            </div>

            {product.notes && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-[#1a1410]">Pirâmide Olfativa</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-orange-50 rounded-lg p-4"><h4 className="font-semibold text-orange-800 mb-2">Notas de Topo</h4><p className="text-gray-700">{product.notes.topo}</p></div>
                  <div className="bg-amber-50 rounded-lg p-4"><h4 className="font-semibold text-amber-800 mb-2">Notas de Coração</h4><p className="text-gray-700">{product.notes.coracao}</p></div>
                  <div className="bg-stone-50 rounded-lg p-4"><h4 className="font-semibold text-stone-800 mb-2">Notas de Fundo</h4><p className="text-gray-700">{product.notes.base}</p></div>
                </div>
              </div>
            )}
          </div>

          {/* Características */}
          <div className="border-t border-gray-200 p-6 lg:p-8">
            <h2 className="text-xl font-display font-bold text-[#1a1410] mb-4">Características</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-[#1a1410]/50">MARCA</p><p className="font-medium text-[#1a1410]">{product.brand || (product.name.includes('Lattafa') ? 'LATTAFA' : 'NORAYA')}</p></div>
              <div><p className="text-sm text-[#1a1410]/50">SKU</p><p className="font-medium text-[#1a1410]">{product.sku || 'NOR-001'}</p></div>
              <div><p className="text-sm text-[#1a1410]/50">EAN</p><p className="font-medium text-[#1a1410]">{product.ean || '6291108735411'}</p></div>
              <div><p className="text-sm text-[#1a1410]/50">CATEGORIA</p><p className="font-medium text-[#1a1410]">{product.category === 'femininos' ? 'Para Ela' : 'Para Ele'}</p></div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-display font-bold text-[#1a1410] mb-6">Também poderá gostar de</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related, idx) => (
                <Link key={idx} to={`/produto/${related.category}/${idx}`} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="aspect-square bg-[#f7f3ec]"><img src={related.image} alt={related.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" /></div>
                  <div className="p-4"><h3 className="font-semibold text-[#1a1410] mb-1 line-clamp-2 text-sm">{related.name}</h3><p className="text-[#c9a96a] text-sm font-medium">{related.price}</p></div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

