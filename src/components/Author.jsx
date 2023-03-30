export default function Author({ author, onToggleFavorite }) {
  const { id, photo, name, short_bio: bio, books, favorite: isFavorite } = author;

  return (
    <div className="author">
      <div className="author__photo">
        <img src={photo} alt={name} />
      </div>
      <div className="author__info">
        <div
          className={`author__favorite ${ isFavorite ? " author__favorite--active" : "" }`}
          onClick={() => onToggleFavorite(id, isFavorite)}
        ></div>
        <strong className="author__name">{name}</strong>
        <p className="author__bio">{bio}</p>
        {books?.length > 0 ? (
          <div className="author-books">
            <h5>Best books: </h5>
            <ul className="author-books__list">
              {books.map(book => (
                <li className="author-books__item" key={book.name}>
                  <strong className="author-books__item">{book.name}</strong>
                  <span> | {book.ISBN}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
