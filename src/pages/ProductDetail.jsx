import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, Minus, Plus, Check, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { masculine } from '../data/content';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      try {
        const productIndex = parseInt(id);
        const productsList = masculine.products;
        
        if (productsList[productIndex]) {
          const foundProduct = { ...productsList[productIndex] };
          
          const enhancedProduct = {
            ...foundProduct,
            id: productIndex,
            brand: foundProduct.name.includes('Lattafa') ? 'LATTAFA' : 
                   foundProduct.name.includes('French Avenue') ? 'FRENCH AVENUE' : 
                   foundProduct.name.includes('Armaf') ? 'ARMAF' : 'NORAYA',
            sizes: [{ size: foundProduct.sizes?.[0]?.size || "100ml", price: parseFloat(foundProduct.price.replace('€', '').replace(',', '.')) }],
            images: [foundProduct.image, foundProduct.hoverImage || foundProduct.image],
            inStock: true,
            category: "Para ele"
          };
          
          setProduct(enhancedProduct);
          setMainImage(enhancedProduct.images[0]);
          if (enhancedProduct.sizes[0]) {
            setSelectedSize(enhancedProduct.sizes[0].size);
          }
          
          const otherProducts = productsList.filter((_, idx) => idx !== productIndex);
          setRelatedProducts(otherProducts.slice(0, 4).map((p, idx) => ({
            id: idx,
            name: p.name,
            price: parseFloat(p.price.replace('€', '').replace(',', '.')),
            rating: p.rating || Math.floor(Math.random() * 5) + 1,
            image: p.image,
            discount: idx === 0 ? 10 : 0,
            isNew: idx === 2
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
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    toast.success(`${product?.name} adicionado ao carrinho!`, {
      icon: <Check className="w-5 h-5 text-green-500" />,
      duration: 3000,
    });
  };

  const handleToggleWishlist = () => {
    setIsWishlist(!isWishlist);
    toast.success(isWishlist ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copiado para a área de transferência!');
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

  const currentPrice = product.sizes.find(s => s.size === selectedSize)?.price || product.sizes[0]?.price || parseFloat(product.price.replace('€', '').replace(',', '.'));

  return (
    <div className="bg-[#f7f3ec] min-h-screen pb-16 pt-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#c9a96a]/15 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-[#1a1410]/60">
            <Link to="/" className="hover:text-[#c9a96a] flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Home
            </Link>
            <span>/</span>
            <Link to="/#masculinos" className="hover:text-[#c9a96a]">Para ele</Link>
            <span>/</span>
            <span className="text-[#c9a96a] truncate max-w-md">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            
            {/* Galeria de imagens */}
            <div>
              <div className="space-y-4">
                <div className="aspect-square bg-[#f7f3ec] rounded-xl overflow-hidden relative">
                  {product.brandLogo && (
                    <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-md">
                      <img src={product.brandLogo} alt="Lattafa" className="h-8 w-auto object-contain" />
                    </div>
                  )}
                  <img 
                    src={mainImage} 
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {product.images.length > 1 && (
                  <div className="flex gap-3">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMainImage(img)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          mainImage === img ? 'border-[#c9a96a] shadow-md' : 'border-gray-200 hover:border-[#c9a96a]/50'
                        }`}
                      >
                        <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Informações do produto */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-[#c9a96a] font-semibold mb-1">{product.brand}</p>
                <h1 className="text-2xl lg:text-3xl font-display font-bold text-[#1a1410] mb-2">{product.name}</h1>
                <p className="text-sm text-[#1a1410]/50">SKU: {product.sku || 'NOR-001'}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < (product.rating || 4) 
                          ? 'fill-[#c9a96a] text-[#c9a96a]' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[#1a1410]/60">({product.reviews || 0} avaliações)</span>
              </div>

              <div>
                <span className="text-3xl font-bold text-[#1a1410]">
                  {currentPrice.toFixed(2)} €
                </span>
                <p className="text-sm text-[#1a1410]/50 mt-1">IVA incluído.</p>
              </div>

              <div className="bg-[#f7f3ec] rounded-lg p-3 border border-[#c9a96a]/20">
                <p className="text-[#c9a96a] text-sm">
                  💰 Compre este produto e ganhe {Math.floor(currentPrice)} Pontos!
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1a1410] mb-3">TAMANHO</label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size.size)}
                      className={`px-6 py-2 rounded-lg border-2 transition-all ${
                        selectedSize === size.size
                          ? 'border-[#c9a96a] bg-[#f7f3ec] text-[#c9a96a] font-semibold'
                          : 'border-gray-300 hover:border-[#c9a96a]/50 text-[#1a1410]'
                      }`}
                    >
                      {size.size} - {size.price.toFixed(2)} €
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1a1410] mb-3">QUANTIDADE</label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange('decrease')}
                        className="px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange('increase')}
                        className="px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#c9a96a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b8854a] transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      COMPRAR
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleToggleWishlist}
                    className={`flex-1 py-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                      isWishlist
                        ? 'border-red-400 bg-red-50 text-red-500'
                        : 'border-gray-300 hover:border-[#c9a96a]/50 text-[#1a1410]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlist ? 'fill-red-500' : ''}`} />
                    {isWishlist ? 'Nos favoritos' : 'Adicionar aos favoritos'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-[#c9a96a]/50 transition-colors text-[#1a1410]"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="border-t pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#1a1410]/60">
                  <Truck className="w-5 h-5 text-[#c9a96a]" />
                  <span>Frete grátis para compras acima de 50€</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#1a1410]/60">
                  <Shield className="w-5 h-5 text-[#c9a96a]" />
                  <span>Produto original com garantia</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#1a1410]/60">
                  <RefreshCw className="w-5 h-5 text-[#c9a96a]" />
                  <span>Devolução gratuita em até 30 dias</span>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição detalhada */}
          <div className="border-t border-gray-200 p-6 lg:p-8">
            <h2 className="text-xl font-display font-bold text-[#1a1410] mb-4">Descrição</h2>
            <div className="text-[#1a1410]/80 leading-relaxed mb-6 whitespace-pre-line">
              {product.fullDescription || product.description}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-[#1a1410] mb-2">Tipo de fragrância</h3>
                <p className="text-[#1a1410]/70">{product.fragranceType || "Olfativa Complexa"}</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1a1410] mb-2">Indicado para</h3>
                <p className="text-[#1a1410]/70">{product.bestFor || "Uso diário e ocasiões especiais"}</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1a1410] mb-2">Lançamento</h3>
                <p className="text-[#1a1410]/70">{product.launchYear || "2024"}</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1a1410] mb-2">Inspiração</h3>
                <p className="text-[#1a1410]/70">{product.inspiration || "Fragrância original"}</p>
              </div>
            </div>

            {/* Pirâmide olfativa */}
            {product.notes && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-[#1a1410]">Pirâmide Olfativa</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">Notas de Topo</h4>
                    <p className="text-gray-700">{product.notes.topo}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">Notas de Coração</h4>
                    <p className="text-gray-700">{product.notes.coracao}</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-4">
                    <h4 className="font-semibold text-stone-800 mb-2">Notas de Fundo</h4>
                    <p className="text-gray-700">{product.notes.base}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Características */}
          <div className="border-t border-gray-200 p-6 lg:p-8">
            <h2 className="text-xl font-display font-bold text-[#1a1410] mb-4">Características</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#1a1410]/50">MARCA</p>
                <p className="font-medium text-[#1a1410]">{product.brand}</p>
              </div>
              <div>
                <p className="text-sm text-[#1a1410]/50">SKU</p>
                <p className="font-medium text-[#1a1410]">{product.sku || 'NOR-001'}</p>
              </div>
              <div>
                <p className="text-sm text-[#1a1410]/50">EAN</p>
                <p className="font-medium text-[#1a1410]">{product.ean || '6291108735411'}</p>
              </div>
              <div>
                <p className="text-sm text-[#1a1410]/50">CATEGORIA</p>
                <p className="font-medium text-[#1a1410]">{product.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-display font-bold text-[#1a1410] mb-6">Também poderá gostar de</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related, idx) => (
                <Link 
                  key={idx} 
                  to={`/produto/${related.id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="relative">
                    {related.discount > 0 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                        -{related.discount}%
                      </span>
                    )}
                    {related.isNew && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                        Novidade
                      </span>
                    )}
                    <div className="aspect-square bg-[#f7f3ec]">
                      <img 
                        src={related.image} 
                        alt={related.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1a1410] mb-1 line-clamp-2 text-sm">{related.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      {related.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#c9a96a] text-[#c9a96a]" />
                          <span className="text-sm text-[#1a1410]/60">{related.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      {related.discount ? (
                        <div>
                          <span className="text-lg font-bold text-[#1a1410]">
                            {(related.price * (1 - related.discount / 100)).toFixed(2)} €
                          </span>
                          <span className="text-sm text-[#1a1410]/40 line-through ml-2">
                            {related.price.toFixed(2)} €
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-[#1a1410]">
                          {related.price.toFixed(2)} €
                        </span>
                      )}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          toast.success(`${related.name} adicionado ao carrinho`);
                        }}
                        className="p-2 bg-[#f7f3ec] rounded-full text-[#c9a96a] hover:bg-[#c9a96a] hover:text-white transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
