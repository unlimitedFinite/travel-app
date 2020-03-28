import React from 'react';
import { Link } from 'react-router-dom';

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {trip : {}};

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteTrip = this.deleteTrip.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: {id}
      }
    } = this.props;

    const url = `/api/v1/trip/${id}`;
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(res => this.setState({ trip: res }))
      .catch(() => this.props.history.push('/trips'));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  deleteTrip() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/trip/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/trips"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { trip } = this.state;
    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {trip.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteTrip}>
                Delete Trip
              </button>
            </div>
          </div>
          <Link to="/trips" className="btn btn-link">
            Back to trips
          </Link>
        </div>
      </div>
    );
  }
}

export default Trip;
