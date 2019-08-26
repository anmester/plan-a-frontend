import React from 'react';
import '../App.css';

export default class Login extends React.Component {
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
            <form onSubmit={e => this.props.submitHandler(e, this.state)}>
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