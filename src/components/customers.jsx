import React, { Component } from "react";
import { Link } from "react-router-dom";

class Customers extends Component {
  state = {};
  render() {
    const { customers, user } = this.props;
    const count = customers.length;
    return (
      <React.Fragment>
        <div className="component-div">
          <h1 className="title">Customers</h1>
          {count === 0 && (
            <div>
              <h2>No Customers found</h2>
            </div>
          )}
          <div>
            {user.isAdmin && (
              <Link to="#" className="btn btn-primary mb-3">
                New customer
              </Link>
            )}
          </div>
          {count > 0 && (
            <div className="table-div">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Gold</th>
                  </tr>
                </thead>
                <tbody className="movies-table">
                  {customers.map((customer) => {
                    return (
                      <tr key={customer._id}>
                        <td>{customer.name}</td>
                        <td>{customer.phone}</td>
                        <td>
                          {customer.isGold && (
                            <span className="badge rounded-pill bg-warning text-dark py-2 px-3">
                              Gold
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Customers;
