import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import cn from 'classnames'

const Header = ({ title, btnType, sideBar, logo }) => (
  <div className='navbar-fixed'>
    <nav>
      <div className='nav-wrapper barra-navegacao__container'>
        {sideBar !== 'none' ? (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            className='button-collapse'
            data-activates='slide-out'
            data-sidenav='left'
            data-closeonclick='true'
          >
            <i className='material-icons'>menu</i>
          </a>
        ) : null}
        {btnType === 'close' || btnType === 'back' ? (
          <Link
            className={cn('barra-navegacao__voltar', {
              'hide-on-med-and-down': sideBar !== 'none',
            })}
            // TODO: Implement go back
            to='/home'
          >
            <i className='material-icons'>
              {btnType === 'close' ? 'close' : 'arrow_back'}
            </i>
          </Link>
        ) : null}
        <h1 className='barra-navegacao__title truncate'>{title}</h1>
        {logo !== false ? (
          <Link className='brand-logo right hide-on-small-only' to='/home'>
            <img
              alt="Logo: A cubist representation of Odin's birds within an hexagon"
              className='barra-navegacao__logo'
              src='/images/horizontal_logo.png'
            />
          </Link>
        ) : null}
      </div>
    </nav>
  </div>
)
Header.propTypes = {
  title: PropTypes.node.isRequired,
  btnType: PropTypes.oneOf(['close', 'back']),
  sideBar: PropTypes.bool,
  logo: PropTypes.bool,
}
Header.defaultProps = {
  btnType: 'back',
  sideBar: false,
  logo: true,
}

export default Header
