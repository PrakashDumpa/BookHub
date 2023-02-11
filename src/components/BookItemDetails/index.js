import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'

const componentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class BookItemDetails extends Component {
  state = {status: componentStatus.initial, bookDetails: {}}

  componentDidMount() {
    this.getBookshelvesBooksItemDetails()
  }

  fetchSuccessFunction = data => {
    // console.log(data)
    const updatedBookItemDetails = {
      id: data.book_details.id,
      authorName: data.book_details.author_name,
      coverPic: data.book_details.cover_pic,
      aboutBook: data.book_details.about_book,
      rating: data.book_details.rating,
      readStatus: data.book_details.read_status,
      title: data.book_details.title,
      aboutAuthor: data.book_details.about_author,
    }
    this.setState({
      bookDetails: updatedBookItemDetails,
      status: componentStatus.success,
    })
  }

  getBookshelvesBooksItemDetails = async () => {
    this.setState({status: componentStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.fetchSuccessFunction(data)
    } else {
      this.setState({status: componentStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {bookDetails} = this.state
    const {
      authorName,
      title,
      coverPic,
      aboutAuthor,
      aboutBook,
      rating,
      readStatus,
    } = bookDetails

    return (
      <div className="min-vh-100 w-100 mt-3 d-flex flex-column p-5 justify-content-center align-items-start">
        <div className="d-flex justify-content-center w-100">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <div className="col-4">
              <img className="w-100" src={coverPic} alt={title} />
            </div>
            <div className="col-6 d-flex flex-column justify-content-center align-self-center">
              <h1 className="h3">{title}</h1>
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
          </div>
        </div>
        <div className="w-100">
          <hr className="bg-secondary" />
        </div>
        <div>
          <h1 className="h3">About Author</h1>
          <p className="text-secondary">{aboutAuthor}</p>
        </div>
        <div>
          <h1 className="h3">About Book</h1>
          <p className="text-secondary">{aboutBook}</p>
        </div>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getBookshelvesBooksItemDetails()
  }

  renderFailureView = () => (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center mt-3 mb-3 pb-5">
      <div>
        <img
          src="https://res.cloudinary.com/dp8ggbibl/image/upload/v1675939028/Mini%20Project/something_went_rong_a28kdn.png"
          alt="failure view"
        />
      </div>
      <p className="mt-3 text-secondary">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.onClickRetryButton}
      >
        Try Again
      </button>
    </div>
  )

  renderInProgressView = () => (
    <div className="h-100 d-flex justify-content-center align-items-center loading_Container">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
      </div>
    </div>
  )

  renderDecisionMakingView = () => {
    const {status} = this.state

    switch (status) {
      case componentStatus.success:
        return this.renderSuccessView()
      case componentStatus.failure:
        return this.renderFailureView()
      case componentStatus.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="main_container min-vh-100 w-100">
          <div className=" bg-light w-100 d-flex justify-content-center align-items-center">
            <Header />
          </div>
          <div className="bg-light h-100 mt-5 book_item_details_container">
            {this.renderDecisionMakingView()}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default BookItemDetails
