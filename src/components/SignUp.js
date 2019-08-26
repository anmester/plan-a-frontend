import React from 'react';
import '../App.css';

class SignUp extends React.Component {
    state = {
     username: '',
     password: '',
     allergies: ''
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
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.changeHandler}
       />
       <input 
            type="text"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.changeHandler}
       />
        <input 
            type="text"
            name="allergies"
            placeholder="Enter any allergies"
            value={this.state.allergies}
            onChange={this.changeHandler}
       />
       <button>Sign Up</button>
      </form>
     );
    }
   }
   
   export default SignUp;