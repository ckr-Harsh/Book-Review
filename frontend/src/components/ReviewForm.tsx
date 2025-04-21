import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Rating } from "@mui/material";
import { createReview, updateReview, Review } from "../api";

interface ReviewFormProps {
  bookId: number;
  mode: "add" | "edit";
  onReviewAdded: (review: Review) => void;
  onReviewUpdated?: (review: Review) => void;
  initialReview?: Review | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  bookId,
  mode,
  onReviewAdded,
  onReviewUpdated,
  initialReview,
}) => {
  const [rating, setRating] = useState<number | null>(
    initialReview?.rating ?? 5
  );
  const [comment, setComment] = useState<string>(initialReview?.comment ?? "");

  useEffect(() => {
    if (initialReview) {
      setRating(initialReview.rating);
      setComment(initialReview.comment);
    } else {
      setRating(5);
      setComment("");
    }
  }, [initialReview]);

  const _modeMap = {
    add: "Add a Review",
    edit: "Update the Review",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    if (mode === "edit" && initialReview) {
      const res = await updateReview(bookId, initialReview.id, {
        rating,
        comment,
        book: bookId,
      });
      onReviewUpdated?.(res.data);
    } else {
      const res = await createReview(bookId, { rating, comment, book: bookId });
      onReviewAdded(res.data);
    }
    setRating(4);
    setComment("");
  };

  return (
    <Box
      component="form"
      className="review-form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 3,
      }}
    >
      <Typography variant="h6">{_modeMap[mode]}</Typography>
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
        {mode === "edit" ? "Update" : "Submit"} Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
