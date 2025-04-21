# Book Review Platform

A full-stack web application for browsing books, reading and writing reviews, and filtering by genre or author.

## Features

- **Browse Books:** View a list of books with details.
- **Book Details:** See average ratings, reviews, and more for each book.
- **Review Management:** Add, edit, and delete reviews for any book.
- **Filter:** Filter books by genre or author.
- **Modern UI:** Built with React and Material-UI.
- **REST API:** Powered by Django REST Framework.
- **Database:** Uses PostgreSQL for persistent data storage.

---

## Tech Stack

- **Backend:** Django, Django REST Framework
- **Frontend:** React (TypeScript), Material-UI

---

## Project Structure

```
book_review_fs/
├── backend/ # Django backend (API, models, migrations)
├── frontend/ # React frontend (TypeScript, components, API layer)
├── README.md
├── .gitignore
```

---

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL

### Backend Setup

1. **Install dependencies:**

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Apply migrations:**

   ```bash
   python manage.py migrate
   ```

3. **Run backend server:**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Run frontend dev server:**

   ```bash
   npm run dev
   ```

3. **Access the app:**  
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints

- `GET /api/books/` — List all books (supports filtering by genre/author)
- `GET /api/books/:id/` — Get book details
- `GET /api/books/:id/reviews/` — List reviews for a book
- `POST /api/books/:id/reviews/` — Add a review
- `PUT /api/books/:id/reviews/:reviewId/` — Edit a review
- `DELETE /api/books/:id/reviews/:reviewId/` — Delete a review

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)
