import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Navbar from './Navbar';
import Main from './Main';
import Footer from '../components/Footer';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  try {
    console.log('App.js, localStorage:', localStorage);
    const decodedToken = jwtDecode(localStorage.jwtToken);
    console.log('App.js, decodedToken:', decodedToken);
    const profileImage = JSON.parse(localStorage.profileImage);
    console.log('App.js, profileImage:', profileImage);
    store.dispatch(setCurrentUser({
      ...decodedToken, 
      profileImage
    }));
  } catch (err) {
    console.log('localStorage error!!', err);
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store} >
    <Router>
      <div className="App">
        <Navbar />
        <Main />
        <Footer />
      </div>
    </Router>
  </Provider>

);


export default App;
