import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import UserList from "../user/UserList";
import EditUser from '../user/EditUser';
import AddUser from '../user/AddUser';

const AppRouter = () => {
  return(
    <div>
      <BrowserRouter>
        <div style={style}>
          <Switch>
            <Route exact path="/" component={UserList} />
            <Route path="/users" component={UserList} />
            <Route path="/add-user" component={AddUser} />
            <Route path="/edit-user" component={EditUser} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

const style = {
  color: 'red',
  margin: '10px'
}

export default AppRouter;