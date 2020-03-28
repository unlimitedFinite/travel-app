import React from "react";
import { Link } from "react-router-dom";

class NewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      started: "",
      ended: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/trips";
    const { name, trip_start, trip_end } = this.state;

    // if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
    //   return;

    const body = {
      name,
      trip_start,
      trip_end
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/trip/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new trip
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="tripName">Trip name</label>
                <input
                  type="text"
                  name="name"
                  id="tripName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tripStarted">Trip Start Date</label>
                <input
                  type="date"
                  name="trip_start"
                  id="tripStarted"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <label htmlFor="tripEnded">Trip End Date</label>
              <input
                type="date"
                className="form-control"
                id="tripEnded"
                name="trip_end"
                required
                onChange={this.onChange}
              />
              <button type="submit" className="btn custom-button mt-3">
                Create Trip
              </button>
              <Link to="/trips" className="btn btn-link mt-3">
                Back to trips
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default NewTrip;
