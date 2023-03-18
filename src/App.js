import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
//for class-based components
import { withAuth0 } from '@auth0/auth0-react';
import Welcome from './Welcome';

class App extends React.Component {
  render() {
    console.log(this.props.auth0.isAuthenticated);
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={this.props.auth0.isAuthenticated ? <BestBooks /> : <Welcome />}
            >
            </Route>
            <Route
              path="/about"
              element={
                <About />
              }
            >
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
