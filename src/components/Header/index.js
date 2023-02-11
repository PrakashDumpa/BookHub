import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import BookHubContext from '../../context/BookHubContext'

const Header = props => {
  const onClickLogoutButton = setCurrentRouteId => {
    // console.log(props)
    Cookies.remove('jwt_token')
    const {history} = props
    setCurrentRouteId('1')
    history.replace('/login')
  }

  return (
    <BookHubContext.Consumer>
      {value => {
        const {setCurrentRouteId, currentRouteId} = value

        const onClickRouteButton = event => {
          setCurrentRouteId(event.target.id)
        }

        return (
          <nav className="nav_container d-flex justify-content-between align-items-center p-3 ">
            <div className="col-2 m-0">
              <Link to="/" className="nav-item">
                <img
                  className="w-100"
                  src="https://res.cloudinary.com/dp8ggbibl/image/upload/v1675856214/Mini%20Project/webSiteLogo_ksrksz.png"
                  alt="website logo"
                />
              </Link>
            </div>
            <ul className="list-unstyled d-flex justify-content-between align-items-center col-4 m-0">
              <li className="text-center">
                <Link to="/" className="nav-item">
                  <button
                    id="1"
                    type="button"
                    className={
                      currentRouteId === '1'
                        ? 'm-0 nav_button text-primary'
                        : 'm-0 nav_button'
                    }
                    onClick={onClickRouteButton}
                  >
                    Home
                  </button>
                </Link>
              </li>
              <li className="">
                <Link to="/shelf" className="nav-item">
                  <button
                    id="2"
                    type="button"
                    className={
                      currentRouteId === '2'
                        ? 'm-0 nav_button text-primary'
                        : 'm-0 nav_button'
                    }
                    onClick={onClickRouteButton}
                  >
                    Bookshelves
                  </button>
                </Link>
              </li>
              <li className="">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onClickLogoutButton(setCurrentRouteId)}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        )
      }}
    </BookHubContext.Consumer>
  )
}

export default withRouter(Header)
