import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// import pages from pages dir
import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import ProductCheckout from './pages/ProductCheckout/ProductCheckout'
import EmailVerified from './pages/EmailVerified/EmailVerified'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Profile from './pages/Profile/Profile'
import NotFound from './pages/NotFound/NotFound'


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/product/:pid" exact component={ProductCheckout} />
          <Route path="/emailverified" exact component={EmailVerified} />
          <Route path="/changepassword/:token" exact component={ChangePassword} />
          <Route path="/notfound" component={NotFound} />
          <Route path="*" component={NotFound} />
        </Switch>
    </Router>
  );
}

export default App;
