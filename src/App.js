import './App.css'
import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import BookItemDetails from './components/BookItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import BookHubContext from './context/BookHubContext'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route
class App extends Component {
  state = {currentRouteId: '1'}

  setCurrentRouteId = id => {
    this.setState({currentRouteId: id})
  }

  render() {
    const {currentRouteId} = this.state
    return (
      <BookHubContext.Provider
        value={{currentRouteId, setCurrentRouteId: this.setCurrentRouteId}}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={Bookshelves} />
          <ProtectedRoute exact path="/books/:id" component={BookItemDetails} />
          <Route exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </BookHubContext.Provider>
    )
  }
}

export default App
