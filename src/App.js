import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import './App.css';
import Login from './components/Login'
import SignUp from './components/SignUp'
import PlanCreateContainer from './containers/PlanCreateContainer'

class App extends React.Component{
  
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
        this.history.push('/welcome')
      });
  };


  render() {
    console.log('state of user', this.props.user)
    return (
      <Switch>
        <Route path='/welcome' component={PlanCreateContainer} />

        <Route
          path='/login'
          render={() => <Login/>}
        />

        <Route
          path='/signup'
          render={() => <SignUp submitHandler={this.signUpSubmit}/>}
        />
      </Switch>
    );
  }
}

function msp(state){
  return {
    user: state.user
  }
}

export default withRouter(connect(msp,null)(App));
