// src/components/ReviewList.tsx
import React from "react";
import { Review } from "../api";

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => (
  <ul>
    {reviews.map((review) => (
      <li key={review.id}>
        <strong>Rating:</strong> {review.rating} <br />
        <strong>Comment:</strong> {review.comment}
      </li>
    ))}
  </ul>
);

export default ReviewList;
