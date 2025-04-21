import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BookList } from "./components/BookList";
import BookDetail from "./components/BookDetail";
import Home from "./components/Home";
import "./App.css";

const App: React.FC = () => (
  <>
    <Router>
      <section className="app">
        <div className="app__header">
          <Home />
        </div>
        <main className="app__content">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetail />} />
          </Routes>
        </main>
      </section>
    </Router>
  </>
);

export default App;
