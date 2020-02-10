import React from "react";
import "./style.css";

function OperationLog(props) {
  // Notice how each input has a `value`, `name`, and `onChange` prop
  return (
    <div className="operations-table">
      <div>
        <label name="reset-btn"><strong>Operation Log</strong></label>  
        <button name="reset-btn" className="btn btn-primary log-button" 
            onClick={props.handleReset}>Reset</button>
      </div>
      
      <table>
        <thead className="theadLogStyle">
          <tr>
            <th className="thLogStyle">column</th>
            <th className="thLogStyle">match</th>
            <th className="thLogStyle">min</th>
            <th className="thLogStyle">max</th>
            <th className="thLogStyle">users</th>
          </tr>    
        </thead>
        <tbody>
          {props.log.map( (logObj,i) => 
            <tr key={i}>
                <td>{logObj.column}</td>
                <td>{logObj.matchStr? logObj.matchStr : ''}</td>
                <td>{logObj.minValue? logObj.minValue : ''}</td>
                <td>{logObj.maxValue? logObj.maxValue : ''}</td>
                <td>{logObj.usersRemain}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OperationLog;
