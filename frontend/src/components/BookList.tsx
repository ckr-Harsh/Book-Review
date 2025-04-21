import React, { useEffect, useState } from "react";
import { fetchBooks, Book, BookFilterParams } from "../api";
import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Card,
} from "@mui/material";
import { redirect } from "react-router-dom";

export const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filters, setFilters] = useState<BookFilterParams>({});

  useEffect(() => {
    fetchBooks(filters).then((res) => setBooks(res.data));
  }, [filters]);

  const _openBookInfo = (id: number) => {
    console.log(`Button clicked : ${id}`);
    redirect(`/books/${id}`);
    // NavLink(`/books/${id}`);
  };

  // Render books and filter UI
  return (
    <>
      <div className="filters">{/* Filter UI here */}</div>

      <main className="books">
        {books?.length ? (
          books.map((book: Book) => (
            <div key={book.id}>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {book.title}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                      {book.author}
                    </Typography>
                    <Typography variant="body2">{book.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        _openBookInfo(book.id);
                      }}
                    >
                      Explore
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </div>
          ))
        ) : (
          <div className="books__empty">
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              No Books available!
            </Typography>
          </div>
        )}
      </main>
    </>
  );
};
