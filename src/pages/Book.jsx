import BookDetails from '../components/BookDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBookRes } from '../helpers/indes';
import Skeleton from 'react-loading-skeleton';

export default function BookSdk(props) {
  const navigate = useNavigate();
  const { bookUrl } = useParams();
  const [book, setBook] = useState({})
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      setLoading(true);
      const entryUrl = bookUrl ? `/books/${bookUrl}` : "/";
      const bookRes = await getBookRes(entryUrl);
      console.log('bookRes - ',bookRes)
      !bookRes && setError(true);
      setLoading(false);
      setBook( bookRes );
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [bookUrl, error]);

  // document.title = 'My Page Title';

  return (
    <section className="book-details-section">
      <div className="container container--md">
        <button onClick={() => navigate(-1)} className="go-back-link">
          <span className="go-back-link__arrow">&#10229;</span>
          <span>Go back</span>
        </button>

        { loading && (
          <div className="book-details__cols">
            <div className="book-details__cover">
              <Skeleton height={600} />
            </div>
            <div className="book-details__info">
              <Skeleton height={110} />
              <br/>
              <br/>
              <Skeleton count={2} />
              <br/>
              <Skeleton count={2} />
              <br/>
              <Skeleton count={2} />
              <br/>
              <Skeleton count={2} />
              <br/>
              <Skeleton width={132} height={52} />
            </div>
          </div>
        )}

        { (book && !loading) &&  (
          <BookDetails book={book} />
        )}

        { error && (
          <p>ERROR: {error.message}</p>
        )}
      </div>
    </section>
  );
}
