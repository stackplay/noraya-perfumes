import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, User as UserIcon } from 'lucide-react';
import { addReview, getProductReviews, getProductRating, markHelpful, auth } from '../services/firebase';
import { toast } from 'sonner';

const Reviews = ({ productId, productName }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadReviews();
    loadRating();
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    
    return () => unsubscribe();
  }, [productId]);

  const loadReviews = async () => {
    setLoading(true);
    const result = await getProductReviews(productId);
    if (result.success) {
      setReviews(result.reviews);
    }
    setLoading(false);
  };

  const loadRating = async () => {
    const result = await getProductRating(productId);
    if (result.success) {
      setAverageRating(result.average);
      setTotalReviews(result.total);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Faça login para avaliar este produto');
      return;
    }
    
    if (rating === 0) {
      toast.error('Selecione uma avaliação por estrelas');
      return;
    }
    
    if (!comment.trim()) {
      toast.error('Escreva um comentário');
      return;
    }
    
    const result = await addReview(
      productId, 
      user.uid, 
      user.displayName || user.email, 
      user.photoURL, 
      rating, 
      comment
    );
    
    if (result.success) {
      toast.success('Avaliação publicada!');
      setRating(0);
      setComment('');
      loadReviews();
      loadRating();
    } else {
      toast.error('Erro ao publicar avaliação');
    }
  };

  const handleHelpful = async (reviewId) => {
    if (!user) {
      toast.error('Faça login para marcar como útil');
      return;
    }
    const result = await markHelpful(reviewId);
    if (result.success) {
      loadReviews();
    }
  };

  const renderStars = (value, interactive = false, onStarClick, onStarHover) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={interactive ? 24 : 16}
          className={`cursor-pointer transition-colors ${
            i <= (interactive ? (hoverRating || rating) : value)
              ? 'fill-[#c9a96a] text-[#c9a96a]'
              : 'text-gray-400'
          }`}
          onClick={() => interactive && onStarClick(i)}
          onMouseEnter={() => interactive && onStarHover(i)}
          onMouseLeave={() => interactive && onStarHover(0)}
        />
      );
    }
    return stars;
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h3 className="text-xl font-display font-bold text-[#1a1410] mb-4">
        Avaliações ({totalReviews})
      </h3>
      
      {totalReviews > 0 && (
        <div className="flex items-center gap-4 mb-6 p-4 bg-[#f7f3ec] rounded-lg">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#1a1410]">{averageRating}</div>
            <div className="flex gap-1 mt-1">{renderStars(averageRating)}</div>
            <div className="text-sm text-[#1a1410]/60 mt-1">{totalReviews} avaliação(ões)</div>
          </div>
        </div>
      )}
      
      {user ? (
        <form onSubmit={handleSubmitReview} className="mb-8 p-4 bg-[#f7f3ec] rounded-lg">
          <h4 className="font-semibold text-[#1a1410] mb-3">Avalie este produto</h4>
          <div className="flex gap-1 mb-3">
            {renderStars(rating, true, setRating, setHoverRating)}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva sua experiência com este perfume..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#c9a96a] mb-3"
            rows="3"
          />
          <button
            type="submit"
            className="bg-[#c9a96a] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#e8c98a] transition-colors"
          >
            Publicar Avaliação
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-[#f7f3ec] rounded-lg text-center">
          <p className="text-[#1a1410]/70">Faça login para avaliar este produto</p>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c9a96a] mx-auto"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 text-[#1a1410]/50">
          Seja o primeiro a avaliar este produto!
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3 mb-2">
                {review.userPhoto ? (
                  <img src={review.userPhoto} alt="" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#c9a96a]/20 flex items-center justify-center">
                    <UserIcon size={20} className="text-[#c9a96a]" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-[#1a1410]">{review.userName}</p>
                  <div className="flex gap-1">{renderStars(review.rating)}</div>
                </div>
              </div>
              <p className="text-[#1a1410]/80 ml-13">{review.comment}</p>
              <div className="flex items-center gap-4 mt-2 ml-13">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-1 text-xs text-[#1a1410]/50 hover:text-[#c9a96a] transition-colors"
                >
                  <ThumbsUp size={14} />
                  Útil ({review.helpful || 0})
                </button>
                <span className="text-xs text-[#1a1410]/40">
                  {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
