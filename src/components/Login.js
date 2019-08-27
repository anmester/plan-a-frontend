import React from 'react';
import '../App.css';
import { connect } from 'react-redux'
import loginUser from '../actions'

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    };
      
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <form onSubmit={e => {
                e.preventDefault()
                this.props.loginSubmit(this.state.username, this.state.password)
            }}>
            <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={this.changeHandler}
            />
            <input 
                type="text"
                name="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={this.changeHandler}
            />
            <button>Login</button>
            </form>
        );
    }
}

function mdp(dispatch) {
    return {
        loginSubmit: (username, password) => {
            loginUser(dispatch, {username, password})()
        }
    }
}

export default connect(null, mdp)(Login)