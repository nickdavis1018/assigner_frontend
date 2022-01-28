import React from "react"
import { Link } from "react-router-dom";

const SignUp = (props) => {

    const possibleToken = JSON.parse(localStorage.getItem("token"))

    console.log(possibleToken)

    const username = React.useRef(null)
    const password = React.useRef(null)
    const email = React.useRef(null)
    const first = React.useRef(null)
    const last = React.useRef(null)
    const admin = React.useRef(null)


    const createAccount = async (un, pw, eml, fn, ln, adm) => {
        const response = await fetch(props.URL + "account/api/register/", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username: un, password: pw, email: eml, first_name: fn, last_name: ln, is_staff: adm})
        }).then( async (response) => {const data = await response.json()
        return data}).then(data => {
          props.logout()
          props.history.push("/login")
        })
      }


    const handleSignUp = (event) => {
        event.preventDefault()
        const un = username.current.value
        const pw = password.current.value
        const eml = email.current.value
        const firstname = first.current.value
        const surname = last.current.value
        const manager = admin.current.value
        createAccount(un, pw, eml, firstname, surname, manager)
        username.current.value = ""
        password.current.value = ""
        email.current.value = ""
        first.current.value = ""
        last.current.value = ""
        admin.current.value = ""
    }

    return <div className="signupMain"><div><h2 className="loginhello">Welcome to Assigner!</h2>
    <h5 className="loginhello2">New to the site? Register below to get started!</h5></div><div className="loginForm">
    <div className="labels">Username</div>
        <input type="text" placeholder="Enter username..." name="username" ref={username} required/>
        <div className="labels">Password</div>
        <input type="password" placeholder="Enter username..." name="password" ref={password} required/>
        <div className="labelsName">First Name</div>
        <input type="text" placeholder="Enter username..." name="first_name" ref={first} required/>
        <div className="labelsName">Last Name</div>
        <input type="text" placeholder="Enter username..." name="last_name" ref={last} required/>
        <div className="labelsEmail">Email Address</div>
        <input type="email" placeholder="Enter username..." name="email" ref={email} required/>
        <div className="labelsRole">Role</div>
        <select name="is_staff" ref={admin} required>
        <option className="placeholder" default value="">Select...</option>
        <option value="false">Assignee</option>
        <option value="true">Manager</option>
      </select>
        <button className="loginButton" onClick={handleSignUp}>Sign Up</button>
        </div><div className="signupinfo"><h5>Already have an account? Follow the link below to login!</h5>
    <Link className="regLink" to="/signup">Login</Link></div></div>
}

export default SignUp