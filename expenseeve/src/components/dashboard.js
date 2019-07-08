import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import DoughnutChart from "./chartDonught";
import { Redirect } from "react-router-dom";
import { loginRoute } from "../config/route";
import {
  populateActiveCategory,
  itemOnChnage,
  expenseOnChnage,
  onSelectItem,
  onAddExpenseClick,
  loadExpenses,
  editExpense,
  onUpdateClick
} from "../actions";

let styles = {
  deleteBtnStyle: {
    cursor: "pointer"
  },
  editBtnStyle: {
    cursor: "pointer"
  },
  undoBtnStyle: {
    cursor: "pointer"
  },
  addExpBtnStyle: {
    border: "border: 1px solid #eee",
    boxShadow: " 0 2px 3px #ccc",
    borderRadius: "0"
  }
};

class Dashboard extends Component {
  state = {
    show: false
  };

  renderAddExpenseButton() {
    //------------
    return (
      <button value="addExpense" className="buttonStyle">
        Add Expense
      </button>
    );
    //-------------
  }
  onIteamChange = e => {
    console.log("[Onchange]", e.target.value);
  };

  handleAddExpense = () => {
    this.doesUpdate = false;
    this.handleShow();
    this.props.populateActiveCategory();
  };
  componentDidMount() {
    console.log("[DASHBOARD] comDidMnt: this.props", this.props);
  } //authentication
  redirectToLoginIfNotLogin(isLogin) {
    console.log("redirectToLoginIfNotLogin ", !isLogin);
    if (!isLogin) {
      //  this.props.initializeApp();

      console.log("[RedirectTo] Login page");
      return <Redirect to={loginRoute} />;
    }
  }
  Categoryoptions = [];
  populateCategory() {
    let categoryDataset = [];
    let options = [];

    if (this.props.categories) categoryDataset = this.props.categories;

    return categoryDataset.map(category => {
      if (this.props.selectedCategory) {
        if (category.name === this.props.selectedCategory) {
          return (
            <option defaultValue={category.name} key={category._id}>
              {category.name}
            </option>
          );
        }
      }

      return (
        <option value={category.name} key={category._id}>
          {category.name}
        </option>
      );
    });
  }

  renderPopupControlles = () => {
    if (this.doesUpdate) {
      return (
        <button
          type="button"
          className="btn card"
          onClick={e => {
            let reqBody = {
              iteamName: this.props.selectedItem,
              amount: this.props.expenseAmount,
              categoryName: this.props.selectedCategory,
              expenseId: this.props.expenseId
            };

            this.props.onUpdateClick(reqBody);
          }}
        >
          Apply Changes
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn card"
          onClick={e => {
            let reqBody = {
              iteamName: this.props.selectedItem,
              amount: this.props.expenseAmount,
              categoryName: this.props.selectedCategory
            };

            this.props.onAddExpenseClick(reqBody);
          }}
        >
          Save Changes
        </button>
      );
    }
  };

