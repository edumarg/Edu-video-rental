import React, { Component } from "react";

class Customers extends Component {
  state = {};
  render() {
    const { customers } = this.props;
    return (
      <React.Fragment>
        <div className="component-div">
          <h1 className="title">Customers</h1>
          <div className="table-div">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">email</th>
                </tr>
              </thead>
              <tbody className="movies-table">
                {customers.map((customer) => {
                  return (
                    <tr key={customer._id}>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Customers;
