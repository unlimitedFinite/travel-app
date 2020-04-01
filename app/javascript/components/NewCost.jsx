import React from "react";
import { Link } from "react-router-dom";

class NewCost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      amount: '',
      date: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name] : event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    const {info, amount, date} = this.state;
    const url = "/api/v1/costs";
    const trip_id = this.props.trip.id;

    const cost = {
      info,
      amount,
      date,
      trip_id
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cost)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => console.log(response))
      .then(response => this.props.history.push(`/trip/${trip_id}`))
      .catch(error => console.log(error.message));
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new travel cost for {this.props.trip.name}
            </h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="trip">Trip</label>
                <input
                  type="text"
                  name="trip_id"
                  id="trip"
                  className="form-control"
                  disabled={true}
                  value={ this.props.trip.name || '' }
                />
              </div>
              <div className="form-group">
                <label htmlFor="costInfo">Cost Information</label>
                <input
                  type="text"
                  name="info"
                  id="costInfo"
                  className="form-control"
                  required
                  onChange={this.handleChange}
                  value={this.state.info}
                />
              </div>
              <div className="form-group">
                <label htmlFor="costAmount">Amount in GBP</label>
                <input
                  type="number"
                  name="amount"
                  id="costAmount"
                  className="form-control"
                  required
                  onChange={this.handleChange}
                  value={this.state.amount}
                />
              </div>
              <label htmlFor="costDate">Date</label>
              <input
                type="date"
                className="form-control"
                id="costDate"
                name="date"
                required
                onChange={this.handleChange}
                value={this.state.date}
              />
              <button type="submit" className="btn custom-button mt-3">
                Add Cost
              </button>
              <Link to="/trip/" className="btn btn-link mt-3">
                Back to trip
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewCost;