  componentDidUpdate() {
    if (this.props.doesNewExpenseAdded) {
      // alert("new Item Added");
      this.props.loadExpenses();
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };
  onSelect = e => {
    alert(e.target.value);
  };

  componentDidMount() {
    this.props.loadExpenses();
  }

  renderExpenseTable() {
    let { expenses } = this.props;

    const { deleteBtnStyle, undoBtnStyle, editBtnStyle } = styles;
    //console.log("[Dashboard Render]", expenses);

    return expenses.map((expense, index) => {
      let date = new Date(expense.expenseDate);
      let trnsDate =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

      if (expense.deleted) {
        return (
          <tr className="strikeout" key={index}>
            <td>{expense.categoryName}</td>
            <td>{expense.iteamName}</td>
            <td>{expense.amount}</td>
            <td>{trnsDate}</td>
            <td>
              <i
                id={expense._id}
                className="fas fa-undo"
                title="Undo changes"
                style={undoBtnStyle}
              />
            </td>
          </tr>
        );
      }

      return (
        <tr key={index}>
          <td>{expense.categoryName}</td>
          <td>{expense.iteamName}</td>
          <td>{expense.amount}</td>
          <td>{trnsDate}</td>
          <td>
            <i
              id={expense._id}
              onClick={e => {
                this.doesUpdate = true;
                this.props.editExpense(e.target.id);
                this.props.populateActiveCategory();
                this.handleShow();
              }}
              className="fas fa-pen"
              style={editBtnStyle}
              title="Edit"
            />{" "}
            |{" "}
            <i
              id={expense._id}
              className="fas fa-trash-alt"
              title="Delete"
              style={deleteBtnStyle}
            />
          </td>
        </tr>
      );
    });
  }

  renderaddBody = () => {
    return (
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <select
            value={this.props.selectedCategory}
            className="dropdownStyle"
            onChange={e => {
              // this.onSelect(e);
              this.props.onSelectItem(e.target.value);
            }}
            style={{ width: "100%" }}
          >
            <option value="1">Select category</option>

            {this.populateCategory()}
          </select>

          <input
            type="text"
            name="iteamName"
            placeholder=" Item name"
            value={this.props.selectedItem}
            onChange={e => {
              this.props.itemOnChnage(e.target.value);
            }}
            className="textBoxStyle"
            style={{ width: "100%" }}
          />

          <input
            type="text"
            name="amount"
            placeholder=" Amount "
            value={this.props.expenseAmount}
            onChange={e => {
              this.props.expenseOnChnage(e.target.value);
            }}
            className="textBoxStyle"
            style={{ width: "100%" }}
          />

          <br />
          <p className="text-center" style={{ color: "red" }}>
            {" "}
            {this.props.error}
          </p>
          <p className="text-center" style={{ color: "green" }}>
            {" "}
            {this.props.message}{" "}
          </p>

          <br />
        </div>
        <div className="col-md-2" />
      </div>
    );
  };

  renderExpensePopup = props => {
    return (
      <Modal
        show={this.state.show}
        style={{ border: "1px soild red" }}
        onHide={this.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderaddBody()}</Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn card" onClick={this.handleClose}>
            Close
          </button>
          {this.renderPopupControlles()}
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    // let tdStyle = { boxShadow: "0 .125rem .25rem rgba(0,0,0,.075) !important" };

    const { addExpBtnStyle } = styles;
    return (
      <div className="container">
        {this.redirectToLoginIfNotLogin(this.props.isLogin)}
        <div className="row mt-2">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Budget Overview</div>

              <div
                className="card-body"
                style={{ marginLeft: "0", paddingLeft: "0" }}
              >
                <div className="row">
                  <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                    <DoughnutChart label="25% spent" />
                  </div>
                  <div className=" col-xs-12 col-sm-4 col-md-4 col-lg-4">
                    <p>Total budget</p>
                    <p>
                      <strong>Rs</strong>2000000
                    </p>
                    <p>Total Expense</p>
                    <p>
                      <strong>Rs</strong>12000000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Category wise split</div>
              <h5 className="card-body">Special title treatment</h5>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <button
              type="button"
              style={addExpBtnStyle}
              className="btn "
              onClick={e => {
                this.handleAddExpense();
              }}
            >
              Add Expense
            </button>
          </div>
        </div>
        <div className="row customeCard">
          {/* table */}
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Item name</th>
                <th>Amount</th>
                <th>Expense date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderExpenseTable()}</tbody>
          </table>
        </div>
        {/* popup for expense */}
        {this.renderExpensePopup(this.props)}
        {/* pop ende here..*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("[State dashboard]", state);

  return { ...state.dashBoard, isLogin: state.authentication.isSessionActive };
};
export default connect(
  mapStateToProps,
  {
    populateActiveCategory,
    itemOnChnage,
    expenseOnChnage,
    onSelectItem,
    onAddExpenseClick,
    loadExpenses,
    editExpense,
    onUpdateClick
  }
)(Dashboard);
