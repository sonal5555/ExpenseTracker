import React, { useEffect, useState } from "react";
import "./DisplayScreen.css";

function Transactions(props) {
  //   useEffect(() => {
  //     setTransactions(expenseDetails);
  //   }, [transactions]);

  return (
    <div className="transactions">
      <h2> Transactions</h2>
      <div>
        <ul style={{listStyleType:'none',display:"grid" }}>
          {props.transactions.map((obj,i) => {
            return (
              <li key={i}>
               <span style={{marginRight:'5px'}}> {i+1}.</span> {obj.curTime}-{obj.type.toUpperCase()}-{obj.amt}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Transactions;
