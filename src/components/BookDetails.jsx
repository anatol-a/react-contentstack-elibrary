import parse from 'html-react-parser';
import BookCard from './BookCard';
import { useEffect } from 'react';

export default function BookDetails({ book }) {
  const {
    isbn,
    title,
    cover,
    author,
    number_of_pages: numPages,
    link_to_book: linkToBook,
    description,
    related_books: relatedBooks,
    rating,
    seo
  } = book;

  const coverUrl = cover?.url;
  const authorName = author?.author?.[0]?.title;
  let descriptionParsed = "";

  if (description.value) {
    try {
      descriptionParsed = parse(description.value);
    } catch (e) {
      console.error(e)
    }
  }

  const changeMetaTags = () => {
    document.title = seo.meta_title;
    document.head.querySelector('meta[name="description"]').content = seo.meta_description;
    const metaKeywords = document.head.querySelector('meta[name="keywords"]');

    if (metaKeywords) {
      metaKeywords.content = seo.meta_keywords;
    } else {
      let meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = seo.meta_keywords;
      document.head.appendChild(meta);
    }
  }

  useEffect(() => {
    changeMetaTags()
  }, []);

  return (
    <>
      <div className="book-details">
        <div className="book-details__cols">
          <div className="book-details__cover book-cover">
            { coverUrl ? (
              <img src={coverUrl} alt={title} className="book-cover__img"/>
            ) : (
              <span className="book-cover__placeholder">Awaiting cover <br/> image</span>
            )}
          </div>
          <div className="book-details__info">
            <h1 className="book-details__title">{title}</h1>

            {authorName && (
              <div className="book-details__row">
                <span className="book-details__row-title">{author.title}</span>
                <span className="book-details__row-data">{authorName}</span>
              </div>
            )}

            {isbn && (
              <div className="book-details__row">
                <span className="book-details__row-title">ISBN</span>
                <span className="book-details__row-data">{isbn}</span>
              </div>
            )}

            {rating && (
              <div className="book-details__row">
                <span className="book-details__row-title">{rating.title}</span>
                <div className="star-rating" style={{ '--rating': rating.value }}></div>
              </div>
            )}

            {numPages && (
              <div className="book-details__row">
                <span className="book-details__row-title">{ numPages.title }</span>
                <span className="book-details__row-data">{ numPages.value }</span>
              </div>
            )}

            {linkToBook && (
              <a className="btn" href={linkToBook.href} target="_blank" rel="noreferrer">{linkToBook.title}</a>
            )}
          </div>
        </div>

        {descriptionParsed && (
          <div className="book-details__desc book-desc">
            <h2 className="book-desc__title text-center h3">{description.title}</h2>
            <div className="book-desc__text">
              {descriptionParsed}
            </div>
          </div>
        )}
      </div>

      {relatedBooks?.books?.length ? (
        <div className="related-books">
          <h2 className="text-center h3">{ relatedBooks.title }</h2>
          <div className="related-books__list">
            {relatedBooks.books.map(book => <BookCard book={book} key={book.title} version="sdk" />) }
          </div>
        </div>
      ) : (<></>)}
    </>
  );
}
