import React from 'react';
import { Link } from "react-router-dom";

class Trips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    }
  }

  componentDidMount() {
    const url = 'api/v1/trips';
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(res => this.setState({trips: res}))
      .catch(() => this.props.history.push('/'));
  }

  render() {
    const {trips} = this.state;
    const allTrips = trips.map((trip, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{trip.name}</h5>
            <Link to={{
              pathname: `/trip/${trip.id}`,
              state: {trip: trip}
            }} className="btn custom-button">
              View Trip
            </Link>
          </div>
        </div>
      </div>
    ))
    const noTrip = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No trips yet. Why not {/*<link to="/new_trip">create one</link>*/}
        </h4>
      </div>
    )
    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">My Trips</h1>
            <p className="lead text-muted">
              These are my favourite trips from my last two years of adventure
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/trip" className="btn custom-button">
                Create New Trip
              </Link>
            </div>
            <div className="row">
              {trips.length > 0 ? allTrips : noTrip}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    )
  }
}

export default Trips;
