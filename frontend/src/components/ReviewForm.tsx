import React, { useState } from "react";
import { createReview, Review } from "../api";

interface ReviewFormProps {
  bookId: number;
  onReviewAdded: (review: Review) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, onReviewAdded }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createReview(bookId, { book: bookId, comment, rating });
    onReviewAdded(res.data);
    setComment("");
    setRating(5);
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
};

export default ReviewForm;
