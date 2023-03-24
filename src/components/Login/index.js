import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    showErrorMsg: false,
    errorMsg: '',
    check: false,
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  fetchSuccessView = jwtToken => {
    this.setState({showErrorMsg: false})
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onClickLoginButton = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      //   console.log(data)
      this.fetchSuccessView(data.jwt_token)
    } else {
      //   console.log(data)
      this.setState({errorMsg: data.error_msg, showErrorMsg: true})
    }
  }

  onClickShowCheckBox = () => {
    this.setState(prevState => ({check: !prevState.check}))
  }

  render() {
    const {username, password, showErrorMsg, errorMsg, check} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="d-flex w-75">
          <div className="w-50 text-center">
            <img
              className="imageWidth"
              src="https://res.cloudinary.com/dp8ggbibl/image/upload/v1675856180/Mini%20Project/loginPageImage_ll5mie.png"
              alt="login website logo"
            />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center w-50">
            <form
              onSubmit={this.onClickLoginButton}
              className="login_form_container text-secondary p-5 "
            >
              <div className="text-center mb-5">
                <img
                  className="w-50"
                  src="https://res.cloudinary.com/dp8ggbibl/image/upload/v1675856214/Mini%20Project/webSiteLogo_ksrksz.png"
                  alt="website login"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username*</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Username"
                  onChange={this.onChangeUserName}
                  value={username}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password*</label>
                <input
                  type={check ? 'text' : 'password'}
                  //   type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input "
                  id="exampleCheck1"
                  onChange={this.onClickShowCheckBox}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Show Password
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
              {showErrorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
