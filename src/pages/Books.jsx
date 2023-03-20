import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS } from '../graphql/queries';
import Skeleton from 'react-loading-skeleton';
import BookCard from '../components/BookCard';

export default function Books() {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);
  const books = data?.all_book?.items;

  return (
    <section className="books-section">
      <div className="container container--md">
        { loading && (
          <Skeleton height={300} />
        )}

        { books &&  (
          <div className="book-cards">
            { books.map(book => <BookCard book={book} key={book.title} />) }
          </div>
        )}

        { error && (
          <p>ERROR: {error.message}</p>
        )}

        { (!loading && !books && !error) && (
          <p>Unfortunately no books found ...</p>
        )}
      </div>
    </section>
  );
}