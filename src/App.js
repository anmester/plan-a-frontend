import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Login from './components/Login'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'
import PlanCreateContainer from './containers/PlanCreateContainer'

class App extends React.Component{
  state = {
    user: {}
  }
  
  loginSubmit = (e, user) => {
    e.preventDefault();
    console.log('user login', user)
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer <token>`
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password
        }
      })
    })
    .then(res => res.json())
    .then(returnData => {
      localStorage.setItem('token', returnData.token);
      this.setState({ user: returnData.user });  
    })
  }
  
  signUpSubmit = (e, user) => {
    e.preventDefault();
    console.log('Sign Up User:', user);
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password,
          allergies: user.allergies
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('Response Data', data);
        this.setState({ user: data.user });
      });
  };


  render() {
    return (
      <Switch>
        <Route path='/welcome' component={PlanCreateContainer} />

        <Route
          path='/login'
          render={() => <Login submitHandler={this.loginSubmit}/>}
        />

        <Route
          path='/signup'
          render={() => <SignUp submitHandler={this.signUpSubmit}/>}
        />
      </Switch>
    );
  }
}

export default withRouter(App);
