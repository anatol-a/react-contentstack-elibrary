import parse from 'html-react-parser';

export default function ImgTextSection({ content }) {
  const { image, image_position: imagePosition, title, text, button, colored_bg: coloredBg } = content;

  return (
    <section className={`img-text-section ${coloredBg ? 'section--bg-light' : ''}`}>
      <div className="container">
        <div className={`img-text-section__cols ${imagePosition === 'right' ? 'img-text-section__cols--reverse' : ''}`}>
          <div className="img-text-section__img">
            {image && <img src={image.url} alt={image.title} />}
          </div>
          <div className="img-text-section__text">
            {title && <h2>{title}</h2>}

            {text && parse(text)}

            {button.href && <a href={button.href} className="btn">{button.title}</a>}
          </div>
        </div>
      </div>
    </section>
  );
}
