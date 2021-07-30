import React, { useEffect, useReducer, useState } from "react";
import Transactions from "./Transactions";
import "./DisplayScreen.css";

const expenseObj = {
  balance: JSON.parse(localStorage.getItem("expenseBalance")) || 0,
  action: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      var balance = state.balance + Number(action.amt);
      localStorage.setItem("expenseBalance", JSON.stringify(balance));
      return { balance };
    case "remove":
      var balance = state.balance - Number(action.amt);
      localStorage.setItem("expenseBalance", JSON.stringify(balance));
      return { balance };
    default:
      return state;
  }
};

function DisplayScreen() {
  const [state, dispatch] = useReducer(reducer, expenseObj);
  const [amt, setAmt] = useState(0);
  const [err, setErr] = useState("");
  let data = JSON.parse(localStorage.getItem("ExpenseTracker")) || [];

  // const [balance,setBalance]=useState

  const amtvalidation = () => {
    // alert("hi");
    if (amt == 0 || amt == "") {
      setErr("Entered a valid amount");
    } else {
      setErr("");
    }
  };

  const isValid = (actionToBePerformed) => {
    var amtValid = true;

    if (
      amt == 0 &&
      (actionToBePerformed == "remove" || actionToBePerformed == "add")
    ) {
      setErr("Entered amount must be atleast greater than 0***");
      amtValid = false;
    } else if (amt > state.balance && actionToBePerformed === "remove") {
      setErr("Entered amount can not be greater than the balance amount");
      amtValid = false;
    } else {
      setErr("");
      amtValid = true;
    }
    return amtValid;
  };

  const checkDataValidation = (actionToBePerformed) => {
    var valid = isValid(actionToBePerformed);
    var expenseDetails =
      JSON.parse(localStorage.getItem("ExpenseTracker")) || [];
    if (valid) {
      dispatch({ type: actionToBePerformed, amt });
      var dt = new Date();
      var curTime = dt.toISOString();
      var obj = { type: actionToBePerformed, amt, curTime };
      expenseDetails.push(obj);
      localStorage.setItem("ExpenseTracker", JSON.stringify(expenseDetails));
      setAmt(0);
      data = JSON.parse(localStorage.getItem("ExpenseTracker")) || [];
    }
  };
  return (
    <div className='main_div'>
    <h1 style={{paddingTop:'15px'}}> Expense Tracker</h1>
      <div className="parent">
        <h4> Balance : {state.balance}</h4>
        <div>
          <input
            type="number"
            value={amt}
            onChange={(e) => {
              amtvalidation();
              setAmt(e.target.value);
            }}
          />
        </div>
        <small> {err}</small>
        <br></br>
        <div className='btn'>

        <button
          onClick={() => {
            checkDataValidation("add");
          }}
          >
          ADD
        </button>
        <button
          onClick={() => {
            checkDataValidation("remove");
          }}
          >
          Remove
        </button>
            </div>
      </div>
      <div className="child">
      <Transactions transactions={data} />
      </div>
    </div>
  );
}

export default DisplayScreen;
