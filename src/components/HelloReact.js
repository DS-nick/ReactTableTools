import React from "react";
import "./HelloReact.css";
import arrow from "../assets/arrow.svg";
import data from "../assets/data";
export default class HelloReact extends React.Component {
  constructor() {
    super();
    this.state = {
      list: ["Liam", "Noah", "Oliver", "William"],
      example: "Unsorted",
      headerTable: [
        {
          name: "name",
          value: "name"
        },
        {
          name: "user status",
          type: "string"
        },
        {
          name: "payment status",
          type: "string"
        },
        {
          name: "amount",
          value: "amount"
        }
      ],
      tableItem: data,
      sortStatus: "default",
      defaultSortValues: []
    };
  }
  changeSortStatus() {
    return new Promise((resolve) => {
      if (this.state.sortStatus === "default") {
        this.setState((state) => (state.sortStatus = "asc"));
      }
      if (this.state.sortStatus === "asc") {
        this.setState((state) => (state.sortStatus = "desc"));
      }
      if (this.state.sortStatus === "desc") {
        this.setState((state) => (state.sortStatus = "default"));
      }
      resolve();
    });
  }
  async onSortChange(name) {
    console.log("click", this.state.sortStatus);
    if (this.state.sortStatus === "default") {
      this.state.defaultSortValues = this.state.tableItem;
    }
    await this.changeSortStatus();
    let sortedArray = [];
    if (this.state.sortStatus === "asc") {
      sortedArray = [...this.state.tableItem];
      sortedArray.sort((a, b) => {
        const nameA = a[name].toLowerCase();
        const nameB = b[name].toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }
    if (this.state.sortStatus === "desc") {
      sortedArray = [...this.state.tableItem];
      sortedArray.sort((a, b) => {
        const nameA = a[name].toLowerCase();
        const nameB = b[name].toLowerCase();
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      });
    }
    if (this.state.sortStatus === "default") {
      sortedArray = this.state.defaultSortValues;
    }

    this.setState((state) => {
      return {
        tableItem: sortedArray
      };
    });
    console.log(this.state.tableItem);
    this.setState({
      example: "Sorted"
    });
  }

  render() {
    console.log("render", this.state.tableItem);
    return (
      <div>
        <div className="table">
          <div className="table-row">
            <div className="table-cell_name">
              <input type="checkbox" className="table-cell_checkbox" />
              <span
                onClick={(e) => this.onSortChange("name", e)}
                className="table-cell_name--txt"
              >
                Name
              </span>
              <div className="sort-arrow">
                <i className={"table-cell_order_" + this.state.sortStatus}></i>
              </div>
            </div>
            <div className="table-cell_name">
              <span className="table-cell_name--txt">User status</span>
            </div>
            <div className="table-cell_name">
              <span className="table-cell_name--txt">Payment status</span>
            </div>
            <div className="table-cell_name">
              <span className="table-cell_name--txt">Company</span>
            </div>
            <div className="table-cell_name">
              <span className="table-cell_name--txt">Created</span>
            </div>
            <div className="table-cell_name">
              <span className="table-cell_name--txt">Amount</span>
              <div className="sort-arrow" onClick={this.onSortChange}>
                <i className="table-cell_order"></i>
              </div>
            </div>
          </div>
          {this.state.tableItem.map((item, index) => (
            <div key={item.id} className="table-row">
              <div className="table-cell">
                <input type="checkbox" className="table-cell_checkbox" />
                <span>{item.name}</span>
              </div>
              <div className="table-cell">{item.userStatus}</div>
              <div className="table-cell">
                <span className={"payment-status_" + item.paymentStatus}>
                  {item.paymentStatus}
                </span>
              </div>
              <div className="table-cell">{item.company}</div>
              <div className="table-cell">{item.created}</div>
              <div className="table-cell">{item.amount}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
