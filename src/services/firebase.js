import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc,
  orderBy,
  deleteDoc
} from "firebase/firestore";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCglep5EMtpkzjbyV85EfXAV8nn4lrJhw0",
  authDomain: "noraya-perfumes.firebaseapp.com",
  databaseURL: "https://noraya-perfumes-default-rtdb.firebaseio.com",
  projectId: "noraya-perfumes",
  storageBucket: "noraya-perfumes.firebasestorage.app",
  messagingSenderId: "138923457581",
  appId: "1:138923457581:web:5e8dd381ef2904ff9d8ca4",
  measurementId: "G-XD7QP61LYB"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Autenticação
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};

export { auth, db };

// =============================================
// AVALIAÇÕES
// =============================================

export const addReview = async (productId, userId, userName, userPhoto, rating, comment, productName, productImage, category) => {
  try {
    const reviewData = {
      productId: String(productId),
      userId,
      userName,
      userPhoto: userPhoto || null,
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString(),
      helpful: 0,
      productName: productName || "",
      productImage: productImage || "",
      category: category || ""
    };
    const docRef = await addDoc(collection(db, "reviews"), reviewData);
    return { success: true, id: docRef.id, data: reviewData };
  } catch (error) {
    console.error("Erro ao adicionar avaliação:", error);
    return { success: false, error: error.message };
  }
};

export const getProductReviews = async (productId) => {
  try {
    const q = query(
      collection(db, "reviews"),
      where("productId", "==", String(productId)),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, reviews };
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return { success: false, reviews: [], error: error.message };
  }
};

export const getProductRating = async (productId) => {
  try {
    const q = query(collection(db, "reviews"), where("productId", "==", String(productId)));
    const querySnapshot = await getDocs(q);
    let total = 0;
    let count = 0;
    querySnapshot.forEach((doc) => {
      total += doc.data().rating;
      count++;
    });
    const average = count > 0 ? (total / count).toFixed(1) : 0;
    return { success: true, average: Number(average), total: count };
  } catch (error) {
    console.error("Erro ao calcular média:", error);
    return { success: false, average: 0, total: 0 };
  }
};

export const markHelpful = async (reviewId) => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    const q = query(collection(db, "reviews"), where("__name__", "==", reviewId));
    const querySnapshot = await getDocs(q);
    let currentHelpful = 0;
    querySnapshot.forEach((doc) => {
      currentHelpful = doc.data().helpful || 0;
    });
    await updateDoc(reviewRef, { helpful: currentHelpful + 1 });
    return { success: true };
  } catch (error) {
    console.error("Erro ao marcar como útil:", error);
    return { success: false, error: error.message };
  }
};

export const deleteReview = async (reviewId, userId) => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    await deleteDoc(reviewRef);
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar avaliação:", error);
    return { success: false, error: error.message };
  }
};

// =============================================
// FAVORITOS
// =============================================

export const addToFavorites = async (userId, productId, productName, productImage, productPrice, category) => {
  try {
    const favoriteData = {
      userId,
      productId: String(productId),
      productName,
      productImage,
      productPrice: productPrice || 0,
      category: category || "",
      addedAt: new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, "favorites"), favoriteData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Erro ao adicionar aos favoritos:", error);
    return { success: false, error: error.message };
  }
};

export const removeFromFavorites = async (userId, productId) => {
  try {
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", userId),
      where("productId", "==", String(productId))
    );
    const querySnapshot = await getDocs(q);
    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
    }
    return { success: true };
  } catch (error) {
    console.error("Erro ao remover dos favoritos:", error);
    return { success: false, error: error.message };
  }
};

export const getFavorites = async (userId) => {
  try {
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const favorites = [];
    querySnapshot.forEach((doc) => {
      favorites.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, favorites };
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return { success: false, favorites: [] };
  }
};

export const checkIsFavorite = async (userId, productId) => {
  try {
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", userId),
      where("productId", "==", String(productId))
    );
    const querySnapshot = await getDocs(q);
    return { success: true, isFavorite: !querySnapshot.empty };
  } catch (error) {
    console.error("Erro ao verificar favorito:", error);
    return { success: false, isFavorite: false };
  }
};

// =============================================
// CARRINHO
// =============================================

export const addToCart = async (userId, productId, productName, productImage, price, size, quantity) => {
  try {
    console.log("=== addToCart - firebase.js ===");
    console.log("userId:", userId);
    console.log("productId:", productId);
    console.log("size:", size);
    
    // Verificar se o produto já está no carrinho
    const q = query(
      collection(db, "cart"),
      where("userId", "==", userId),
      where("productId", "==", String(productId)),
      where("size", "==", size)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Atualizar quantidade
      const cartItem = querySnapshot.docs[0];
      const cartRef = doc(db, "cart", cartItem.id);
      const newQuantity = cartItem.data().quantity + quantity;
      await updateDoc(cartRef, { quantity: newQuantity });
      console.log("✅ Quantidade atualizada para:", newQuantity);
      return { success: true, message: "Quantidade atualizada" };
    } else {
      // Adicionar novo item
      const cartData = {
        userId,
        productId: String(productId),
        productName,
        productImage: productImage || "",
        price: Number(price),
        size,
        quantity: Number(quantity),
        addedAt: new Date().toISOString()
      };
      console.log("Adicionando novo item:", cartData);
      const docRef = await addDoc(collection(db, "cart"), cartData);
      console.log("✅ Item adicionado com ID:", docRef.id);
      return { success: true, id: docRef.id };
    }
  } catch (error) {
    console.error("❌ Erro ao adicionar ao carrinho:", error);
    console.error("Código do erro:", error.code);
    console.error("Mensagem:", error.message);
    return { success: false, error: error.message };
  }
};

export const getCart = async (userId) => {
  try {
    console.log("=== getCart - firebase.js ===");
    console.log("userId:", userId);
    
    const q = query(
      collection(db, "cart"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const cart = [];
    querySnapshot.forEach((doc) => {
      cart.push({ id: doc.id, ...doc.data() });
    });
    console.log(`✅ Encontrados ${cart.length} itens no carrinho`);
    return { success: true, cart };
  } catch (error) {
    console.error("❌ Erro ao buscar carrinho:", error);
    return { success: false, cart: [] };
  }
};

export const updateCartQuantity = async (cartId, quantity) => {
  try {
    const cartRef = doc(db, "cart", cartId);
    await updateDoc(cartRef, { quantity: Number(quantity) });
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar quantidade:", error);
    return { success: false, error: error.message };
  }
};

export const removeFromCart = async (cartId) => {
  try {
    console.log("=== removeFromCart - firebase.js ===");
    console.log("cartId:", cartId);
    
    const cartRef = doc(db, "cart", cartId);
    await deleteDoc(cartRef);
    console.log("✅ Item removido do carrinho");
    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao remover do carrinho:", error);
    return { success: false, error: error.message };
  }
};

export const clearCart = async (userId) => {
  try {
    const q = query(collection(db, "cart"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
    }
    return { success: true };
  } catch (error) {
    console.error("Erro ao limpar carrinho:", error);
    return { success: false, error: error.message };
  }
};

export const isFavorite = async (userId, productId) => {
  try {
    const q = query(
      collection(db, "favorites"), 
      where("userId", "==", userId), 
      where("productId", "==", String(productId))
    );
    const querySnapshot = await getDocs(q);
    return { success: true, isFavorite: !querySnapshot.empty };
  } catch (error) {
    console.error("Erro ao verificar favorito:", error);
    return { success: false, isFavorite: false };
  }
};
