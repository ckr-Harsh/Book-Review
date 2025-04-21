import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBook, fetchReviews, Book, Review } from "../api";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (id) {
      fetchBook(Number(id)).then((res) => setBook(res.data));
      fetchReviews(Number(id)).then((res) => setReviews(res.data));
    }
  }, [id]);

  // Render book detail and reviews
  return (
    <div>
      {/* Book detail UI here */}
      <h2>{book?.title}</h2>
      <p>{book?.author}</p>
      <p>{book?.genre}</p>
      <p>{book?.published_year}</p>
      <p>{book?.description}</p>
      <p>{book?.cover}</p>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.rating}</p>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookDetail;
