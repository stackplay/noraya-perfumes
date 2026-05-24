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
