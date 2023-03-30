import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_FOOTER } from '../graphql/queries';
import Skeleton from 'react-loading-skeleton';
import SocialLinkIcon from './SocialLinkIcon';

export default function Footer() {
  const { loading, error, data } = useQuery(GET_FOOTER);
  const footer = data?.all_footer?.items[0];
  const logo = footer?.logoConnection?.edges[0]?.node;
  const socials = footer?.socials;

  return (
    <footer className="page-footer">
      <div className="container container--lg">
        <div className="page-footer__cols">
          <div className="site-logo">
            {loading && (
              <Skeleton width={60} height={60} />
            )}

            {logo && (
              <Link to='/' title='ELibrary logo'>
                <img
                  className='site-logo__img'
                  src={logo.url}
                  alt={logo.title}
                />
              </Link>
            )}
          </div>
          <span className="footer-copyright">
            {loading && (
              <Skeleton width={60} height={60} />
            )}
            {footer?.copyright}
          </span>
          <div className="footer-socials">
            {socials?.length ? (
              socials?.map((socialLink) => <SocialLinkIcon key={socialLink.title} socialLink={socialLink} />)
            ) : (<></>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
