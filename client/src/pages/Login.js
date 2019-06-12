import React from 'react';
import axios from 'axios'

class Login extends React.Component {
    state = { 
        "username": "",
        "password": ""
     }

     textChangeHandler = (event) =>{
        const text = event.target.value
       
        this.setState({
            ...this.state,
            [event.target.name]: text
        })
    }
     //need to pass creds
    login = () =>{
        axios.post('http://localhost:5000/api/login') 
        .then(user =>{

        })
        
    }

render() { 

        return (  
            <div>
                <form onSubmit={this.login}>
                    <input onChange={this.textChangeHandler} name="username" placeholder="username" type="text" value={this.state.username}></input>
                    <input onChange={this.textChangeHandler} name="password" placeholder="password" type="text" value={this.state.password}></input>
                    <buton></buton>
                </form>
            </div>

        );
    }
}
 
export default Login;