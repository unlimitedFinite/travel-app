import React from 'react';
import { Link } from "react-router-dom";

export default () => {
  return(
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <ul>
            {}
            <Link
              to="/places"
              className="btn btn-lg custom-button"
              role="button"
            >

            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
};
