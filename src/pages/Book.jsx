import BookDetails from '../components/BookDetails';
import { useNavigate, useParams } from 'react-router-dom';

export default function Book(props) {
  const { bookUrl } = useParams();
  const navigate = useNavigate();

  return (
    <section className="book-details-section">
      <div className="container container--md">
        <button onClick={() => navigate(-1)} className="go-back-link">
          <span className="go-back-link__arrow">&#10229;</span>
          <span>Go back</span>
        </button>

        <BookDetails />
      </div>
    </section>
  );
}
