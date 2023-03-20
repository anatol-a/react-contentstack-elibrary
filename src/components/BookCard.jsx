import { Link } from 'react-router-dom';

export default function BookCard({ book, version }) {
  const { url, title, coverConnection, author, cover } = book;
  const coverUrl = (version === "sdk") ? cover?.url : coverConnection?.edges[0]?.node?.url;
  const authorName = (version === "sdk") ? author?.author?.[0]?.title : author?.authorConnection?.edges[0]?.node?.title;

  return (
    <Link to={ url } className="book-card">
      <div className="book-card__cover book-cover">
        { coverUrl ? (
          <img src={`${coverUrl}?width=124`} alt={ title } className="book-cover__img"/>
        ) : (
          <span className="book-cover__placeholder">Awaiting cover <br/> image</span>
        )}
      </div>
      <div className="book-card__info">
        <strong className="book-card__title">{ title }</strong>
        <span className="book-card__author">{ authorName }</span>
      </div>
    </Link>
  );
}
