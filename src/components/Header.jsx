import { Link, NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_HEADER } from '../graphql/queries';
import Skeleton from 'react-loading-skeleton';

export default function Header() {
  const { loading, error, data } = useQuery(GET_HEADER);
  const header = data?.all_header?.items[0];
  const logo = header?.logoConnection?.edges[0]?.node;
  const menu = header?.menu;

  return (
    <header className="page-header">
      <div className="container container--lg">
        <div className="page-header__content">
          <div className="site-logo">
            { loading && (
              <Skeleton width={60} height={60} />
            )}

            { logo && (
              <Link to='/' title='ELibrary logo'>
                <img
                  className='site-logo__img'
                  src={logo.url}
                  alt={logo.title}
                />
              </Link>
            )}
          </div>
          <nav>
            <ul className="main-nav">
              { loading && (
                <Skeleton width={300} height={20} />
              )}

              { menu?.length && (
                menu?.map((menuItem) => (
                  <li key={menuItem.title} className='main-nav__item'>
                    <NavLink
                      to={menuItem.url.href}
                      className="main-nav__item"
                    >
                      { menuItem.title }
                    </NavLink>
                  </li>
                ))
              )}
            </ul>
          </nav>
        </div>

        { error && (
          <p>Error header loading ...</p>
        )}
      </div>
    </header>
  );
}
