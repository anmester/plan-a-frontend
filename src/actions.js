

// loginSubmit = (e, user) => {
//     e.preventDefault();
//     console.log('user login', user)
//     fetch('http://localhost:3000/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accepts: 'application/json',
//         Authorization: `Bearer <token>`
//       },
//       body: JSON.stringify({
//         user: {
//           username: user.username,
//           password: user.password
//         }
//       })
//     })
//     .then(res => res.json())
//     .then(returnData => {
//       console.log('returnData', returnData)
//       localStorage.setItem('token', returnData.jwt);
//       this.setState({ user: returnData.user });  
//     })
//   }

  export default function loginUser(dispatch, user){
    return function(){
        console.log('in action')
        return fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
                Authorization: `Bearer <token>`
            },
            body: JSON.stringify({
                user         
            })}).then(res => res.json())
            .then(user => dispatch({type: 'LOGIN_USER', payload: user}))
        }
}