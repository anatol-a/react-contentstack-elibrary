import Author from '../components/Author';
import { FetchAuthorsApi } from '../helpers/authorsAPI'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Authors() {
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [authors, setAuthors] = useState([]);

  async function fetchAuthors() {
    try {
      setLoading(true);
      const authors = await FetchAuthorsApi.getAuthors();
      setAuthors(authors);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  }

  async function onToggleFavorite(id, isFavorite) {
    const authorReq = await FetchAuthorsApi.changeAuthorFavouriteState(id, !isFavorite);
    const newAuthors = authors.map(author => (author.id === authorReq.id) ? { ...author, favorite: authorReq.favorite } : author);
    setAuthors(newAuthors);
  }

  useEffect(() => {
    fetchAuthors();
  }, [])

  useEffect(() => {
    error && history("/404");
  }, [error]);

  return (
    <section className="authors-section">
      <div className="container">
        <h1 className="text-center">Authors</h1>
        {authors?.length ? authors.map(author => (
          <Author
            author={author}
            key={author.id}
            onToggleFavorite={onToggleFavorite}
          />
        )) : <></> }
      </div>
    </section>
  );
}