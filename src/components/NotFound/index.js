import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="h-100 d-flex flex-column justify-content-center align-items-center">
    <div className="col-5">
      <img
        className="w-100"
        src="https://res.cloudinary.com/dp8ggbibl/image/upload/v1675939101/Mini%20Project/page_not_found_rumnvb.png"
        alt="not found"
      />
    </div>
    <h1>Page Not Found</h1>
    <p className="h5 text-secondary mt-5">
      We are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="btn btn-primary">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
