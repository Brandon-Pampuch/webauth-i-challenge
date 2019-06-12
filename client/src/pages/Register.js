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
    register = () =>{
        axios.post('http://localhost:5000/api/register') 
        .then(user =>{

        })
        
    }

render() { 

        return (  
            <div>
                <form onSubmit={this.register}>
                    <input onChange={this.textChangeHandler} name="username" placeholder="username" type="text" value={this.state.username}></input>
                    <input onChange={this.textChangeHandler} name="password" placeholder="password" type="text" value={this.state.password}></input>
                    <buton></buton>
                </form>
            </div>

        );
    }
}
 
export default Login;