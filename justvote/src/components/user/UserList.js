import React, { Component } from 'react';
import ApiService from "../../ApiService";

class UserList extends Component{

  constructor(props){
    super(props);

    this.state = {
      users: [],
      message: null
    }
  }

  componentDidMount(){
    this.reloadUserList();
  }

  reloadUserList = () => {
    ApiService.fetchUsers()
      .then( res => {
      this.setState({
        users: res.data
      })
      })
    .catch(err => {
      console.log('reloadUserList() Error!', err);
    })
  }

  deleteUser = (userID) => {
    ApiService.deleteUser(userID)
    .then( res => {
      this.setState({
      message: 'User Deleted Successfully.'
      });
      this.setState({
      users: this.state.users.filter( user =>
      user.id !== userID)
    });
    })
    .catch(err => {
      console.log('deleteUser() Error!', err);
    })
  }

  editUser = (ID) => {
    window.localStorage.setItem("userID", ID);
    this.props.history.push('/edit-user');
  }

  addUser = () => {
    window.localStorage.removeItem("userID");
    this.props.history.push('/add-user');
  }

  render(){

    return(
      <div>
        <h2>User List</h2>
        <button onClick={this.addUser}> Add User </button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>FistName</th>
              <th>LastName</th>
              <th>UserName</th>
              <th>Age</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map( user =>
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
                <td>{user.age}</td>
                <td>{user.salary}</td>
                <td>
                  <button onClick={() => this.editUser(user.id)}>Edit</button>
                  <button onClick={() => this.deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

}

export default UserList;
