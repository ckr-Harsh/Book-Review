import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBook, fetchReviews, Book, Review } from "../api";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { Button } from "@mui/material";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>({} as Book);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (id) {
      fetchBook(Number(id)).then((res) => setBook(res.data));
      fetchReviews(Number(id)).then((res) => setReviews(res.data));
    }
  }, [id]);

  const handleReviewAdded = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Go Back
      </Button>
      {/* Book detail UI */}
      <h2>{book?.title}</h2>
      {/* ...other fields... */}

      <h3>Reviews</h3>
      <ReviewForm bookId={book.id!} onReviewAdded={handleReviewAdded} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default BookDetail;
