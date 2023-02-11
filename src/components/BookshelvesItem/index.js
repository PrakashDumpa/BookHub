import './index.css'
import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const BookshelvesItem = props => {
  const {BookItem} = props
  const {id, authorName, coverPic, rating, readStatus, title} = BookItem

  return (
    <li className="col-6  p-0 mb-4">
      <Link to={`/books/${id}`} className="d-flex nav-item">
        <div className="col-5">
          <img className="w-100" src={coverPic} alt={title} />
        </div>
        <div className="col-6">
          <h1 className="h5">{title}</h1>
          <p className="m-0 text-secondary">{authorName}</p>
          <div className="text-secondary d-flex align-items-center">
            <p className="m-0 pr-3">Avg Rating</p>
            <div className="d-flex flex-row align-items-center">
              <BsFillStarFill className="text-warning" />
              <p className="m-0 pt-1">{rating}</p>
            </div>
          </div>
          <p>
            Status: <span className="text-primary">{readStatus}</span>
          </p>
        </div>
      </Link>
    </li>
  )
}

export default BookshelvesItem
