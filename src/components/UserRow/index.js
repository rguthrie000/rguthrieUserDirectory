import React from "react";
import "./style.css";

function UserRow(props) {
  const tdStyle = {
    width: '100px',
    fontWeight: '600',
    textAlign: 'center',
  }

  return (
    <tr>
      <td style={tdStyle}>
        <div className="image-box">
            <img src={props.profilePic} alt=""/>
        </div>
        <p className="user-name">{props.userName}</p>
      </td>
      <td style={tdStyle}>{props.lastName  }</td>
      <td style={tdStyle}>{props.firstName }</td>
      <td style={tdStyle}>{props.yrsMember }</td>
      <td style={tdStyle}>{props.city      }</td>
      <td style={tdStyle}>{props.state     }</td>
      <td style={tdStyle}>{props.age       }</td>
      <td style={tdStyle}>{props.gender    }</td>
      <td style={tdStyle}>{props.email     }</td>
      <td style={tdStyle}>{props.phoneSMS  }</td>
    </tr>
  );
}

export default UserRow;
