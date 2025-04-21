import React, { useEffect, useState } from "react";
import { fetchBooks, Book, BookFilterParams } from "../api";
import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Card,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const BookList: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [filters, setFilters] = useState<BookFilterParams>({
    genre: "classic",
  });

  useEffect(() => {
    fetchBooks(filters).then((res) => setBooks(res.data));
  }, [filters]);

  const _openBookInfo = (id: number) => {
    console.log(`Button clicked : ${id}`);
    navigate(`/books/${id}`);
    // NavLink(`/books/${id}`);
  };

  // Render books and filter UI
  return (
    <>
      <div className="filters">
        <div className="filters__genre">
          <InputLabel>Genre : </InputLabel>
          <Select
            value={filters.genre}
            onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
            label="Genre"
            variant="outlined"
            sx={{ width: 200 }}
            size="small"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="classic">Classic</MenuItem>
            <MenuItem value="fiction">Fiction</MenuItem>
            <MenuItem value="non-fiction">Non-Fiction</MenuItem>
          </Select>
        </div>
      </div>

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
                    <Typography variant="body2">{book.genre}</Typography>
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
