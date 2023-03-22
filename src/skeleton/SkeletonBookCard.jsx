import Skeleton from 'react-loading-skeleton';

export default function SkeletonBookCard() {
  return (
    <div className="skeleton-book-card">
      <Skeleton height={272} />
      <Skeleton height={45} />
      <Skeleton height={20} />
    </div>
  );
}
