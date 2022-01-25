import React from "react"
import { Link } from "react-router-dom";
import "../App.css";

function Header({ user, logout }){

const possibleToken = localStorage.getItem("token")

const logInCheck = () => {
return <div className ="header2">
<Link className="headerLink" to="/home">Home</Link>
<Link className="headerLink" to="/assignments">Assignments</Link>
<Link className="headerLink" to="/management">Manage</Link>
<Link className="headerLink" to="/login"><div onClick={logout}>Signout</div></Link></div>
}

const loggedOut = () => {
return <div className="header2">
<Link className="headerLink" to="/login">Login</Link>   
<Link className="headerLink" to="/signup">Register</Link></div> 
}

return <div className="header"><h1 className="titlePage">Assigner</h1>
{possibleToken !== null ? logInCheck() : loggedOut()}
</div>
}

export default Header