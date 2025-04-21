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

export const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filters, setFilters] = useState<BookFilterParams>({});

  useEffect(() => {
    fetchBooks(filters).then((res) => setBooks(res.data));
  }, [filters]);

  // Render books and filter UI
  return (
    <>
      <div className="filters">{/* Filter UI here */}</div>

      <main className="books">
        {books?.length ? (
          books.map((book: Book) => (
            <li key={book.id}>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{card(book.title, book.author)}</Card>
              </Box>
            </li>
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

const card = (title: string, author: string) => (
  <React.Fragment>
    <CardContent>
      {/* <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {title}
        </Typography> */}
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
        {author}
      </Typography>
      {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
    </CardContent>
    <CardActions>
      <Button size="small">Explore</Button>
    </CardActions>
  </React.Fragment>
);
