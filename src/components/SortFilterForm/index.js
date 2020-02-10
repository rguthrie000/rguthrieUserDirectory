import React from "react";
import "./style.css";

function SortFilterForm(props) {
  // Notice how each input has a `value`, `name`, and `onChange` prop
  return (
    <div>
      <form className="form sort-filter-form">
        <p>Column:  <strong>{props.columns[props.column]}</strong></p>
        <p>Sort:</p>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="column-sort"
              value="ascending"
              className="form-check-input"
              checked={props.ascendingTrue}
              onChange={props.handleSortToggle}
            />
            ascending
          </label>
        </div>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="column-sort"
              value="descending"
              className="form-check-input"
              checked={!props.ascendingTrue}
              onChange={props.handleSortToggle}
            />
            descending
          </label>
        </div>
      </form>
      <form>
        <div>
          {((props.column !== 3) && (props.column !== 6)) ?
            (<div>
              <input
                value={props.matchStr}
                name="matchStr"
                type="text"
                placeholder="match"
                onChange={props.handleFormChange}
              />
              <button className="btn btn-primary col-button" 
                onClick={props.handleFormSubmit}>Go!</button>
            </div>)
          :
            (<div>
              <input
                value={props.minValue}
                name="minValue"
                type="text"
                placeholder="min"
                onChange={props.handleFormChange}
              />
              <input
                value={props.maxValue}
                name="maxValue"
                type="text"
                placeholder="max"
                onChange={props.handleFormChange}
              />
              <button className="btn btn-primary col-button" 
                onClick={props.handleFormSubmit}>Go!</button>
            </div>)}
        </div>
      </form>
    </div>
  );
}

export default SortFilterForm;
