import React from "react";
import "./style.css";

function UsersTableHead(props) {
  return (
    <thead className="theadStyle">
      <tr>
        {props.columns.map((heading, i) => (
          <th key={i} className="text-center align-middle thStyle">
            <button className="btn btn-primary col-button"
              onClick={() => props.handleColumn(i)}>{heading}</button>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default UsersTableHead;
