export default function CTALineSection({ content }) {
  const { text, button } = content;

  return (
    <section className="cta-line-section">
      <div className="container">
        <div className="cta-line-section__cols">
          <div className="cta-line-section__text">
            {text && <strong className="h4">{text}</strong>}
          </div>
          <div className="cta-line-section__btn">
            {button && <a href={button.href} className="btn btn--light">{button.title}</a>}
          </div>
        </div>
      </div>
    </section>
  );
}
