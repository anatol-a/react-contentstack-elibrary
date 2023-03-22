import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Error from "./pages/Error";

import "react-loading-skeleton/dist/skeleton.css";
import './styles/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path=":page" element={<Index />} />
        <Route path="books" element={<Books />} />
        <Route path=":locale?/books/:bookUrl" element={<Book />} />
        <Route path="404" element={<Error />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
