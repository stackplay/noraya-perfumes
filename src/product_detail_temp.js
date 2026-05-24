const ProductDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [locale, setLocale] = useState('pt-BR');
  const content = getContent(locale);
  const { addPerfume, selectedPerfumes, getRemainingSlots } = useCart();

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
