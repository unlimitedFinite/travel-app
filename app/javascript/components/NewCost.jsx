import React from "react";
import { Link } from "react-router-dom";

const NewCost = ({ trip }) => {
  const [cost, dispatch] = React.useReducer((state, action) => {
    return [...state, action]
  }, [trip])

  const onChange = (event) => {
    setCost(() => {

      ...cost,
      e.target.name: event.target.value
    });
  }

  function onSubmit(event) {
    console.log(event.target);
    event.preventDefault();
    const url = "/api/v1/costs";
    // const { info, amount, date, trip } = this.useState();

    // if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
    //   return;

    cost = {
      info,
      amount,
      date,
      trip
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
      .then(response => this.props.history.push(`/trip/${trip.id}`))
      .catch(error => console.log(error.message));
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new travel cost for {trip.name}
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="trip">Trip</label>
              <input
                type="text"
                name="trip"
                id="trip"
                className="form-control"
                disabled={true}
                value={trip}
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
                onChange={dispatch}
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
              />
            </div>
            <label htmlFor="costDate">Date</label>
            <input
              type="date"
              className="form-control"
              id="costDate"
              name="date"
              required
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

export default NewCost;
