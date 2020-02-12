// rguthrie's User Directory -- Top-Level React file
// Uses React without hooks (opportunity for re-factoring!)
//
// User Directory presents a list of users as rows in a table,
// with columns for various personal information. The table rows
// can be sorted based on any column, either ascending or descending.
// The rows can also be filtered based on any column, with numeric
// columns filtered on numeric range, and text columns filtered based
// on match to a partial string. Results of filtering re-define the
// list, with a history of filters displayed, and a Reset button
// to restore the original list.

import React, {Component} from "react";

// API to get a set of random users
import loadUsers          from "../utils/API";

// Components of the page
import TitleBox           from "./TitleBox";
import SortFilterForm     from "./SortFilterForm";
import OperationLog       from "./OperationLog";
import UsersTableHead     from "./UsersTableHead";
import UserRow            from "./UserRow";

// UsersPage is a class descended from a react Component
class UsersPage extends Component {

  // 'global' variables  
  state = {
    users         : [],
    usersCopy     : [],
    columns       : ['User','Last','First','Yrs Member','City','State','Age','Gender','e-mail','SMS'],
    column        : 1,
    ascendingTrue : true,
    matchStr      : '',
    minValue      : '',
    maxValue      : '',
    operationLog  : []
  };

  // Initialization
  componentDidMount = () => {
    // fetch some users
    loadUsers()
    .then( (res) => {
      // store the set in usersCopy, then call handleReset to finish initialization
      this.setState({usersCopy: res.data.results}, () => this.handleReset());
    });  
  }

  // handleReset() restores the Users Directory to the initial state
  handleReset = (event) => {
    if (event) {event.preventDefault();}
    this.setState({ 
      users         : this.state.usersCopy,
      column        : 1, 
      ascendingTrue : true, 
      matchStr      : '', 
      minValue      : '', 
      maxValue      : '',
      operationLog  : []
    }, () => this.sortOnCol(1,true));
  }

  // handleSortToggle() handles a change of the ascending/descending radio
  // buttons as a toggle of the ascendingTrue variable, then sorts the 
  // user table rows based on the selected column and the new sort 'direction'.
  handleSortToggle = () => {
    const newSortAscending = this.state.ascendingTrue? false: true;
    this.setState({
      ascendingTrue : newSortAscending
    }, 
    // change of the sort direction, so re-sort
    () => this.sortOnCol(this.state.column,newSortAscending));
  }

