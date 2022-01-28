import React from "react"
import { Link } from "react-router-dom";

const Login = (props) => {

    const username = React.useRef(null)
    const password = React.useRef(null)

    const handleLogin = (event) => {
        const un = username.current.value
        const pw = password.current.value
        props.getToken(un, pw)
        console.log(un, pw)
        username.current.value = ""
        password.current.value = ""
    }

    return <div className="loginMain"><div><h2 className="loginhello">Welcome to Assigner!</h2>
    <h5 className="loginhello2">Already have an account? Login below!</h5></div><div className="loginForm">
        <div className="labels">Username</div>
        <input type="text" placeholder="Enter username..." name="username" ref={username}/>
        <div className="labels">Password</div>
        <input type="password" placeholder="Enter password..." name="password" ref={password}/>
        <button className="loginButton" onClick={handleLogin}>Login</button>
    </div><div className="signupinfo"><h5>No account? No problem!</h5>
    <Link className="regLink" to="/signup">Registration</Link></div></div>
}

export default Login