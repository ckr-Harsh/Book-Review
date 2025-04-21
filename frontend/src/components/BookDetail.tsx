import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBook, fetchReviews, Book, Review, deleteReview } from "../api";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { Alert, Button, Snackbar } from "@mui/material";
import { Card, CardContent, Typography, Stack } from "@mui/material";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>({} as Book);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  useEffect(() => {
    if (id) {
      console.log(id);
      fetchBook(Number(id)).then((res) => setBook(res.data));
      fetchReviews(Number(id)).then((res) => setReviews(res.data));
    }
  }, [id]);

  const handleReviewAdded = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleReviewUpdated = (updatedReview: Review) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === updatedReview.id ? updatedReview : r))
    );
    setSnackbarMsg("Review updated successfully");
    setSnackbarOpen(true);
    setEditingReview(null);
  };

  const _handleDelete = (cReview: Review) => {
    deleteReview(cReview.book, cReview.id).then(() => {
      setReviews((prev) => prev.filter((r) => r.id !== cReview.id));
      setSnackbarMsg("Review deleted successfully");
      setSnackbarOpen(true);
    });
  };

  const SnackBar = () => {
    return (
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <div className="book-detail">
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Go Back
      </Button>
      <Card className="book-detail__title" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {book?.title}
          </Typography>
          <Stack direction="row" spacing={3} sx={{ mb: 1 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Author: {book?.author}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Genre: {book?.genre}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Year: {book?.published_year}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
      <Typography variant="h5" component="div" gutterBottom>
        Reviews
      </Typography>
      <ReviewForm
        bookId={book.id!}
        mode={editingReview ? "edit" : "add"}
        initialReview={editingReview}
        onReviewAdded={handleReviewAdded}
        onReviewUpdated={handleReviewUpdated}
      />
      <ReviewList
        reviews={reviews}
        onEdit={setEditingReview}
        onDelete={_handleDelete}
      />
      <SnackBar />
    </div>
  );
};

export default BookDetail;
