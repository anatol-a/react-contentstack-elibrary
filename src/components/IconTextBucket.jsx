export default function IconTextBucket({ bucket }) {
  return (
    <div className="icon-text-bucket">
      <div className="icon-text-bucket__icon">
        <img src={bucket.icon?.url} alt={bucket.title} />
      </div>
      <h3 className="icon-text-bucket__title h4">{bucket.title}</h3>
      <div className="icon-text-bucket__text">
        {bucket.text}
      </div>
    </div>
  );
}
