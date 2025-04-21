import React from "react";
import { Rating, Button } from "@mui/material";
import { Review } from "../api";

interface ReviewListProps {
  reviews: Review[];
  onEdit?: (review: Review) => void;
  onDelete: (review: Review) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  onEdit,
  onDelete,
}) => {
  return (
    <ul className="review-list">
      {reviews.map((review) => (
        <li key={review.id} className="review-list__item">
          <div className="review-list__rating">
            <strong>Rating:</strong>
            <Rating name="rating" value={review.rating} disabled max={5} />
          </div>
          <div className="review-list__comment">
            <span className="review_list__comment__title">
              <strong>Comment:</strong> {review.comment}
            </span>
            <span className="review-list__comment--actions">
              {onEdit && (
                <>
                  <Button
                    size="small"
                    variant="outlined"
                    className="review-list__edit-btn"
                    onClick={() => onEdit(review)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    sx={{ marginLeft: "0.5rem" }}
                    className="review-list__edit-btn"
                    onClick={() => onDelete(review)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
