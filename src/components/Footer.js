import React from "react"
import { Link } from "react-router-dom";
import "../App.css";

function Footer({ user, logout }){

const possibleToken = localStorage.getItem("token")

const logInCheck = () => {
return <div className ="footer2">
<Link className="headerLink" to="/">Home</Link>
<Link className="headerLink" to="/about">About</Link>
<a className="headerLink"href="https://github.com/nickdavis1018/assigner_frontend">Github</a>
<a className="headerLink"href="mailto: nickdavis1018@gmail.com">Contact</a>
</div>
}

return <div className="footer">
{logInCheck()}
</div>
}

export default Footer