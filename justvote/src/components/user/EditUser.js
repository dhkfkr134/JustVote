import React, { Component } from 'react';
import UserApiService from "../../UserApiService";

class EditUser extends Component{

  constructor(props){
    super(props);

    this.state = {
      username: '',
      sex: '',
      age: '',
      major: '',
      grade: '',
      nickName: '',
      userId: '',
      userPass: '',
      message: null
    }
  }

  componentDidMount(){
    this.loadUser();
  }

  loadUser = () => {
    UserApiService.fetchUserByID(window.localStorage.getItem("userID"))
    .then( res => {
      let user = res.data;
      this.setState({
        username: user.username,
        sex: user.sex,
        age: user.age,
        major: user.major,
        grade: user.grade,
        nickName: user.nickName,
        userId: user.userId,
        userPass: user.userPass
      })
    })
    .catch(err => {
      console.log('loadUser() 에러', err);
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  saveUser = (e) => {
    e.preventDefault();

    let user = {
      username: this.state.username,
      sex: this.state.sex,
      age: this.state.age,
      major: this.state.major,
      grade: this.state.grade,
      nickName: this.state.nickName,
      userId: this.state.userId,
      userPass: this.state.userPass
    }

    UserApiService.editUser(user)
    .then( res => {
      this.setState({
        message : user.username + '님 정보가 수정되었습니다.'
      })
      this.props.history.push('/users');
    })
    .catch(err => {
      console.log('saveUser() 에러', err);
    })
  }

  render(){
    return(
    <div>
      <h2>Edit User</h2>
      <form>
        <div>
          <label>User Name:</label>
          <input type="text" name="username" readOnly="true" defaultValue={this.state.username} />
        </div>

        <div>
          <label>Sex:</label>
          <input type="text" name="sex" readOnly="true" defaultValue={this.state.sex} />
        </div>

        <div>
          <label>Age:</label>
          <input placeholder="Edit your age" name="age" value={this.state.age}
          onChange={this.onChange} />
        </div>

        <div>
          <label>Major:</label>
          <input placeholder="Edit your major" name="lastName" value={this.state.major}
          onChange={this.onChange} />
        </div>

        <div>
          <label>Grade:</label>
          <input type="number" placeholder="Edit your age" name="grade" value={this.state.grade}
          onChange={this.onChange} />
        </div>

        <div>
          <label>NickName:</label>
          <input type="number" placeholder="Edit your NickName" name="salary" value={this.state.nickName}
          onChange={this.onChange} />
        </div>

        <div>
          <label>UserId:</label>
          <input type="number" placeholder="Edit your UserId" name="salary" value={this.state.userId}
          onChange={this.onChange} />
        </div>

        <div>
          <label>UserPass:</label>
          <input type="number" placeholder="Edit your UserId" name="salary" value={this.state.userPass}
          onChange={this.onChange} />
        </div>

        <button onClick={this.saveUser}>Save</button>

      </form>
    </div>
    );
  }
}

export default EditUser;