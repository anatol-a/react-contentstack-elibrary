import { Link, NavLink, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_HEADER } from '../graphql/queries';
import Skeleton from 'react-loading-skeleton';
import { useLayoutEffect, useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [burgerMenuOpened, setBurgerMenuOpened] = useState(false)
  const { loading, error, data } = useQuery(GET_HEADER);
  const header = data?.all_header?.items[0];
  const logo = header?.logoConnection?.edges[0]?.node;
  const menu = header?.menu;

  useLayoutEffect(() => {
    setBurgerMenuOpened(false)
  }, [location])

  return (
    <header className="page-header" id="page-header">
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

          <button
            className="burger-menu-btn"
            onClick={() => setBurgerMenuOpened(prev => !prev)}
          >
            <span className="burger-menu-btn__inner"></span>
          </button>

          <nav className={'main-nav' + (burgerMenuOpened ? ' main-nav--mobile-opened' : '')}>
            <ul className="main-nav__list">
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
