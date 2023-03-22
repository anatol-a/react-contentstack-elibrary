
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPageRes } from '../helpers/indes';
import RenderComponents from '../components/RenderComponents';
import Skeleton from 'react-loading-skeleton';

export default function Index() {
  const params = useParams();
  const entryUrl = params.page ? `/${params.page}` : "/";
  const history = useNavigate();
  const [entries, setEntries] = useState({});
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      const result = await getPageRes(entryUrl);
      !result && setError(true);
      setEntries({ ...result });
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData();
    error && history("/404");
  }, [entryUrl, error]);

  return Object.keys(entries).length ? (
    <RenderComponents
      pageComponents={entries?.body}
      contentTypeUid='page'
      entryUid={entries?.uid}
      locale={entries?.locale}
    />
  ) : (
    <Skeleton count={3} height={400} />
  );
}
