import React, {Component} from "react";
import loadUsers          from "../utils/API";
import TitleBox           from "./TitleBox";
import SortFilterForm     from "./SortFilterForm";
import OperationLog       from "./OperationLog";
import UsersTableHead     from "./UsersTableHead";
import UserRow            from "./UserRow";

class UsersPage extends Component {
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

  componentDidMount = () => {
    loadUsers().then( (res) => {
      this.setState({
        usersCopy: res.data.results
      }, () => this.handleReset());
    });  
  }

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

  handleSortToggle = () => {
    const newSortAscending = this.state.ascendingTrue? false: true;
    this.setState({
      ascendingTrue : newSortAscending
    }, () => this.sortOnCol(this.state.column,newSortAscending));
  }

  handleFormChange = (event) => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };
  
  handleColumn = (col) => {
    this.setState({
      column    : col,
      matchStr  : '',
      minValue  : '',
      maxValue  : ''
    }, () => this.sortOnCol(col,this.state.ascendingTrue));
  };

  filterToRange = (min,max) => {
    let matchArr = [];
    switch (this.state.columns[this.state.column]) {
      case 'Duration':
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

  matchOnCol = () => {
    let matchArr = [];
    let r = this.state.matchStr.toLowerCase();
    let s = '';
    console.log(`matching ${this.state.columns[this.state.column]} on '${r}'`)
    switch (this.state.columns[this.state.column]) {
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
        console.log(matchArr);
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

  sortOnCol = (col,ascending) => {
    let sortArr = this.state.users;
    switch (this.state.columns[col]) {
      case 'User':
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
      case 'Duration':
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

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form submit');
    let makeLogEntry = false;
    let matchCnt = this.state.users.length;
    if (this.state.matchStr) {
      matchCnt = this.matchOnCol();
      makeLogEntry = true;
    }
    if (this.state.minValue || this.state.maxValue) {
      let min = this.state.minValue? this.state.minValue : -1000000;
      let max = this.state.maxValue? this.state.maxValue :  1000000;
      matchCnt = this.filterToRange(min,max);
      makeLogEntry = true;
    }
    if (makeLogEntry) {
      let logObj = {
        column      : this.state.columns[this.state.column],
        matchStr    : this.state.matchStr,
        minValue    : this.state.minValue,
        maxValue    : this.state.maxValue,
        usersRemain : matchCnt
      }
      let join = this.state.operationLog.concat(logObj);
      this.setState({
        operationLog : join,
        matchStr     : '',
        minValue     : '',
        maxValue     : ''
      })
    }
  };

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
