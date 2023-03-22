import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS } from '../graphql/queries';
import BookCard from '../components/BookCard';
import SkeletonBookCard from '../skeleton/SkeletonBookCard';

export default function Books() {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);
  const books = data?.all_book?.items

  return (
    <section className="books-section">
      <div className="container container--md">
        {loading && (
          <div className="book-cards">
            {[...Array(10)].map((x, i) => <SkeletonBookCard key={i} />)}
          </div>
        )}

        {books &&  (
          <>
            <div className="book-cards">
              {books.map(book => <BookCard book={book} key={book.title} />) }
            </div>
          </>
        )}

        {error && (
          <p>ERROR: {error.message}</p>
        )}

        {(!loading && !books && !error) && (
          <p>Unfortunately no books found ...</p>
        )}
      </div>
    </section>
  );
}