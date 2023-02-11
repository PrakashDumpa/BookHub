import {Component} from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import './index.css'

const settings = {
  dots: false,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: 'linear',
}

class ReactSlick extends Component {
  renderSlider = () => {
    const {topRatedBooksList} = this.props
    return (
      <Slider {...settings}>
        {topRatedBooksList.map(each => {
          const {id, coverPic, authorName, title} = each
          return (
            <div className="col-12" key={id}>
              <Link to={`/books/${id}`} className="nav-item">
                <div className="w-100 text-center">
                  <img
                    className="logo-image"
                    src={coverPic}
                    alt="company logo"
                  />
                  <h1 className="m-0 h5 mt-2">{title}</h1>
                  <p className="m-0 text-secondary">{authorName}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default ReactSlick
