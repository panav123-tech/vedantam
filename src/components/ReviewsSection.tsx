import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Plus, Check, Filter, Sparkles, X } from 'lucide-react';
import { REVIEWS_LIST, RESTAURANT_INFO } from '../data/restaurantData';
import { UserReview } from '../types/restaurant';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<UserReview[]>(REVIEWS_LIST);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  
  // New review form state
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [selectedDishTag, setSelectedDishTag] = useState('thatte idli');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const filterTags = [
    { id: 'all', label: 'All Reviews', count: RESTAURANT_INFO.reviewCount },
    { id: 'thatte idli', label: 'Thatte Idli', count: 184 },
    { id: 'crispy dosa', label: 'Crispy Dosa', count: 142 },
    { id: 'sambhar', label: 'Sambhar', count: 96 },
    { id: 'filter coffee', label: 'Filter Coffee', count: 88 },
    { id: 'ambiance', label: 'Ambiance', count: 64 },
  ];

  const filteredReviews = reviews.filter((r) => {
    if (selectedTag === 'all') return true;
    return r.tags?.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
  });

  const handleToggleLike = (id: string) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newReviewText.trim()) {
      alert('Please enter your name and a brief review.');
      return;
    }

    const createdReview: UserReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      authorType: 'Verified Diner · Just now',
      rating: newRating,
      relativeTime: 'Just now',
      text: newReviewText.trim(),
      tags: [selectedDishTag],
      likesCount: 1,
    };

    setReviews([createdReview, ...reviews]);
    setIsWriteReviewOpen(false);
    setNewAuthor('');
    setNewReviewText('');
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E7DECD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#9A3412] mb-1">
              Verified Dining Feedback
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#451A03]">
              Guest Experiences & Ratings
            </h2>
          </div>

          <button
            onClick={() => setIsWriteReviewOpen(true)}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl transition-all shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Breakdown & Gemini Summary Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          
          {/* Numeric Google Star Card (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#E7DECD] shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-serif-display text-5xl font-extrabold text-[#451A03] tabular-nums">
                {RESTAURANT_INFO.rating}
              </span>
              <div>
                <div className="flex items-center text-amber-500 mb-1">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-current" />
                  ))}
                  <Star className="w-5 h-5 fill-current text-amber-500/50" />
                </div>
                <p className="text-xs font-bold text-[#78350F]">
                  594 Reviews on Google Maps
                </p>
                <p className="text-[11px] text-[#A87954]">
                  ₹200–400 per person · Vaishali Sector 4
                </p>
              </div>
            </div>

            {/* Star Distribution Progress Bars */}
            <div className="space-y-1.5 text-xs text-[#78350F] pt-4 border-t border-[#F3EADA]">
              {[
                { stars: 5, pct: 72, count: 428 },
                { stars: 4, pct: 18, count: 107 },
                { stars: 3, pct: 6, count: 35 },
                { stars: 2, pct: 2, count: 12 },
                { stars: 1, pct: 2, count: 12 },
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-2">
                  <span className="w-3 text-right font-bold text-[11px]">{row.stars}</span>
                  <div className="flex-1 bg-[#FAF7F2] h-2 rounded-full overflow-hidden border border-[#E7DECD]">
                    <div
                      style={{ width: `${row.pct}%` }}
                      className="bg-amber-500 h-full rounded-full"
                    ></div>
                  </div>
                  <span className="w-8 text-[10px] text-[#A87954] tabular-nums text-right">
                    {row.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gemini AI Summary Card (8 cols) */}
          <div className="lg:col-span-8 bg-amber-50/70 p-6 sm:p-7 rounded-2xl border border-amber-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-[#B45309] text-white p-1 rounded-md">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-[#9A3412] uppercase tracking-wider">
                  Review Summary · Summarized with Gemini
                </span>
                <span className="text-[11px] text-[#78350F] ml-auto font-medium hidden sm:inline">
                  +207 detailed diner mentions
                </span>
              </div>

              <blockquote className="text-sm sm:text-base text-[#451A03] font-medium leading-relaxed mb-4">
                &ldquo;Diners say this restaurant offers delicious and authentic South Indian food, with popular items like <strong className="text-[#9A3412]">thatte idli</strong>, <strong className="text-[#9A3412]">crispy dosas</strong>, and <strong className="text-[#9A3412]">filter coffee</strong>. They also highlight the pleasant ambiance, good value for money, and attentive staff.&rdquo;
              </blockquote>

              <p className="text-xs text-[#78350F]">
                Some guest reviews note peak Saturday evening waits of 15–20 minutes due to heavy family demand. Reserving in advance or visiting during breakfast is recommended.
              </p>
            </div>

            {/* Keyword Chips for Dynamic Review Filtering */}
            <div className="mt-5 pt-4 border-t border-amber-200/80 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#78350F] mr-1">Filter Mentions:</span>
              {filterTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedTag === tag.id
                      ? 'bg-[#9A3412] text-white shadow-xs'
                      : 'bg-white text-[#78350F] border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {tag.label} <span className="opacity-75 font-normal">({tag.count})</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Reviews List */}
        <div className="space-y-5">
          {filteredReviews.map((rev) => {
            const hasLiked = !!likedReviews[rev.id];
            const displayLikes = (rev.likesCount || 0) + (hasLiked ? 1 : 0);

            return (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-[#E7DECD] p-6 shadow-xs hover:border-[#D97706]/40 transition-colors"
              >
                {/* Author Info & Star Rating */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-serif-display text-base font-bold text-[#451A03]">
                      {rev.author}
                    </h4>
                    {rev.authorType && (
                      <p className="text-[11px] text-[#A87954]">{rev.authorType}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-[#78350F] font-semibold">{rev.relativeTime}</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#573010] leading-relaxed mb-4">
                  {rev.text}
                </p>

                {/* Tags & Interaction */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F3EADA]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {rev.tags?.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-bold text-[#78350F] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E7DECD]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleLike(rev.id)}
                      className={`flex items-center gap-1 text-xs font-semibold p-1.5 rounded-lg transition-colors cursor-pointer ${
                        hasLiked ? 'text-[#9A3412] bg-amber-50' : 'text-[#78350F] hover:text-[#451A03]'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
                      <span>Helpful ({displayLikes})</span>
                    </button>
                  </div>
                </div>

                {/* Owner Response Box */}
                {rev.ownerReply && (
                  <div className="mt-4 p-4 rounded-xl bg-[#FAF0E1]/80 border-l-4 border-[#B45309] text-xs text-[#6B3A19] space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#9A3412]">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Response from Vedantam Management
                      </span>
                      <span className="text-[#A87954] font-normal">{rev.ownerReply.date}</span>
                    </div>
                    <p className="leading-relaxed">{rev.ownerReply.text}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] w-full max-w-lg rounded-2xl border border-[#E7DECD] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-[#FAF0E1] p-5 border-b border-[#E7DECD] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">
                  Share Your Experience
                </span>
                <h3 className="font-serif-display text-xl font-bold text-[#451A03]">
                  Review Vedantam Vaishali
                </h3>
              </div>
              <button
                onClick={() => setIsWriteReviewOpen(false)}
                className="p-1.5 rounded-lg text-[#78350F] hover:bg-white/80 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="p-5 sm:p-6 space-y-4">
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold text-[#451A03] mb-1.5">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer focus:outline-hidden"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= newRating ? 'text-amber-500 fill-current' : 'text-[#E7DECD]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#78350F] ml-2">
                    {newRating === 5 ? 'Exceptional (5/5)' : `${newRating} Stars`}
                  </span>
                </div>
              </div>

              {/* Reviewer Name */}
              <div>
                <label className="block text-xs font-bold text-[#451A03] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Ananya Deshmukh"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  required
                  className="w-full p-2.5 text-xs bg-white border border-[#E7DECD] rounded-xl text-[#451A03]"
                />
              </div>

              {/* Favorite Dish Mention */}
              <div>
                <label className="block text-xs font-bold text-[#451A03] mb-1">
                  Highlight Dish
                </label>
                <select
                  value={selectedDishTag}
                  onChange={(e) => setSelectedDishTag(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-[#E7DECD] rounded-xl text-[#451A03]"
                >
                  <option value="thatte idli">Coconut Ghee Podi Thatte Idli</option>
                  <option value="crispy dosa">Benne Roast Masala Dosa</option>
                  <option value="filter coffee">Authentic Brass Filter Coffee</option>
                  <option value="sambhar">Traditional Sambar Vada</option>
                  <option value="curd rice">Curd Rice & Buttermilk</option>
                  <option value="ambiance">Restaurant Ambiance & Cleanliness</option>
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-[#451A03] mb-1">
                  Your Review *
                </label>
                <textarea
                  placeholder="Describe your dining experience, taste of the food, service, and favorite accompaniments..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  required
                  rows={4}
                  className="w-full p-2.5 text-xs bg-white border border-[#E7DECD] rounded-xl text-[#451A03]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl shadow-md cursor-pointer"
                >
                  Post Public Review
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
