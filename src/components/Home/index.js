import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ReactSlick from '../ReactSlick'
import Footer from '../Footer'

const componentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {topRatedBooksList: [], status: componentStatus.initial}

  componentDidMount() {
    this.getTopRatedBooksList()
  }

  fetchSuccessFunction = data => {
    // console.log(data)
    const updatedTopRatedBooksList = data.books.map(each => ({
      id: each.id,
      authorName: each.author_name,
      coverPic: each.cover_pic,
      title: each.title,
    }))

    this.setState({
      topRatedBooksList: updatedTopRatedBooksList,
      status: componentStatus.success,
    })
  }

  getTopRatedBooksList = async () => {
    this.setState({status: componentStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      this.fetchSuccessFunction(data)
    } else {
      this.setState({status: componentStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {topRatedBooksList} = this.state
    return <ReactSlick topRatedBooksList={topRatedBooksList} />
  }

  onClickRetryButton = () => {
    this.getTopRatedBooksList()
  }

  renderFailureView = () => (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-3">
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
    <div className="d-flex justify-content-center align-items-center loading_Container">
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

  renderTopRatingBooksView = () => (
    <div className="top_rating_container p-3">
      <div className="d-flex justify-content-between align-items-center pl-5 pr-5">
        <h1 className="h4 m-0">Top Rated Books</h1>
        <Link to="/shelf">
          <button type="button" className="btn btn-primary">
            Find Books
          </button>
        </Link>
      </div>
      <div className="mt-3">{this.renderDecisionMakingView()}</div>
    </div>
  )

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="main_container min-vh-100 w-100">
          <div className=" bg-light w-100 d-flex justify-content-center align-items-center">
            <Header />
          </div>
          <div className="p-3 home_width">
            <div className="mt-3 p-3">
              <h1>Find Your Next Favorite Books?</h1>
              <p className="text-secondary">
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
            </div>
            <div>{this.renderTopRatingBooksView()}</div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
