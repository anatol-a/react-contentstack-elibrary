import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS } from '../graphql/queries';
import SkeletonBookCard from '../skeleton/SkeletonBookCard';
import BookCard from '../components/BookCard';
import { useState } from 'react';

const PAGE_SIZE = 5;

export default function LastBooksSection({ content }) {
  const { title } = content;
  const [pagPage, setPagPage] = useState(0);
  const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
    variables: {
      limit: PAGE_SIZE,
      skip: pagPage * PAGE_SIZE
    },
  });

  const books = data?.all_book?.items;
  const totalBooks = data?.all_book?.total;

  return (
    <section className="last-books-section">
      <div className="container">
        {title && <h2 className="text-center">{title}</h2>}
        <div className="last-books">
          {error && <p>ERROR: {error.message}</p>}

          <div className="book-cards">
            {loading && [...Array(5)].map((x, i) => <SkeletonBookCard key={i} />)}
            {books?.map(book => <BookCard book={book} key={book.title} />)}
          </div>

          <div className="last-books__controls">
            <button
              disabled={!pagPage}
              className="btn"
              onClick={() => setPagPage(prev => prev - 1)}
            >Prev</button>

            <button
              disabled={totalBooks < ((pagPage * PAGE_SIZE) + PAGE_SIZE)}
              className="btn"
              onClick={() => setPagPage(prev => prev + 1)}
            >Next</button>
          </div>
        </div>
      </div>
    </section>
  );
}
