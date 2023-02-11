import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import BookshelvesItem from '../BookshelvesItem'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const componentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Bookshelves extends Component {
  state = {
    bookshelvesItemsList: [],
    status: componentStatus.initial,
    activeFilter: bookshelvesList[0].id,
    searchInput: '',
  }

  componentDidMount() {
    this.getBookshelvesBooksList()
  }

  fetchSuccessFunction = data => {
    // console.log(data)
    const updatedBookshelvesList = data.books.map(each => ({
      id: each.id,
      authorName: each.author_name,
      coverPic: each.cover_pic,
      rating: each.rating,
      readStatus: each.read_status,
      title: each.title,
    }))
    this.setState({
      bookshelvesItemsList: updatedBookshelvesList,
      status: componentStatus.success,
    })
  }

  getBookshelvesBooksList = async () => {
    const {searchInput, activeFilter} = this.state
    this.setState({status: componentStatus.inProgress})
    const bookshelfName = bookshelvesList.filter(
      each => each.id === activeFilter,
    )[0].value

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchInput}`
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

  onClickingFilterButton = event => {
    this.setState(
      {activeFilter: event.target.value},
      this.getBookshelvesBooksList,
    )
  }

  renderLeftBarView = () => {
    const {activeFilter} = this.state
    // console.log(activeFilter)
    return (
      <div className="p-3 h-100">
        <h1 className="h5 mt-3">Bookshelves</h1>
        <ul className="list-unstyled">
          {bookshelvesList.map(each => (
            <li key={each.id} className="mt-3">
              <button
                type="button"
                className={
                  activeFilter === each.id
                    ? 'm-0 p-0 icon_button text-primary'
                    : 'm-0 p-0 icon_button'
                }
                onClick={this.onClickingFilterButton}
                value={each.id}
              >
                {each.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getBookshelvesBooksList()
  }

  onClickEnterButton = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.getBookshelvesBooksList()
    }
  }

  renderSearchView = () => {
    const {searchInput, activeFilter} = this.state
    const dis = bookshelvesList.filter(each => each.id === activeFilter)[0]
      .label
    return (
      <div className="pb-3 pr-3 pl-3 d-flex justify-content-between align-items-center ">
        <h1 className="m-0 h5">{dis} Books</h1>
        <nav className="navbar navbar-light p-0">
          <div className="form-inline">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={this.onChangeSearchInput}
                value={searchInput}
                onKeyDown={this.onClickEnterButton}
              />
              <div className="input-group-prepend">
                <button
                  type="button"
                  className="input-group-text"
                  testid="searchButton"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }

  renderSuccessView = () => {
    const {bookshelvesItemsList, searchInput} = this.state
    return (
      <>
        {bookshelvesItemsList.length > 0 ? (
          <ul className="pt-3 pb-5 list-unstyled overflow-auto heightForBooks">
            {bookshelvesItemsList.map(each => (
              <BookshelvesItem key={each.id} BookItem={each} />
            ))}
          </ul>
        ) : (
          <div className="h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="col-5">
              <img
                className="w-100"
                src="https://res.cloudinary.com/dp8ggbibl/image/upload/v1675939046/Mini%20Project/search_not_found_rdbqe9.png"
                alt="no books"
              />
            </div>
            <p className="h5 text-secondary mt-3">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        )}
      </>
    )
  }

  onClickRetryButton = () => {
    this.getBookshelvesBooksList()
  }

  renderFailureView = () => (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center mt-3 mb-3">
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

  renderRightSideView = () => (
    <div className="d-flex flex-column vh-100 p-3 bg-light">
      <div className="heightForSearchBox">{this.renderSearchView()}</div>
      <div className="h-100">{this.renderDecisionMakingView()}</div>
    </div>
  )

  renderBookshelvesTotal = () => (
    <div className="mt-5 bookshelves_container">
      <div className=" bg-light col-2 vh-100">{this.renderLeftBarView()}</div>
      <div className="col-10 ">{this.renderRightSideView()}</div>
    </div>
  )

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="main_container min-vh-100 w-100">
          <div className=" bg-light w-100 d-flex justify-content-center align-items-center">
            <Header />
          </div>
          {this.renderBookshelvesTotal()}
          <Footer />
        </div>
      </div>
    )
  }
}

export default Bookshelves
