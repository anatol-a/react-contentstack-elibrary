export default function HeroSection({ content }) {
  const { title, subtitle, bg_image: bgImg } = content;

  return (
    <section className="hero-section bg-img">
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p className="h4">{subtitle}</p>}
      </div>
      <div className="bg-img__back">
        {bgImg && <img className="bg-img__img" alt="bg img" src={bgImg.url} loading="lazy" />}
      </div>
    </section>
  );
}
