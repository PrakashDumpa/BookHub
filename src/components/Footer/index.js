import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="d-flex justify-content-center align-items-center mt-5 mb-5 w-100">
    <div className="col-2 text-center">
      <div className="d-flex justify-content-around">
        <button type="button" className="rounded-circle icon_button">
          <FaGoogle size={20} />
        </button>
        <button type="button" className="rounded-circle icon_button">
          <FaTwitter size={20} />
        </button>
        <button type="button" className="rounded-circle icon_button">
          <FaInstagram size={20} />
        </button>
        <button type="button" className="rounded-circle icon_button">
          <FaYoutube size={20} />
        </button>
      </div>
      <p className="h6 mt-3">Contact us</p>
    </div>
  </div>
)

export default Footer
