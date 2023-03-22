import IconTextBucket from '../components/IconTextBucket';

export default function IconTextBucketsSection({ content }) {
  const { buckets, title } = content;

  return (
    <section className="icon-text-buckets-section">
      <div className="container">
        {title && <h2 className="text-center">{title}</h2>}
        <div className="icon-text-buckets">
          {buckets?.map(bucket => <IconTextBucket bucket={bucket} key={bucket.title} />)}
        </div>
      </div>
    </section>
  );
}
