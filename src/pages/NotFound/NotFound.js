import React from 'react';
import {Link} from 'react-router-dom'
import './NotFound.css'
const NotFound = () => {
    return (
        <div class="jumbotron jumbotron-fluid bg-dark text-white">
        <div class="container">
          <h1 class="display-4">404</h1>
          <p class="lead">We guess you are lost! Wanna find the right way to site.......</p>
          <button><Link to={'/'}>To the site</Link></button>
        </div>
      </div>
    );
}

export default NotFound;
