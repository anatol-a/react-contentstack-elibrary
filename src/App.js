import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Error from "./pages/Error";

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
