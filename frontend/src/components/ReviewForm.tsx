import React, { useState } from "react";
import { Box, Button, TextField, Typography, Rating } from "@mui/material";
import { createReview, Review } from "../api";

interface ReviewFormProps {
  bookId: number;
  onReviewAdded: (review: Review) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, onReviewAdded }) => {
  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    const res = await createReview(bookId, {
      rating,
      comment,
      book: bookId,
    });
    onReviewAdded(res.data);
    setRating(5);
    setComment("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 3,
        maxWidth: 400,
      }}
    >
      <Typography variant="h6">Add a Review</Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(_, value) => setRating(value)}
        max={5}
      />
      <TextField
        label="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        multiline
        minRows={2}
        required
      />
      <Button variant="contained" type="submit" disabled={!rating || !comment}>
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
