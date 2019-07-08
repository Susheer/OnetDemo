import React, { Component } from "react";
import { connect } from "react-redux";
import { loginRoute } from "../config/route";
import {
  budgetOnChange,
  categoryOnChange,
  addCategory,
  updateBudget,
  deleteCategory //loadingCategory
} from "../actions";
import { Redirect } from "react-router-dom";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.deleteCategory = this.deleteCategory.bind();
  }
  redirectToLoginIfNotLogin(isLogin) {
    console.log("redirectToLoginIfNotLogin ", !isLogin);
    if (!isLogin) {
      //  this.props.initializeApp();

      console.log("[RedirectTo] Login page");
      return <Redirect to={loginRoute} />;
    }
  }

  deleteCategory = id => {
    // alert("OK" + id.target.id);
    this.props.deleteCategory(id.target.id);
  };

  renderCategoryList(style) {
    let styleList = {};
    return this.props.categories.map(item => {
      if (item.deleted) {
        let paramId = item._id;
        console.log("deletedItem", item);
        return (
          <li
            style={{
              textDecoration: "none",
              listStyle: "none",
              display: "block",
              margin: " 3px 6px 0px 6px",
              border: "1px solid #eee",
              padding: "2px",
              paddingLeft: "5px",
              boxShadow: "0px 1px 0px #ccc",
              color: "#ddddd",
              background: "#f7f7f7"
            }}
            id={paramId}
            key={item._id}
          >
            {item.name}
          </li>
        );
      }
      return (
        <li
          style={{
            textDecoration: "none",
            listStyle: "none",
            display: "block",
            margin: " 3px 6px 0px 6px",
            border: "1px solid #eee",
            padding: "2px",
            paddingLeft: "5px",
            boxShadow: "0 2px 3px #ccc"
          }}
          title="Delete"
          key={item._id}
        >
          {item.name}
          <span
            id={item.name}
            onClick={this.deleteCategory}
            className="fas fa-trash-alt"
            title="Delete"
            style={style}
          />
        </li>
      );
    });
  }

  renderAddCategoryBtn(btnStyle) {
    if (this.props.loadingCategory) {
      return <p style={{ display: "inline-block" }}>Adding...</p>;
    } else {
      return (
        <button
          type="button"
          onClick={e => {
            this.props.addCategory(this.props.category);
          }}
          style={btnStyle}
        >
          Add
        </button>
      );
    }
  }

  renderUpdateButton(btnStyle) {
    if (this.props.loadingUpdate) {
      return <p style={{ display: "inline-block" }}>Updating...</p>;
    } else {
      return (
        <button
          type="button"
          style={btnStyle}
          onClick={e => {
            this.props.updateBudget(this.props.budget);
          }}
        >
          Update
        </button>
      );
    }
  }

  render() {
    // console.log("Settings render props", this.props);
    let rowStyle = {
      background: "white"
    };
    let btnStyle = {
      border: "border: 1px solid #eee",
      boxShadow: " 0 2px 3px #ccc",
      borderRadius: "0",
      width: "100px",
      display: "inline-box",
      background: "white",
      height: "35px"
    };
    let deleteBtnStyle = {
      cursor: "pointer",
      float: "right",
      padding: "5px 10px 5px 0",
      fontSize: "12px"
    };
    return (
      <div className="container ">
        {this.redirectToLoginIfNotLogin(this.props.isLogin)}
        <div className="row mt-2" style={rowStyle}>
          <div className="col-md-2" />

          <div className="col-md-8 text-center">
            <label>
              Total budget
              <input
                type="text"
                name="totalBudget"
                style={{
                  display: "inline-box",
                  marginRight: "16px",
                  marginLeft: "16px"
                }}
                id="totalBudget"
                placeholder="Enter your  budget"
                value={this.props.budget}
                onChange={e => {
                  this.props.budgetOnChange(e.target.value);
                }}
              />
            </label>
            {this.renderUpdateButton(btnStyle)}
          </div>
          <div className="col-md-2" />
        </div>

        <div className="row mt-3" style={rowStyle}>
          <div className="col-md-2" />

          <div className="col-md-8 text-center">
            <label>
              Categories
              <input
                type="text"
                name="totalBudget"
                style={{
                  display: "inline-box",
                  marginRight: "16px",
                  marginLeft: "16px"
                }}
                value={this.props.category}
                placeholder="Enter category name"
                onChange={e => {
                  this.props.categoryOnChange(e.target.value);
                }}
              />
            </label>
            {this.renderAddCategoryBtn(btnStyle)}
          </div>
          <div className="col-md-2" />
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <p className="text-center" style={{ color: "red" }}>
              {this.props.error}
            </p>
          </div>
        </div>
        <div className="row mt-2" style={rowStyle}>
          <div className="col-md-3" />

          <div className="col-md-6 mt-1  card">
            <ul style={{ padding: "0px" }}>
              {this.renderCategoryList(deleteBtnStyle)}
            </ul>
          </div>
          <div className="col-md-3" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  //console.log("[Settings Comp]-", state);

  return { ...state.settings, isLogin: state.authentication.isSessionActive };
};

export default connect(
  mapStateToProps,
  {
    budgetOnChange,
    categoryOnChange,
    updateBudget,
    addCategory,
    deleteCategory
  }
)(Settings);