  // handleFormChange() fetches filtering information from the page.
  // This happens each time the form data changes.
  handleFormChange = (event) => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    // Update the state, which flows down to the components to cause
    this.setState({
      [name]: value
    });
  };
  
  // handleColumn() implements the choice of a new column to be used
  // as the reference for sorting and filtering.
  handleColumn = (col) => {
    this.setState({
      column    : col,
      matchStr  : '',
      minValue  : '',
      maxValue  : ''
    }, 
    // new column selected, sort on this column
    () => this.sortOnCol(col,this.state.ascendingTrue));
  };

  //***************************
  // Sort / Filter 'block'

  // filterToRange filters the users on a selected numeric column using min and
  // max information supplied from the Form.
  filterToRange = (column,min,max) => {
    let matchArr = [];
    switch (column) {
      // both cases use the same logic; the array filter() is used to return
      // an array of rows which meet the filter's qualification criteria.
      case 'Yrs Member':
        matchArr = this.state.users.filter((u) => 
          ((u.registered.age >= min) && (u.registered.age <= max))
        );
        this.setState({users : matchArr});
        return matchArr.length;
      case 'Age':
        matchArr = this.state.users.filter((u) => 
          ((u.dob.age >= min) && (u.dob.age <= max))
        );
        this.setState({users : matchArr});
        return matchArr.length;
      default:
        break;    
    }
  }

  // matchOnCol() implements user row filtering by partial string match
  // on the selected string column.
  matchOnCol = () => {
    let matchArr = [];
    let r = this.state.matchStr.toLowerCase();
    let s = '';
    switch (this.state.columns[this.state.column]) {

      // all of these cases use the same logic -- use the array filter()
      // method with the string match() method to identify rows whose
      // string element in the selected column includes at least one 
      // occurrence of the matchStr.
      case 'User':
        matchArr = this.state.users.filter((elt) => {
          s = elt.login.username.toLowerCase();
          return s.match(r) ? true : false;
        });
        break;
      case 'Last':
        matchArr = this.state.users.filter((elt) => {
          s = elt.name.last.toLowerCase();
          return s.match(r) ? true : false;
        });
        break;
      case 'First':
        matchArr = this.state.users.filter((elt) => {
          s = elt.name.first.toLowerCase();
          return s.match(r) ? true : false;
        });
        break;
      case 'City':
        matchArr = this.state.users.filter((elt) => {
          s = elt.location.city.toLowerCase();
          return s.match(r) ? true : false;
        });
        break;
      case 'State':
        matchArr = this.state.users.filter((elt) => {
          s = elt.location.state.toLowerCase();
          return s.match(r) ? true : false;
        });
        break;
      case 'Gender':
        matchArr = this.state.users.filter((elt) => {
          s = elt.gender.toLowerCase();
          return s.match(r) ? true : false;
        });
        break;
      case'e-mail':
        matchArr = this.state.users.filter((elt) => {
          s = elt.email.toLowerCase();
          return s.match(r) ? true : false;
        });
        break;
      case 'SMS':
        matchArr = this.state.users.filter((elt) => {
          s = elt.cell.toLowerCase();
          return s.match(r) ? true : false;
        });
        break;
      default: 
        break;
    }
    this.setState({users: matchArr});
    return matchArr.length;
  }

  // sortOnCol() implements sorting of the user rows based on the selected
  // column and the chosen sort direction.
  sortOnCol = (col,ascending) => {
    let sortArr = this.state.users;
    switch (this.state.columns[col]) {
      case 'User':
        // logic in each of these cases is the same; use the array of
        // objects sort methodology, which requires a custom function
        // to establish the bubble sort compare-adjacent-items relationship.
        // only a positive result of the function causes a swap.
        sortArr.sort( (u1,u2) => {
          if (ascending) { 
            return (u1.login.username >= u2.login.username ? 1: -1)
          } else {
            return (u2.login.username >= u1.login.username ? 1: -1)
          }  
        });
        break;
      case 'Last':
        sortArr.sort( (u1,u2) => {
          if (ascending) { 
            return (u1.name.last >= u2.name.last ? 1: -1)
          } else {
            return (u2.name.last >= u1.name.last ? 1: -1)
          }  
        });
        break;
      case 'First':
        sortArr.sort( (u1,u2) => {
          if (ascending) { 
            return (u1.name.first >= u2.name.first ? 1: -1)
          } else {
            return (u2.name.first >= u1.name.first ? 1: -1)
          }  
        });
        break;
      case 'Yrs Member':
        sortArr.sort( (u1,u2) => {
          if (ascending) { 
            return (parseInt(u1.registered.age) >= parseInt(u2.registered.age) ? 1: -1)
          } else {
            return (parseInt(u2.registered.age) >= parseInt(u1.registered.age) ? 1: -1)
          }  
        });
        break;
      case 'City':
        sortArr.sort( (u1,u2) => {
          if (ascending) { 
            return (u1.location.city >= u2.location.city ? 1: -1)
          } else {
            return (u2.location.city >= u1.location.city ? 1: -1)
          }  
        });
        break;
      case 'State':
        sortArr.sort( (u1,u2) => {
          if (ascending) { 
            return (u1.location.state >= u2.location.state ? 1: -1)
          } else {
            return (u2.location.state >= u1.location.state ? 1: -1)
          }  
        });
        break;
      case 'Age':
        sortArr.sort( (u1,u2) => {
          if (ascending) { 
            return (parseInt(u1.dob.age) >= parseInt(u2.dob.age) ? 1: -1)
          } else {
            return (parseInt(u2.dob.age) >= parseInt(u1.dob.age) ? 1: -1)
          }  
        });
        break;
      case 'Gender':
        sortArr.sort( (u1,u2) => {
          if (ascending) { 
            return (u1.gender >= u2.gender ? 1: -1)
          } else {
            return (u2.gender >= u1.gender ? 1: -1)
          }  
        });
        break;
      case'e-mail':
        sortArr.sort( (u1,u2) => {
          if (ascending) { 
            return (u1.email >= u2.email ? 1: -1)
          } else {
            return (u2.email >= u1.email ? 1: -1)
          }  
        });
        break;
      case 'SMS':
        sortArr.sort( (u1,u2) => {
          if (ascending) { 
            return (u1.cell >= u2.cell ? 1: -1)
          } else {
            return (u2.cell >= u1.cell ? 1: -1)
          }  
        });
        break;
      default: 
        break;
    }
    this.setState({users: sortArr});
  }

  // handleFormSubmit() responds to the form submit button.
  handleFormSubmit = (event) => {
    event.preventDefault();
    let makeLogEntry = false;
    let matchCnt = this.state.users.length;

    // Conditional Rendering in the SortFilterForm component
    // only allows input of a match string when a string column
    // is selected. 
    if (this.state.matchStr) {
      // so a matchStr is present, and a string-based column has been selected.
      // filter the rows based on presence of matchStr.
      matchCnt = this.matchOnCol();
      // signal that an Operation Log entry will be needed.
      makeLogEntry = true;
    }

    // when a numeric column has been selected, min and max fields
    // are made available in the form.
    let column = this.state.columns[this.state.column];
    // make sure that a valid column for numeric filtering is selected
    if ((column === 'Yrs Member') || (column === 'Age')) {     
      if (this.state.minValue || this.state.maxValue) {
        // min or max or both have been supplied.  if only one of them,
        // assign the other so that the missing one won't affect the filter.
        let min = this.state.minValue? this.state.minValue : -1000000;
        let max = this.state.maxValue? this.state.maxValue :  1000000;
        // and run the numeric filter.
        matchCnt = this.filterToRange(column,min,max);
        // signal that an Operation Log entry will be needed.
        makeLogEntry = true;
      }
    }
    // Add this operation to the log.
    if (makeLogEntry) {
      let logObj = {
        column      : column,
        matchStr    : this.state.matchStr,
        minValue    : this.state.minValue,
        maxValue    : this.state.maxValue,
        usersRemain : matchCnt
      }
      // the object is added to the end of the operationLog
      // using the concatenation method because setState
      // doesn't support the push() array method.
      let join = this.state.operationLog.concat(logObj);
      this.setState({
        operationLog : join,
        matchStr     : '',
        minValue     : '',
        maxValue     : ''
      })
    }
  };

  // whew! ready to draw the page.
  render = () => {
    return (
      <div className="container">
        <div className="row mt-2">
          <div className='col-sm-3'>
            <TitleBox />
          </div>
          <div className='col-sm-3'>
            {<SortFilterForm 
              column={this.state.column}
              columns={this.state.columns}
              ascendingTrue={this.state.ascendingTrue}
              matchStr={this.state.matchStr}
              minValue={this.state.minValue}
              maxValue={this.state.maxValue}
              handleSortToggle={this.handleSortToggle}
              handleFormChange={this.handleFormChange}
              handleFormSubmit={this.handleFormSubmit}
            />}
          </div>
          <div className='col-sm-6'>
            {<OperationLog 
              log={this.state.operationLog}
              handleReset={this.handleReset}
            />}
          </div>
        </div>

        <div className="row">
          <br />
          <table>
            {<UsersTableHead
              columns={this.state.columns}
              handleColumn={this.handleColumn}
            />}
            <tbody>
              {this.state.users.map( (u,i) => 
                <UserRow 
                  key       ={i}
                  profilePic={u.picture.thumbnail}
                  userName  ={u.login.username}
                  lastName  ={u.name.last}
                  firstName ={u.name.first}
                  yrsMember ={u.registered.age}
                  city      ={u.location.city}
                  state     ={u.location.state}
                  age       ={u.dob.age}
                  gender    ={u.gender}
                  email     ={u.email}
                  phoneSMS  ={u.cell}
                />)}  
            </tbody>
          </table>
        </div>

      </div>  
    )
  }
}

export default UsersPage;
