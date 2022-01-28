import React from "react"
import { Link } from "react-router-dom";
import "../App.css";

function Header({ user, logout }){

const possibleToken = localStorage.getItem("token")
const possibleAdmin = JSON.parse(localStorage.getItem("manager"))

const logInCheck = () => {
return <div className ="header3">
{possibleAdmin === true ? <div className ="header2"><Link className="headerLink" to="/">Home</Link>
<Link className="headerLink" to="/assignments">Assignments</Link>
<Link className="headerLink" to="/management">Manage</Link>
<Link className="headerLink" to="/dashboard">Dashboard</Link>
<Link className="headerLink" to="/login"><div onClick={logout}>Signout</div></Link></div> : <div className ="header2"><Link className="headerLink" to="/">Home</Link>
<Link className="headerLink" to="/assignments">Assignments</Link>
<Link className="headerLink" to="/login"><div onClick={logout}>Signout</div></Link> </div> }</div>
}

const loggedOut = () => {
return <div className="header2">
<Link className="headerLink" to="/login">Login</Link>   
<Link className="headerLink" to="/signup">Register</Link></div> 
}

return <div className="header"><div className="titlePage"><h1 className="titlePageTitle">Assigner</h1></div>
{possibleToken !== null ? logInCheck() : loggedOut()}
</div>
}

export default Header