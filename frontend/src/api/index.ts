import axios, { AxiosResponse } from "axios";

// API base URL
const API_BASE = "http://localhost:8000/api"; // Adjust as needed

// Book type
export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  published_year: number;
  description?: string;
  cover?: string;
}

// Review type
export interface Review {
  id: number;
  book: number;
  rating: number;
  comment: string;
  timestamp: string;
}

// Filter params for books
export interface BookFilterParams {
  genre?: string;
  author?: string;
  [key: string]: unknown;
}

// API functions
export const fetchBooks = (
  params?: BookFilterParams
): Promise<AxiosResponse<Book[]>> =>
  axios.get<Book[]>(`${API_BASE}/books/`, { params });

export const fetchBook = (id: number): Promise<AxiosResponse<Book>> =>
  axios.get<Book>(`${API_BASE}/books/${id}/`);

export const fetchReviews = (
  bookId: number
): Promise<AxiosResponse<Review[]>> =>
  axios.get<Review[]>(`${API_BASE}/books/${bookId}/reviews/`);

export const createReview = (
  bookId: number,
  data: Omit<Review, "id" | "timestamp">
): Promise<AxiosResponse<Review>> =>
  axios.post<Review>(`${API_BASE}/books/${bookId}/reviews/`, data);

export const updateReview = (
  bookId: number,
  reviewId: number,
  data: Partial<Omit<Review, "id" | "timestamp">>
): Promise<AxiosResponse<Review>> =>
  axios.put<Review>(`${API_BASE}/books/${bookId}/reviews/${reviewId}/`, data);

export const deleteReview = (
  bookId: number,
  reviewId: number
): Promise<AxiosResponse<void>> =>
  axios.delete<void>(`${API_BASE}/books/${bookId}/reviews/${reviewId}/`);
