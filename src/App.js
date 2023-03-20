import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Error from "./pages/Error";

import "react-loading-skeleton/dist/skeleton.css";
import './styles/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:bookUrl" element={<Book />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
